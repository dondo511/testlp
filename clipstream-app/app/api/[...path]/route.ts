import { NextRequest, NextResponse } from "next/server";

type Campaign = {
  id:number; name:string; contract_campaign_id:string; organizer_wallet:string;
  cpm_rate:string; max_cpm:string; max_duration:number; status:string;
  description:string|null; source_link:string|null; created_at:string;
  remaining_balance:string; total_settled:string; total_budget:string;
  runway_percent:number|null; clip_count:number; spend_velocity_last_hour:string;
};
type ClipPlatform = "tiktok" | "youtube" | "reels";
type ClipReviewStatus = "approved" | "pending" | "rejected";
type Clip = {
  id:number; campaign_id:number; clipper_wallet:string; url:string; platform:ClipPlatform; tweet_id:string;
  per_clip_cap:string|null; is_capped:boolean; effective_cpm_rate:string|null;
  submitted_at:string; current_view_count:number|null; last_polled_at:string|null; total_earnings:string;
  review_status:ClipReviewStatus;
};
type Settlement = {
  id:number; campaign_id:number; clip_id:number; view_delta:number; amount:string;
  settlement_id:string; tx_hash:string|null; tx_url:string|null; created_at:string;
};
type Decision = {
  id:number; campaign_id:number; clip_id:number|null; decision_type:string; rationale:string|null;
  old_rate:number|null; new_rate:number|null; llm_used:boolean; created_at:string;
};
type DemoState = {campaigns:Campaign[]; clips:Clip[]; settlements:Settlement[]; decisions:Decision[]};

