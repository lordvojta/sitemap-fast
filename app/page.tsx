'use client';

import { useState } from 'react';
import styles from './page.module.css';

interface SitemapData {
  urls: string[];
  count: number;
  formats: {
    xml: string;
    txt: string;
    csv: string;
  };
}

export default function Home() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sitemapData, setSitemapData] = useState<SitemapData | null>(null);
  const [activeFormat, setActiveFormat] = useState<'xml' | 'txt' | 'csv'>('xml');

  const handleGenerate = async () => {
    if (!url) {
      setError('Please enter a URL');
      return;
    }

    setLoading(true);
    setError('');
    setSitemapData(null);

    try {
      const response = await fetch('/api/generate-sitemap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to generate sitemap');
      }

      const data = await response.json();
      setSitemapData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (format: 'xml' | 'txt' | 'csv') => {
    if (!url) return;

    try {
      const response = await fetch('/api/generate-sitemap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, download: format }),
      });

      if (!response.ok) {
        throw new Error('Failed to download sitemap');
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `sitemap.${format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(downloadUrl);
      document.body.removeChild(a);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Download failed');
    }
  };

  return (
    <div className={`${styles.page} ${sitemapData ? styles.hasPreview : ''}`}>
      <main className={`${styles.main} ${sitemapData ? styles.withPreview : ''}`}>
        <h1 className={styles.title}>
          <span className={styles.brandName}>SitemapFast</span>
        </h1>
        <p className={styles.description}>
          Generate a sitemap for any website in XML, TXT, or CSV format
        </p>

        <div className={styles.form}>
          <input
            type="url"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className={styles.input}
            disabled={loading}
          />

          <button
            onClick={handleGenerate}
            disabled={loading}
            className={styles.generateButton}
          >
            {loading ? 'Generating...' : 'Generate Sitemap'}
          </button>

          {error && <p className={styles.error}>{error}</p>}
        </div>
      </main>

      {sitemapData && (
        <div className={styles.preview}>
          <div className={styles.previewHeader}>
            <div className={styles.previewInfo}>
              <h2>Sitemap Generated</h2>
              <p>{sitemapData.count} URLs found</p>
            </div>
            <div className={styles.downloadButtons}>
              <button
                onClick={() => handleDownload('xml')}
                className={styles.downloadButton}
              >
                Download XML
              </button>
              <button
                onClick={() => handleDownload('txt')}
                className={styles.downloadButton}
              >
                Download TXT
              </button>
              <button
                onClick={() => handleDownload('csv')}
                className={styles.downloadButton}
              >
                Download CSV
              </button>
            </div>
          </div>

          <div className={styles.formatTabs}>
            <button
              onClick={() => setActiveFormat('xml')}
              className={`${styles.tab} ${activeFormat === 'xml' ? styles.activeTab : ''}`}
            >
              XML
            </button>
            <button
              onClick={() => setActiveFormat('txt')}
              className={`${styles.tab} ${activeFormat === 'txt' ? styles.activeTab : ''}`}
            >
              TXT
            </button>
            <button
              onClick={() => setActiveFormat('csv')}
              className={`${styles.tab} ${activeFormat === 'csv' ? styles.activeTab : ''}`}
            >
              CSV
            </button>
          </div>

          <div className={styles.previewContent}>
            <pre className={styles.codeBlock}>
              <code>{sitemapData.formats[activeFormat]}</code>
            </pre>
          </div>

          <div className={styles.urlList}>
            <h3>Discovered URLs ({sitemapData.count})</h3>
            <ul>
              {sitemapData.urls.map((url, index) => (
                <li key={index}>{url}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
