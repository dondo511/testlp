import Link from "next/link";
import styles from "./Header.module.css";

export default function Header(){
  return (
    <header className={styles.header}>
      <div className={styles.wrap}>
        <Link href="/" className={styles.brand}>
          <span className={styles.logoMark}>C</span>
          <span className={styles.wordmark}>ClipperHub</span>
        </Link>
        <nav className={styles.nav}>
          <div className={styles.navLinks}>
            <a href="#unique-features" className={styles.link}>Features</a>
            <a href="#how-it-works" className={styles.link}>How it works</a>
            <Link href="/clipper/campaigns" className={styles.link}>Campaigns</Link>
          </div>
          <a href="#choose-path" className={styles.cta}>Open prototype</a>
        </nav>
      </div>
    </header>
  );
}
