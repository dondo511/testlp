import Link from "next/link";
import styles from "./ChoosePath.module.css";
export default function ChoosePath(){
 return <section id="choose-path" className={styles.section}><div className={styles.wrap}><h2 className={styles.heading}>Open the prototype</h2><div className={styles.grid}>
  <div className={styles.dark}><div className={styles.eyebrow}>For clippers</div><div className={styles.title}>Find campaigns and earn from verified views</div><p className={styles.desc}>Browse funded campaigns, read the brief, submit a public clip URL and follow your live earnings and settlement history.</p><Link href="/clipper/campaigns" className={"btn "+styles.ctaAccent}>Clipper demo</Link></div>
  <div className={styles.light}><div className={styles.eyebrow}>For brands</div><div className={styles.titleDark}>Fund distribution and see where the money goes</div><p className={styles.descDark}>Set campaign economics, monitor clip performance and inspect every pacing decision made inside your limits.</p><Link href="/organizer/profile" className={"btn "+styles.ctaDark}>Brand demo</Link></div>
 </div></div></section>;
}
