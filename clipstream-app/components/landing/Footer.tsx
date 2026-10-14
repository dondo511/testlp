import styles from "./Footer.module.css";
export default function Footer(){
 return <footer className={styles.footer}><div className={styles.wrap}><span className={styles.left}>ClipperHub — ClipStream-based prototype</span><span className={styles.right}>Demo data · licensed-operator workflow</span></div></footer>;
}
