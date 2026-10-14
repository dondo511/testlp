"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import { formatUsdc, formatRatePerThousand } from "@/lib/format";

type Platform = "tiktok" | "youtube" | "reels";
type ReviewStatus = "approved" | "pending" | "rejected";

type Campaign = {
  id:number; name:string; cpm_rate:string; max_cpm:string; status:string;
  remaining_balance:string; total_budget:string; total_settled:string;
  clip_count:number; runway_percent:number|null; description:string|null;
};
type Clip = {
  id:number; campaign_id:number; clipper_wallet:string; url:string; platform:Platform;
  current_view_count:number|null; total_earnings:string; review_status:ReviewStatus;
  submitted_at:string;
};
type Settlement = {
  id:number; campaign_id:number; clip_id:number; view_delta:number; amount:string; created_at:string;
};
type Creator = {
  wallet:string; clips:number; approved:number; pending:number; views:number; earnings:string;
};
type AdminOverview = {
  stats:{
    active_campaigns:number; total_campaigns:number; total_clips:number; pending_reviews:number;
    approved_clips:number; total_clippers:number; total_views:number; total_paid:string;
  };
  campaigns:Campaign[];
  clips:Clip[];
  settlements:Settlement[];
  creators:Creator[];
};

const platformLabel:Record<Platform,string>={
  tiktok:"TikTok",
  youtube:"YouTube Shorts",
  reels:"Instagram Reels"
};
const platformIcon:Record<Platform,string>={
  tiktok:"♪",
  youtube:"▶",
  reels:"◎"
};

