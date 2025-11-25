import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <p className={styles.text}>
          Created by <span className={styles.webzi}><Link href="https://webzi.cz">WEBZI</Link></span>
        </p>
        <Link href="/privacy" className={styles.link}>
          Privacy & GDPR
        </Link>
      </div>
    </footer>
  );
}
