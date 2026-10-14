import styles from "./Hero.module.css";
import { heroHeight } from "@/lib/theme";

export default function Hero() {
  return (
    <section className={styles.hero} style={{ minHeight: heroHeight }}>
      <div className={styles.wrap}>
        <div className={styles.copy}>
          <div className={styles.kicker}>Clipper distribution network</div>
          <h1 className={styles.headline}>Turn short-form clips into measurable distribution.</h1>
          <p className={styles.lede}>
            Licensed iGaming brands fund campaign pools. Clippers publish approved content on TikTok,
            YouTube Shorts, and Instagram Reels, then earn from verified views.
          </p>
          <div className={styles.actions}>
            <a href="#choose-path" className={styles.primary}>Open prototype</a>
            <a href="/clipper/campaigns" className={styles.secondary}>Browse campaigns</a>
          </div>
          <div className={styles.platforms}>
            <span>♪ TikTok</span><span>▶ YouTube Shorts</span><span>◎ Instagram Reels</span>
          </div>
        </div>
        <div className={styles.demoCard}>
          <div className={styles.demoTop}>LIVE CAMPAIGN POOL</div>
          <div className={styles.demoAmount}>$7,875</div>
          <div className={styles.demoSub}>remaining across active demo campaigns</div>
          <div className={styles.graph}><i /><b /><em /></div>
          <div className={styles.miniGrid}>
            <div><small>Verified views</small><strong>749K</strong></div>
            <div><small>Live clips</small><strong>53</strong></div>
            <div><small>Max CPM</small><strong>$6.00</strong></div>
          </div>
        </div>
      </div>
    </section>
  );
}
