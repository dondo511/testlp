import styles from "./Hero.module.css";
import { heroHeight } from "@/lib/theme";
export default function Hero() {
  return (
    <section className={styles.hero} style={{ minHeight: heroHeight }}>
      <div className={styles.overlay} />
      <div className={styles.content}>
        <span className={styles.brandLabel}>ClipperHub</span>
        <h1 className={styles.headline}>Turn clips into measurable distribution.</h1>
        <p className={styles.lede}>
          Licensed iGaming brands fund campaign pools. Clippers publish approved short-form content
          and earn from verified views while every rate change and payout stays visible.
        </p>
        <a href="#choose-path" className={"btn "+styles.cta}>Open prototype</a>
      </div>
    </section>
  );
}
