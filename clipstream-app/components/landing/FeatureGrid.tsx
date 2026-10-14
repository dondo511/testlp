import styles from "./FeatureGrid.module.css";
const FEATURES=[
 {tone:"accent",title:"Per-view earnings",desc:"Clippers earn from verified public-view deltas instead of waiting for a minimum payout threshold."},
 {tone:"dark",title:"Bounded pacing",desc:"High-performing clips can receive a higher effective rate, but never above the organizer's hard ceiling."},
 {tone:"dark",title:"Transparent payout ledger",desc:"Every demo settlement shows which clip, how many verified views and how much of the campaign pool was used."},
 {tone:"accent",title:"iGaming campaign controls",desc:"Campaign briefs carry approved geos, rights-cleared source assets, 18+ rules and prohibited-claim guidance."}
];
export default function FeatureGrid(){
 return <section id="unique-features" className={styles.section}><div className={styles.wrap}>
  <div className={styles.head}><div className={styles.eyebrow}>Why this network is different</div><h2 className={styles.heading}>Pay for distribution that can be measured clip by clip.</h2></div>
  <div className={styles.grid}>{FEATURES.map(f=><div key={f.title} className={styles.card}><div className={f.tone==="accent"?styles.iconAccent:styles.iconDark}/><div className={styles.title}>{f.title}</div><div className={styles.desc}>{f.desc}</div></div>)}</div>
 </div></section>;
}