const now="2026-10-14T05:40:00.000Z";
const seed:DemoState={
 campaigns:[
  {id:101,name:"Derby Night Reaction Clips",contract_campaign_id:"10101",organizer_wallet:"demo_novabet",cpm_rate:"4200000",max_cpm:"6000000",max_duration:2592000,status:"active",description:"Create original match-reaction edits from approved rights-cleared footage. Add commentary, captions or analysis. 18+ audiences only, include ad disclosure, and do not make guaranteed-win claims.",source_link:"https://example.com/approved-footage",created_at:"2026-10-08T09:00:00.000Z",remaining_balance:"2875000000",total_settled:"1325000000",total_budget:"4200000000",runway_percent:68.45,clip_count:24,spend_velocity_last_hour:"82000000"},
  {id:102,name:"Weekend Football Talking Points",contract_campaign_id:"10201",organizer_wallet:"demo_novabet",cpm_rate:"3800000",max_cpm:"5200000",max_duration:1814400,status:"active",description:"Turn approved football talking points into original short-form commentary. Use local-language captions where relevant plus the approved responsible-play end card.",source_link:"https://example.com/talking-points",created_at:"2026-10-10T09:00:00.000Z",remaining_balance:"1964000000",total_settled:"1036000000",total_budget:"3000000000",runway_percent:65.47,clip_count:18,spend_velocity_last_hour:"67000000"},
  {id:103,name:"Responsible Play Explainer",contract_campaign_id:"10301",organizer_wallet:"demo_novabet",cpm_rate:"4800000",max_cpm:"5500000",max_duration:2592000,status:"active",description:"Educational clips covering bankroll limits, timeout tools and safer-play controls. No bonus claims or inducement framing.",source_link:"https://example.com/responsible-play-kit",created_at:"2026-10-11T09:00:00.000Z",remaining_balance:"1460000000",total_settled:"340000000",total_budget:"1800000000",runway_percent:81.11,clip_count:11,spend_velocity_last_hour:"24000000"}
 ],
 clips:[
  {id:501,campaign_id:101,clipper_wallet:"demo_goalframe",url:"https://tiktok.com/@goalframe/video/demo1",platform:"tiktok",tweet_id:"tt501",per_clip_cap:"650000000",is_capped:false,effective_cpm_rate:"5400000",submitted_at:"2026-10-12T09:30:00.000Z",current_view_count:84200,last_polled_at:now,total_earnings:"391820000",review_status:"approved"},
  {id:502,campaign_id:101,clipper_wallet:"demo_matchpulse",url:"https://instagram.com/reel/demo2",platform:"reels",tweet_id:"ig502",per_clip_cap:"500000000",is_capped:false,effective_cpm_rate:"4500000",submitted_at:"2026-10-12T10:10:00.000Z",current_view_count:61200,last_polled_at:now,total_earnings:"265120000",review_status:"approved"},
  {id:503,campaign_id:102,clipper_wallet:"demo_goalframe",url:"https://youtube.com/shorts/demo3",platform:"youtube",tweet_id:"yt503",per_clip_cap:"420000000",is_capped:false,effective_cpm_rate:"4100000",submitted_at:"2026-10-13T08:00:00.000Z",current_view_count:47600,last_polled_at:now,total_earnings:"184360000",review_status:"approved"},
  {id:504,campaign_id:102,clipper_wallet:"demo_footballcutmy",url:"https://tiktok.com/@footballcutmy/video/demo4",platform:"tiktok",tweet_id:"tt504",per_clip_cap:"350000000",is_capped:false,effective_cpm_rate:"3400000",submitted_at:"2026-10-13T11:00:00.000Z",current_view_count:32300,last_polled_at:now,total_earnings:"108640000",review_status:"pending"},
  {id:505,campaign_id:103,clipper_wallet:"demo_sportbrief",url:"https://tiktok.com/@sportbrief/video/demo5",platform:"tiktok",tweet_id:"tt505",per_clip_cap:"250000000",is_capped:false,effective_cpm_rate:"5100000",submitted_at:"2026-10-13T12:00:00.000Z",current_view_count:17100,last_polled_at:now,total_earnings:"83140000",review_status:"approved"}
 ],
 settlements:[
  {id:9001,campaign_id:101,clip_id:501,view_delta:4900,amount:"26460000",settlement_id:"demo_settlement_9001",tx_hash:"demo_tx_91a7",tx_url:null,created_at:"2026-10-14T05:32:00.000Z"},
  {id:9002,campaign_id:102,clip_id:503,view_delta:3100,amount:"12710000",settlement_id:"demo_settlement_9002",tx_hash:"demo_tx_8f2d",tx_url:null,created_at:"2026-10-14T05:30:00.000Z"},
  {id:9003,campaign_id:103,clip_id:505,view_delta:1100,amount:"5610000",settlement_id:"demo_settlement_9003",tx_hash:"demo_tx_a32b",tx_url:null,created_at:"2026-10-14T05:27:00.000Z"},
  {id:9004,campaign_id:101,clip_id:502,view_delta:1300,amount:"5850000",settlement_id:"demo_settlement_9004",tx_hash:"demo_tx_b71f",tx_url:null,created_at:"2026-10-14T05:25:00.000Z"}
 ],
 decisions:[
  {id:1,campaign_id:101,clip_id:501,decision_type:"pacing_rate_update",rationale:"Clip #501 is taking an above-even share of recent verified view velocity. Rate boosted within the organizer's hard ceiling.",old_rate:4800000,new_rate:5400000,llm_used:true,created_at:"2026-10-14T05:31:00.000Z"},
  {id:2,campaign_id:101,clip_id:502,decision_type:"pacing_rate_update",rationale:"Clip #502 is close to its expected share of recent velocity. Rate held while the pool remains healthy.",old_rate:4500000,new_rate:4500000,llm_used:false,created_at:"2026-10-14T05:29:00.000Z"},
  {id:3,campaign_id:102,clip_id:504,decision_type:"pacing_rate_update",rationale:"Clip #504 produced a short-lived velocity spike. Rate throttled slightly until the next verified sample.",old_rate:3800000,new_rate:3400000,llm_used:true,created_at:"2026-10-14T05:23:00.000Z"}
 ]
};

const g=globalThis as typeof globalThis & {__clipperhubDemo?:DemoState};
function db():DemoState{ if(!g.__clipperhubDemo) g.__clipperhubDemo=structuredClone(seed); return g.__clipperhubDemo; }
function json(data:unknown,status=200){ return NextResponse.json(data,{status}); }
function campaignById(id:number){ return db().campaigns.find(c=>c.id===id); }