export default function AdminPage(){
  const [tab,setTab]=useState<"overview"|"campaigns"|"submissions"|"clippers"|"payouts">("overview");
  const [data,setData]=useState<AdminOverview|null>(null);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState<string|null>(null);
  const [busy,setBusy]=useState<string|null>(null);

  const load=useCallback(async()=>{
    setLoading(true);
    try{
      const res=await fetch("/api/admin/overview",{cache:"no-store"});
      const body=await res.json();
      if(!res.ok) throw new Error(body.error||"Failed to load admin data");
      setData(body); setError(null);
    }catch(err){
      setError(err instanceof Error?err.message:"Failed to load admin data");
    }finally{ setLoading(false); }
  },[]);

  useEffect(()=>{load()},[load]);

  async function reviewClip(id:number,status:ReviewStatus){
    setBusy("clip-"+id+"-"+status);
    try{
      const res=await fetch(`/api/admin/clips/${id}/review`,{
        method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({status})
      });
      const body=await res.json();
      if(!res.ok) throw new Error(body.error||"Failed to review clip");
      await load();
    }catch(err){ setError(err instanceof Error?err.message:"Failed to review clip"); }
    finally{setBusy(null)}
  }

  async function setCampaignStatus(id:number,status:"active"|"paused"|"closed"){
    setBusy("campaign-"+id+"-"+status);
    try{
      const res=await fetch(`/api/admin/campaigns/${id}/status`,{
        method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({status})
      });
      const body=await res.json();
      if(!res.ok) throw new Error(body.error||"Failed to update campaign");
      await load();
    }catch(err){ setError(err instanceof Error?err.message:"Failed to update campaign"); }
    finally{setBusy(null)}
  }

  const recentClips=useMemo(()=>data?.clips.slice().sort((a,b)=>b.id-a.id)??[],[data]);
  const topClips=useMemo(()=>data?.clips.slice().sort((a,b)=>(b.current_view_count||0)-(a.current_view_count||0)).slice(0,5)??[],[data]);

  if(loading&&!data){
    return <main className={styles.loading}><div className={styles.loadingMark}>C</div><p>Loading admin workspace…</p></main>
  }

  return (
    <main className={styles.page}>
      <aside className={styles.sidebar}>
        <Link href="/" className={styles.brand}><span className={styles.logo}>C</span><span>ClipperHub</span></Link>
        <div className={styles.adminLabel}>ADMIN CONTROL</div>
        <nav className={styles.sideNav}>
          {([
            ["overview","Overview","⌂"],
            ["campaigns","Campaigns","◫"],
            ["submissions","Submissions","▣"],
            ["clippers","Clippers","◉"],
            ["payouts","Payouts","$"],
          ] as const).map(([value,label,icon])=>(
            <button key={value} onClick={()=>setTab(value)} className={tab===value?styles.sideActive:styles.sideBtn}>
              <span>{icon}</span>{label}
              {value==="submissions"&&data?.stats.pending_reviews? <b>{data.stats.pending_reviews}</b>:null}
            </button>
          ))}
        </nav>
        <div className={styles.sideBottom}>
          <Link href="/clipper/campaigns">Clipper view ↗</Link>
          <Link href="/organizer/profile">Brand view ↗</Link>
          <Link href="/">Homepage ↗</Link>
        </div>
      </aside>

      <section className={styles.main}>
        <header className={styles.topbar}>
          <div>
            <div className={styles.eyebrow}>ClipperHub Admin</div>
            <h1>{tab==="overview"?"Network overview":tab[0].toUpperCase()+tab.slice(1)}</h1>
          </div>
          <div className={styles.topActions}>
            <span className={styles.live}><i/>Demo network live</span>
            <button onClick={load} className={styles.refresh}>Refresh</button>
          </div>
        </header>

        {error&&<div className={styles.error}>{error}</div>}

        {tab==="overview"&&data&&(
          <>
            <div className={styles.metrics}>
              <Metric label="Paid to clippers" value={formatUsdc(data.stats.total_paid)} sub="settled demo payouts" dark/>
              <Metric label="Verified views" value={short(data.stats.total_views)} sub="across all clips"/>
              <Metric label="Active campaigns" value={String(data.stats.active_campaigns)} sub={`${data.stats.total_campaigns} total`}/>
              <Metric label="Pending review" value={String(data.stats.pending_reviews)} sub="requires admin action" alert={data.stats.pending_reviews>0}/>
            </div>

            <div className={styles.overviewGrid}>
              <section className={styles.panel}>
                <div className={styles.panelHead}><div><small>PERFORMANCE</small><h2>Best clips</h2></div><button onClick={()=>setTab("submissions")}>View all</button></div>
                <div className={styles.bestGrid}>
                  {topClips.map((clip,index)=>(
                    <article key={clip.id} className={styles.clipCard}>
                      <div className={styles.clipVisual}>
                        <span className={styles.rank}>#{index+1}</span>
                        <span className={styles.platform}>{platformIcon[clip.platform]} {platformLabel[clip.platform]}</span>
                        <strong>{short(clip.current_view_count||0)} views</strong>
                      </div>
                      <div className={styles.clipMeta}>
                        <div><b>{clip.clipper_wallet.replace("demo_","@")}</b><small>Campaign #{clip.campaign_id}</small></div>
                        <strong>{formatUsdc(clip.total_earnings)}</strong>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <section className={styles.panel}>
                <div className={styles.panelHead}><div><small>OPERATIONS</small><h2>Review queue</h2></div><span className={styles.pendingCount}>{data.stats.pending_reviews} pending</span></div>
                <div className={styles.queue}>
                  {recentClips.filter(c=>c.review_status==="pending").length===0?
                    <div className={styles.empty}>All submissions are reviewed.</div>:
                    recentClips.filter(c=>c.review_status==="pending").slice(0,5).map(clip=>(
                      <div key={clip.id} className={styles.queueRow}>
                        <div className={styles.queuePlatform}>{platformIcon[clip.platform]}</div>
                        <div className={styles.queueInfo}><b>Clip #{clip.id}</b><small>{clip.clipper_wallet} · {short(clip.current_view_count||0)} views</small></div>
                        <div className={styles.queueActions}>
                          <button disabled={!!busy} onClick={()=>reviewClip(clip.id,"approved")} className={styles.approve}>Approve</button>
                          <button disabled={!!busy} onClick={()=>reviewClip(clip.id,"rejected")} className={styles.reject}>Reject</button>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </section>
            </div>

            <section className={styles.panel}>
              <div className={styles.panelHead}><div><small>CAMPAIGN HEALTH</small><h2>Live campaign pools</h2></div><button onClick={()=>setTab("campaigns")}>Manage</button></div>
              <div className={styles.campaignTable}>
                {data.campaigns.map(c=><CampaignRow key={c.id} c={c}/>)}
              </div>
            </section>
          </>
        )}

        {tab==="campaigns"&&data&&(
          <section className={styles.panel}>
            <div className={styles.panelHead}><div><small>CAMPAIGN CONTROL</small><h2>All campaigns</h2></div><span>{data.campaigns.length} campaigns</span></div>
            <div className={styles.manageList}>
              {data.campaigns.map(c=>(
                <div key={c.id} className={styles.manageCampaign}>
                  <div className={styles.manageMain}>
                    <div className={styles.manageTitle}><span className={styles.statusDot} data-status={c.status}/><b>{c.name}</b><small>#{c.id}</small></div>
                    <p>{c.description}</p>
                    <div className={styles.manageStats}>
                      <span><small>Base CPM</small><b>{formatRatePerThousand(c.cpm_rate)}</b></span>
                      <span><small>Budget</small><b>{formatUsdc(c.total_budget)}</b></span>
                      <span><small>Remaining</small><b>{formatUsdc(c.remaining_balance)}</b></span>
                      <span><small>Clips</small><b>{c.clip_count}</b></span>
                    </div>
                  </div>
                  <div className={styles.manageActions}>
                    <button disabled={!!busy} onClick={()=>setCampaignStatus(c.id,"active")} className={c.status==="active"?styles.actionActive:styles.actionBtn}>Active</button>
                    <button disabled={!!busy} onClick={()=>setCampaignStatus(c.id,"paused")} className={c.status==="paused"?styles.actionActive:styles.actionBtn}>Pause</button>
                    <button disabled={!!busy} onClick={()=>setCampaignStatus(c.id,"closed")} className={c.status==="closed"?styles.actionActive:styles.actionBtn}>Close</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {tab==="submissions"&&data&&(
          <section className={styles.panel}>
            <div className={styles.panelHead}><div><small>MODERATION</small><h2>Clip submissions</h2></div><span>{data.clips.length} total</span></div>
            <div className={styles.submissionList}>
              {recentClips.map(clip=>(
                <div key={clip.id} className={styles.submissionRow}>
                  <div className={styles.submissionPlatform}>{platformIcon[clip.platform]}</div>
                  <div className={styles.submissionInfo}>
                    <div><b>{platformLabel[clip.platform]} · Clip #{clip.id}</b><Status status={clip.review_status}/></div>
                    <small>{clip.clipper_wallet} · Campaign #{clip.campaign_id} · {short(clip.current_view_count||0)} views</small>
                    <a href={clip.url} target="_blank" rel="noopener noreferrer">Open public clip ↗</a>
                  </div>
                  <div className={styles.submissionEarn}><small>EARNED</small><b>{formatUsdc(clip.total_earnings)}</b></div>
                  <div className={styles.reviewActions}>
                    <button disabled={!!busy} onClick={()=>reviewClip(clip.id,"approved")} className={styles.approve}>Approve</button>
                    <button disabled={!!busy} onClick={()=>reviewClip(clip.id,"pending")} className={styles.hold}>Hold</button>
                    <button disabled={!!busy} onClick={()=>reviewClip(clip.id,"rejected")} className={styles.reject}>Reject</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {tab==="clippers"&&data&&(
          <section className={styles.panel}>
            <div className={styles.panelHead}><div><small>CREATOR NETWORK</small><h2>Clippers</h2></div><span>{data.stats.total_clippers} creators</span></div>
            <div className={styles.creatorGrid}>
              {data.creators.map((creator,index)=>(
                <article className={styles.creatorCard} key={creator.wallet}>
                  <div className={styles.creatorAvatar}>{index+1}</div>
                  <div className={styles.creatorName}>{creator.wallet.replace("demo_","@")}</div>
                  <div className={styles.creatorViews}>{short(creator.views)} <small>views</small></div>
                  <div className={styles.creatorStats}>
                    <span><small>Clips</small><b>{creator.clips}</b></span>
                    <span><small>Approved</small><b>{creator.approved}</b></span>
                    <span><small>Pending</small><b>{creator.pending}</b></span>
                  </div>
                  <div className={styles.creatorEarn}><small>Total earned</small><strong>{formatUsdc(creator.earnings)}</strong></div>
                </article>
              ))}
            </div>
          </section>
        )}

        {tab==="payouts"&&data&&(
          <section className={styles.panel}>
            <div className={styles.panelHead}><div><small>PAYOUT LEDGER</small><h2>Settlements</h2></div><strong>{formatUsdc(data.stats.total_paid)} paid</strong></div>
            <div className={styles.payoutList}>
              {data.settlements.map(s=>(
                <div key={s.id} className={styles.payoutRow}>
                  <div className={styles.payIcon}>$</div>
                  <div><b>Clip #{s.clip_id}</b><small>Campaign #{s.campaign_id} · {s.view_delta.toLocaleString()} verified views</small></div>
                  <time>{new Date(s.created_at).toLocaleString()}</time>
                  <strong>{formatUsdc(s.amount)}</strong>
                </div>
              ))}
            </div>
          </section>
        )}
      </section>
    </main>
  )
}

function Metric({label,value,sub,dark,alert}:{label:string;value:string;sub:string;dark?:boolean;alert?:boolean}){
  return <div className={dark?styles.metricDark:alert?styles.metricAlert:styles.metric}><small>{label}</small><strong>{value}</strong><span>{sub}</span></div>
}

function Status({status}:{status:ReviewStatus}){
  return <span className={styles.status} data-status={status}>{status}</span>
}

function CampaignRow({c}:{c:Campaign}){
  const used=Math.max(0,Math.min(100,100-(c.runway_percent??0)));
  return <div className={styles.campaignRow}>
    <div><b>{c.name}</b><small>#{c.id} · {c.status}</small></div>
    <div><small>CPM</small><b>{formatRatePerThousand(c.cpm_rate)}</b></div>
    <div className={styles.poolCell}><div><small>POOL USED</small><b>{used.toFixed(0)}%</b></div><span><i style={{width:used+"%"}}/></span></div>
    <div><small>REMAINING</small><b>{formatUsdc(c.remaining_balance)}</b></div>
  </div>
}

function short(n:number){
  if(n>=1_000_000) return (n/1_000_000).toFixed(1)+"M";
  if(n>=1_000) return (n/1_000).toFixed(n>=100_000?0:1)+"K";
  return String(n);
}
