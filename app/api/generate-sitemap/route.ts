import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

interface CrawlResult {
  urls: Set<string>;
  errors: string[];
}

async function crawlWebsite(startUrl: string, maxPages = 100): Promise<CrawlResult> {
  const visitedUrls = new Set<string>();
  const urlsToVisit = [startUrl];
  const baseUrl = new URL(startUrl);
  const errors: string[] = [];

  while (urlsToVisit.length > 0 && visitedUrls.size < maxPages) {
    const currentUrl = urlsToVisit.shift();
    if (!currentUrl || visitedUrls.has(currentUrl)) continue;

    try {
      visitedUrls.add(currentUrl);

      const response = await fetch(currentUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; SitemapGenerator/1.0)',
        },
        signal: AbortSignal.timeout(10000),
      });

      if (!response.ok) continue;

      const contentType = response.headers.get('content-type');
      if (!contentType?.includes('text/html')) continue;

      const html = await response.text();
      const $ = cheerio.load(html);

      $('a[href]').each((_, element) => {
        const href = $(element).attr('href');
        if (!href) return;

        try {
          const absoluteUrl = new URL(href, currentUrl);

          if (
            absoluteUrl.hostname === baseUrl.hostname &&
            !visitedUrls.has(absoluteUrl.href) &&
            !urlsToVisit.includes(absoluteUrl.href)
          ) {
            absoluteUrl.hash = '';
            const cleanUrl = absoluteUrl.href;
            if (!visitedUrls.has(cleanUrl) && !urlsToVisit.includes(cleanUrl)) {
              urlsToVisit.push(cleanUrl);
            }
          }
        } catch (err) {
          // Invalid URL, skip
        }
      });
    } catch (err) {
      errors.push(`Error crawling ${currentUrl}: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  }

  return { urls: visitedUrls, errors };
}

function generateXML(urls: string[]): string {
  const urlEntries = urls
    .map(
      (url) => `  <url>
    <loc>${url}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
}

function generateTXT(urls: string[]): string {
  return urls.join('\n');
}

function generateCSV(urls: string[]): string {
  const header = 'URL,Last Modified,Change Frequency,Priority\n';
  const rows = urls
    .map((url) => `"${url}","","weekly","0.5"`)
    .join('\n');
  return header + rows;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url, download } = body;

    if (!url || typeof url !== 'string') {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    let normalizedUrl = url.trim();
    if (!normalizedUrl.startsWith('http://') && !normalizedUrl.startsWith('https://')) {
      normalizedUrl = 'https://' + normalizedUrl;
    }

    try {
      new URL(normalizedUrl);
    } catch {
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      );
    }

    const { urls } = await crawlWebsite(normalizedUrl);
    const urlArray = Array.from(urls).sort();

    // If download is requested with a specific format
    if (download && ['xml', 'txt', 'csv'].includes(download)) {
      let content: string;
      let contentType: string;

      switch (download) {
        case 'xml':
          content = generateXML(urlArray);
          contentType = 'application/xml';
          break;
        case 'txt':
          content = generateTXT(urlArray);
          contentType = 'text/plain';
          break;
        case 'csv':
          content = generateCSV(urlArray);
          contentType = 'text/csv';
          break;
        default:
          return NextResponse.json(
            { error: 'Invalid format' },
            { status: 400 }
          );
      }

      return new NextResponse(content, {
        status: 200,
        headers: {
          'Content-Type': contentType,
          'Content-Disposition': `attachment; filename="sitemap.${download}"`,
        },
      });
    }

    // Otherwise return JSON with all formats for preview
    return NextResponse.json({
      urls: urlArray,
      count: urlArray.length,
      formats: {
        xml: generateXML(urlArray),
        txt: generateTXT(urlArray),
        csv: generateCSV(urlArray),
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return NextResponse.json(
      { error: 'Failed to generate sitemap' },
      { status: 500 }
    );
  }
}