export async function GET(req:NextRequest,{params}:{params:Promise<{path:string[]}>}){
 const p=(await params).path||[];
 if(p[0]==="auth" && p[1]==="x" && p[2]==="start"){
   return NextResponse.redirect(new URL("/clipper/profile?linked_handle=goalframe",req.url));
 }
 if(p[0]==="admin" && p[1]==="overview"){
   const campaigns=db().campaigns;
   const clips=db().clips;
   const wallets=[...new Set(clips.map(c=>c.clipper_wallet))];
   const totalViews=clips.reduce((a,c)=>a+(c.current_view_count||0),0);
   const totalPaid=db().settlements.reduce((a,s)=>a+BigInt(s.amount),0n).toString();
   return json({
     stats:{
       active_campaigns:campaigns.filter(c=>c.status==="active").length,
       total_campaigns:campaigns.length,
       total_clips:clips.length,
       pending_reviews:clips.filter(c=>c.review_status==="pending").length,
       approved_clips:clips.filter(c=>c.review_status==="approved").length,
       total_clippers:wallets.length,
       total_views:totalViews,
       total_paid:totalPaid
     },
     campaigns,
     clips,
     settlements:db().settlements.slice().reverse(),
     creators:wallets.map(wallet=>{
       const rows=clips.filter(c=>c.clipper_wallet===wallet);
       return {
         wallet,
         clips:rows.length,
         approved:rows.filter(c=>c.review_status==="approved").length,
         pending:rows.filter(c=>c.review_status==="pending").length,
         views:rows.reduce((a,c)=>a+(c.current_view_count||0),0),
         earnings:rows.reduce((a,c)=>a+BigInt(c.total_earnings),0n).toString()
       };
     }).sort((a,b)=>b.views-a.views)
   });
 }
 if(p[0]==="campaigns" && p.length===1) return json({campaigns:db().campaigns});
 if(p[0]==="campaigns" && p.length===2){
   const c=campaignById(Number(p[1])); return c?json({campaign:c}):json({error:"Campaign not found"},404);
 }
 if(p[0]==="campaigns" && p[2]==="clips"){
   let rows=db().clips.filter(x=>x.campaign_id===Number(p[1]));
   const wallet=req.nextUrl.searchParams.get("clipper_wallet");
   if(wallet) rows=rows.filter(x=>x.clipper_wallet===wallet);
   return json({clips:rows});
 }
 if(p[0]==="campaigns" && p[2]==="agent-decisions"){
   const limit=Number(req.nextUrl.searchParams.get("limit")||50);
   return json({decisions:db().decisions.filter(x=>x.campaign_id===Number(p[1])).slice(0,limit)});
 }
 if(p[0]==="clips" && p[2]==="earnings"){
   const id=Number(p[1]); const c=db().clips.find(x=>x.id===id);
   if(!c) return json({error:"Clip not found"},404);
   return json({clip_id:c.id,campaign_id:c.campaign_id,clipper_wallet:c.clipper_wallet,effective_cpm_rate:c.effective_cpm_rate,total_earnings:c.total_earnings,current_view_count:c.current_view_count,last_polled_at:c.last_polled_at,recent_settlements:db().settlements.filter(s=>s.clip_id===id).slice(0,10)});
 }
 if(p[0]==="clippers" && p[2]==="profile"){
   const wallet=decodeURIComponent(p[1]); const clips=db().clips.filter(c=>c.clipper_wallet===wallet);
   const campaignIds=[...new Set(clips.map(c=>c.campaign_id))];
   const campaigns=campaignIds.map(id=>{
     const c=campaignById(id)!; const rows=clips.filter(x=>x.campaign_id===id);
     const earnings=rows.reduce((a,x)=>a+BigInt(x.total_earnings),0n).toString();
     return {campaign_id:id,contract_campaign_id:c.contract_campaign_id,cpm_rate:c.cpm_rate,max_cpm:c.max_cpm,status:c.status,clips_submitted:rows.length,earnings_in_campaign:earnings};
   });
   const lifetime=clips.reduce((a,x)=>a+BigInt(x.total_earnings),0n).toString();
   return json({wallet_address:wallet,x_account:{linked:true,x_handle:wallet==="demo_goalframe"?"goalframe":"demo_creator",x_user_id:"demo-x-user"},lifetime_earnings:lifetime,clips_submitted:clips.length,campaigns});
 }
 if(p[0]==="clippers" && p[2]==="settlements"){
   const wallet=decodeURIComponent(p[1]); const ids=new Set(db().clips.filter(c=>c.clipper_wallet===wallet).map(c=>c.id));
   return json({settlements:db().settlements.filter(s=>ids.has(s.clip_id))});
 }
 if(p[0]==="organizers" && p[2]==="campaigns"){
   const wallet=decodeURIComponent(p[1]); const campaigns=db().campaigns.filter(c=>c.organizer_wallet===wallet || wallet==="demo_novabet");
   const aggregate=campaigns.reduce((a,c)=>a+BigInt(c.total_settled),0n).toString();
   return json({organizer_wallet:wallet,aggregate_spend:aggregate,campaigns});
 }
 return json({error:"Demo endpoint not found",path:p},404);
}

