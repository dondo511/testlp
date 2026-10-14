import Link from "next/link";
import styles from "./RoleNav.module.css";

export default function RoleNav({
  role,
  active,
}: {
  role: "clipper" | "organizer";
  active: "profile" | "campaigns";
}) {
  const profileHref = `/${role}/profile`;
  const campaignsHref = role === "clipper" ? "/clipper/campaigns" : "/organizer/profile#your-campaigns";
  const otherRoleHref = role === "clipper" ? "/organizer/profile" : "/clipper/campaigns";
  const otherRoleLabel = role === "clipper" ? "Brand view" : "Clipper view";

  return (
    <header className={styles.shell}>
      <div className={styles.topRow}>
        <Link href="/" className={styles.brand} aria-label="ClipperHub homepage">
          <span className={styles.logoMark}>C</span>
          <span className={styles.wordmark}>ClipperHub</span>
        </Link>

        <div className={styles.actions}>
          <span className={styles.roleBadge}>{role === "clipper" ? "Clipper workspace" : "Brand workspace"}</span>
          <Link href={otherRoleHref} className={styles.switchRole}>{otherRoleLabel}</Link>
          <Link href="/" className={styles.homeAction}>← Homepage</Link>
        </div>
      </div>

      <nav className={styles.nav} aria-label={`${role} navigation`}>
        <Link href={campaignsHref} className={active === "campaigns" ? styles.tabActive : styles.tab}>
          Campaigns
        </Link>
        <Link href={profileHref} className={active === "profile" ? styles.tabActive : styles.tab}>
          Profile
        </Link>
      </nav>
    </header>
  );
}
