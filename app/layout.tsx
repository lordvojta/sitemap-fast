import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Footer from "./components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SitemapFast - Free Sitemap Generator Tool | XML, TXT, CSV",
  description: "Generate sitemaps for any website instantly. Free online sitemap generator supporting XML, TXT, and CSV formats. No registration required. Fast, simple, and GDPR compliant.",
  keywords: ["sitemap generator", "sitemap.xml", "free sitemap tool", "website crawler", "SEO tools", "XML sitemap", "sitemap creator"],
  authors: [{ name: "WEBZI" }],
  creator: "WEBZI",
  publisher: "WEBZI",
  robots: "index, follow",
  openGraph: {
    title: "SitemapFast - Free Sitemap Generator",
    description: "Generate sitemaps for any website instantly in XML, TXT, or CSV format. Fast, free, and privacy-focused.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "SitemapFast - Free Sitemap Generator",
    description: "Generate sitemaps for any website instantly. Supports XML, TXT, and CSV formats.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://sitemapfast.com" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
