"use client";
import { loadStoredWallet, createCircleWallet } from "./circleWallets";
export interface CreateCampaignInput { baseRate:number; maxDuration:number; depositAmountBaseUnits:string; onStatus:(status:string)=>void; }
export interface CreateCampaignResult { txHash:string; contractCampaignId:string; organizerWallet:string; }
export async function createCampaignFlow(input:CreateCampaignInput):Promise<CreateCampaignResult>{
  let session=loadStoredWallet("organizer");
  if(!session) session=await createCircleWallet(input.onStatus,"organizer");
  input.onStatus("Creating demo campaign pool…");
  await new Promise(r=>setTimeout(r,350));
  return {txHash:"demo_tx_"+Date.now(),contractCampaignId:String(Date.now()),organizerWallet:session.address};
}
export interface TopUpInput { contractCampaignId:string; amountBaseUnits:string; onStatus:(status:string)=>void; }
export interface TopUpResult { txHash:string; organizerWallet:string; }
export async function topUpFlow(input:TopUpInput):Promise<TopUpResult>{
  let session=loadStoredWallet("organizer");
  if(!session) session=await createCircleWallet(input.onStatus,"organizer");
  input.onStatus("Adding demo funds…");
  const res=await fetch("/api/demo/topup",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contract_campaign_id:input.contractCampaignId,amount:input.amountBaseUnits})});
  if(!res.ok) throw new Error("Demo top-up failed");
  await res.json();
  return {txHash:"demo_topup_"+Date.now(),organizerWallet:session.address};
}
