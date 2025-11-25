# SitemapFast

A minimalistic web tool to generate sitemaps for any website in multiple formats, even when no sitemap.xml exists. Fast, free, and privacy-focused.

## Features

- **Simple Interface** - Clean, intuitive UI with a single URL input
- **Multiple Export Formats** - Generate sitemaps in XML, TXT, or CSV format
- **Automatic Crawling** - Discovers and indexes up to 100 pages automatically
- **Same-Domain Focus** - Only crawls pages within the same domain
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **Dark Mode Support** - Automatically adapts to your system preferences
- **Zero Configuration** - No API keys or complex setup required

## Demo

Visit the live demo: sitemapfast.com

## Export Formats

### XML Format
Standard sitemap.xml format compliant with [sitemaps.org](https://www.sitemaps.org/) protocol:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com</loc>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
  </url>
</urlset>
```

### TXT Format
Simple plain text list of URLs, one per line:
```
https://example.com
https://example.com/about
https://example.com/contact
```

### CSV Format
Comma-separated values with headers:
```csv
URL,Last Modified,Change Frequency,Priority
"https://example.com","","weekly","0.5"
```

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) with App Router
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **UI:** React 19 with CSS Modules
- **Crawler:** [Cheerio](https://cheerio.js.org/) for HTML parsing
- **Deployment:** Optimized for [Vercel](https://vercel.com/)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/sitemapfast.git
cd sitemapfast
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. Enter the website URL you want to generate a sitemap for
2. Click one of the export buttons (XML, TXT, or CSV)
3. Wait for the crawler to scan the website
4. The sitemap file will download automatically

**Note:** The crawler respects the same-origin policy and only indexes pages from the same domain. It has a limit of 100 pages to ensure reasonable performance.

## Deployment

### Deploy to Vercel

The easiest way to deploy this project is using [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/sitemapfast)

Or manually:

1. Push your code to GitHub
2. Import your repository in Vercel
3. Vercel will automatically detect Next.js and deploy

### Environment Variables

No environment variables are required for basic functionality.

## Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Project Structure

```
sitemapfast/
├── app/
│   ├── api/
│   │   └── generate-sitemap/
│   │       └── route.ts          # API endpoint for crawling and generation
│   ├── components/
│   │   ├── Footer.tsx            # Footer component with branding
│   │   └── Footer.module.css     # Footer styles
│   ├── privacy/
│   │   ├── page.tsx              # Privacy & GDPR page
│   │   └── privacy.module.css    # Privacy page styles
│   ├── layout.tsx                # Root layout with metadata and Analytics
│   ├── page.tsx                  # Main UI page
│   ├── page.module.css           # Styles for main page
│   └── globals.css               # Global styles
├── public/                       # Static assets
├── package.json
└── README.md
```

## How It Works

1. **User Input:** User enters a website URL through the web interface
2. **URL Normalization:** The API validates and normalizes the URL
3. **Web Crawling:** Starting from the homepage, the crawler:
   - Fetches HTML content
   - Parses links using Cheerio
   - Adds same-domain URLs to the queue
   - Continues until all pages are visited (max 100)
4. **Format Generation:** URLs are formatted according to the selected export type
5. **Download:** The generated sitemap is sent to the browser as a downloadable file

## Limitations

- Maximum 100 pages per sitemap (configurable in code)
- 10-second timeout per page
- Only HTML pages are indexed
- JavaScript-rendered content is not executed
- Requires publicly accessible websites

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you find this project useful, please consider giving it a star on GitHub!

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- HTML parsing powered by [Cheerio](https://cheerio.js.org/)
- Inspired by the need for quick sitemap generation tools
# sitemap-fast
