import styles from "./HowItWorks.module.css";
const STEPS=[
 {no:"01",title:"Brand funds a campaign pool",desc:"Set a brief, eligible markets, base view rate, hard ceiling and approved source material."},
 {no:"02",title:"Clippers publish and submit",desc:"Creators post original edits or commentary on supported social platforms and submit the public URL."},
 {no:"03",title:"Verified views drive payouts",desc:"The network tracks view deltas and paces spend toward clips that are actually earning attention."}
];
export default function HowItWorks(){
 return <section id="how-it-works" className={styles.section}><div className={styles.wrap}><h2 className={styles.heading}>How it works</h2><div className={styles.grid}>{STEPS.map(s=><div key={s.no}><div className={styles.no}>{s.no}</div><div className={styles.title}>{s.title}</div><div className={styles.desc}>{s.desc}</div></div>)}</div></div></section>;
}
