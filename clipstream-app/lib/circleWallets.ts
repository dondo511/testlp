"use client";
export const API_BASE = "/api";
export const CIRCLE_APP_ID = "demo";
export type CircleWalletOwnerType = "clipper" | "organizer";
export interface CircleWalletSession { userId: string; address: string; }
const KEYS: Record<CircleWalletOwnerType,string> = {
  clipper: "clipperhub_demo_clipper",
  organizer: "clipperhub_demo_organizer"
};
const DEFAULTS: Record<CircleWalletOwnerType,CircleWalletSession> = {
  clipper: { userId: "demo-clipper", address: "demo_goalframe" },
  organizer: { userId: "demo-organizer", address: "demo_novabet" }
};
export function loadStoredWallet(ownerType: CircleWalletOwnerType = "clipper"): CircleWalletSession | null {
  if (typeof window === "undefined") return DEFAULTS[ownerType];
  const raw=window.localStorage.getItem(KEYS[ownerType]);
  if(raw){ try { return JSON.parse(raw) as CircleWalletSession; } catch {} }
  window.localStorage.setItem(KEYS[ownerType],JSON.stringify(DEFAULTS[ownerType]));
  return DEFAULTS[ownerType];
}
function storeWallet(session: CircleWalletSession, ownerType: CircleWalletOwnerType){
  if(typeof window!=="undefined") window.localStorage.setItem(KEYS[ownerType],JSON.stringify(session));
}
export function clearStoredWallet(ownerType: CircleWalletOwnerType = "clipper"){
  if(typeof window!=="undefined") window.localStorage.removeItem(KEYS[ownerType]);
}
export async function resumeRecoveredWallet(address:string,userId:string,ownerType:CircleWalletOwnerType="clipper"){
  const session={address,userId}; storeWallet(session,ownerType); return session;
}
export async function postJson<T>(path:string,body:unknown):Promise<T>{
  const res=await fetch(API_BASE+path,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body)});
  const data=await res.json(); if(!res.ok) throw new Error(data.error||"Demo request failed"); return data as T;
}
export async function getAuthenticatedSdk(){ return {} as any; }
export function createCircleWallet(onStatus:(s:string)=>void,ownerType:CircleWalletOwnerType="clipper"):Promise<CircleWalletSession>{
  onStatus("Creating demo account…");
  const session=DEFAULTS[ownerType]; storeWallet(session,ownerType);
  return Promise.resolve(session);
}
