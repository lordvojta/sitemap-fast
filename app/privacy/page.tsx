import Link from 'next/link';
import styles from './privacy.module.css';

export const metadata = {
  title: 'Privacy & GDPR - SitemapFast',
  description: 'Privacy policy and GDPR compliance information for SitemapFast - We do not collect any personal data or use cookies',
};

export default function PrivacyPage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Link href="/" className={styles.backLink}>
          ← Back to Home
        </Link>

        <h1 className={styles.title}>Privacy & GDPR</h1>
        <p className={styles.updated}>Last updated: November 25, 2025</p>

        <section className={styles.section}>
          <h2>Our Commitment to Your Privacy</h2>
          <p>
            At Sitemap Generator, we take your privacy seriously. This page explains our
            approach to data collection and privacy compliance.
          </p>
        </section>

        <section className={styles.section}>
          <h2>No Cookies</h2>
          <p>
            We do not use cookies on this website. You can use our service without any
            tracking cookies being stored on your device.
          </p>
        </section>

        <section className={styles.section}>
          <h2>No Data Collection</h2>
          <p>
            We do not collect, store, or process any personal data. When you use our
            sitemap generator:
          </p>
          <ul>
            <li>We do not store the URLs you enter</li>
            <li>We do not save the generated sitemaps on our servers</li>
            <li>We do not track your browsing behavior</li>
            <li>We do not collect any personal information</li>
            <li>We do not use any third-party tracking services</li>
          </ul>
          <p>
            All sitemap generation happens in real-time and no data is retained after
            the process completes.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Analytics</h2>
          <p>
            We use Vercel Analytics to understand basic usage statistics (page views,
            visitor counts). This service is privacy-focused and does not collect
            personal information or use cookies. It only collects anonymized, aggregated
            data that cannot be used to identify individual users.
          </p>
        </section>

        <section className={styles.section}>
          <h2>GDPR Compliance</h2>
          <p>
            Since we do not collect any personal data, there is no personal data to be
            processed, stored, or deleted. This means:
          </p>
          <ul>
            <li>You do not need to consent to data processing</li>
            <li>There is no personal data to request access to</li>
            <li>There is no personal data to request deletion of</li>
            <li>There is no personal data to port to another service</li>
          </ul>
          <p>
            We are fully compliant with GDPR regulations by design, as we simply do not
            collect any personal data.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Third-Party Services</h2>
          <p>
            When you use our sitemap generator, your browser makes requests directly to
            the websites you want to scan. We act as an intermediary, but do not log or
            store these requests.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Changes to This Policy</h2>
          <p>
            If we ever change our privacy practices, we will update this page. However,
            our commitment to not collecting personal data will remain unchanged.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Contact</h2>
          <p>
            If you have any questions about our privacy practices, please feel free to
            reach out to us through our{' '}
            <a
              href="https://github.com/lordvojta/sitemap-fast"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              GitHub repository
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
}