export async function POST(req:NextRequest,{params}:{params:Promise<{path:string[]}>}){
 const p=(await params).path||[]; const body=await req.json().catch(()=>({}));
 if(p[0]==="admin" && p[1]==="clips" && p[3]==="review"){
   const id=Number(p[2]); const clip=db().clips.find(c=>c.id===id);
   if(!clip) return json({error:"Clip not found"},404);
   const status=String(body.status||"") as ClipReviewStatus;
   if(!["approved","pending","rejected"].includes(status)) return json({error:"Invalid review status"},400);
   clip.review_status=status;
   return json({clip});
 }
 if(p[0]==="admin" && p[1]==="campaigns" && p[3]==="status"){
   const id=Number(p[2]); const campaign=db().campaigns.find(c=>c.id===id);
   if(!campaign) return json({error:"Campaign not found"},404);
   const status=String(body.status||"");
   if(!["active","paused","closed"].includes(status)) return json({error:"Invalid campaign status"},400);
   campaign.status=status;
   return json({campaign});
 }
 if(p[0]==="clips" && p.length===1){
   const id=Math.max(...db().clips.map(c=>c.id))+1;
   const c=campaignById(Number(body.campaign_id)); if(!c) return json({error:"Campaign not found"},404);
   const platform=String(body.platform||"") as ClipPlatform;
   const url=String(body.url||"").trim();
   const validPlatforms:ClipPlatform[]=["tiktok","youtube","reels"];
   if(!validPlatforms.includes(platform)) return json({error:"Choose TikTok, YouTube Shorts or Instagram Reels"},400);
   let parsed:URL; try{ parsed=new URL(url); }catch{ return json({error:"Enter a valid public clip URL"},400); }
   const host=parsed.hostname.replace(/^www\./,"").toLowerCase();
   const valid =
     platform==="tiktok" ? host.endsWith("tiktok.com") :
     platform==="youtube" ? (host.endsWith("youtube.com") || host==="youtu.be") :
     (host.endsWith("instagram.com"));
   if(!valid) return json({error:"The URL does not match the selected platform"},400);
   db().clips.unshift({id,campaign_id:Number(body.campaign_id),clipper_wallet:String(body.clipper_wallet||"demo_goalframe"),url,platform,tweet_id:"demo_"+id,per_clip_cap:"400000000",is_capped:false,effective_cpm_rate:null,submitted_at:new Date().toISOString(),current_view_count:1000,last_polled_at:new Date().toISOString(),total_earnings:"0",review_status:"pending"});
   c.clip_count+=1;
   return json({clip:{id,platform},ownership:"demo social ownership verified"});
 }
 if(p[0]==="campaigns" && p.length===1){
   const id=Math.max(...db().campaigns.map(c=>c.id))+1;
   const budget="2500000000";
   const c:Campaign={id,name:String(body.name||"Untitled iGaming campaign"),contract_campaign_id:String(body.contract_campaign_id||Date.now()),organizer_wallet:"demo_novabet",cpm_rate:String(body.cpm_rate||"4000000"),max_cpm:String(body.max_cpm||"6000000"),max_duration:2592000,status:"active",description:body.description||"Licensed operator campaign. 18+ audiences only.",source_link:body.source_link||null,created_at:new Date().toISOString(),remaining_balance:budget,total_settled:"0",total_budget:budget,runway_percent:100,clip_count:0,spend_velocity_last_hour:"0"};
   db().campaigns.unshift(c); return json({campaign:c});
 }
 if(p[0]==="demo" && p[1]==="topup"){
   const c=db().campaigns.find(x=>x.contract_campaign_id===String(body.contract_campaign_id));
   if(!c) return json({error:"Campaign not found"},404);
   const amount=BigInt(String(body.amount||"0"));
   c.remaining_balance=(BigInt(c.remaining_balance)+amount).toString();
   c.total_budget=(BigInt(c.total_budget)+amount).toString();
   c.runway_percent=Number(BigInt(c.remaining_balance)*10000n/BigInt(c.total_budget))/100;
   return json({ok:true});
 }
 return json({error:"Demo endpoint not found"},404);
}
