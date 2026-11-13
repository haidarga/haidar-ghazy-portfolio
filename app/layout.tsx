import type { Metadata, Viewport } from 'next';
import { Bricolage_Grotesque, Plus_Jakarta_Sans, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import { AppProviders } from '@/components/AppProviders';
import { CinematicIntro } from '@/components/CinematicIntro';
import { Navbar } from '@/components/Navbar';
import { siteIdentity } from '@/content/site-data';

const displayFont = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-display',
  display: 'swap'
});

const bodyFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap'
});

const monoFont = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap'
});

const SITE_URL = 'https://haidarghazy.com';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#111013' },
    { media: '(prefers-color-scheme: light)', color: '#f6f4ef' }
  ]
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Haidar Ghazy Arkan | AI-Native Growth Marketer & Content Strategist',
  description:
    'Portfolio of Haidar Ghazy Arkan: AI content strategy, character-locked AI personas (7.9M views for OPPO, ~60% DM-to-member for Cak Investment Club), and custom AI production systems CAKETING, CakVisual & CakAI Pro.',
  keywords: [
    'Haidar Ghazy Arkan',
    'AI Growth Marketer',
    'Creative Technologist',
    'AI Persona',
    'CAK AI',
    'CAKETING',
    'CakVisual',
    'Luminara Visual Works',
    'Indonesia'
  ],
  authors: [{ name: siteIdentity.name, url: SITE_URL }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Haidar Ghazy Arkan',
    title: 'Haidar Ghazy Arkan | AI-Native Growth Marketer & Content Strategist',
    description:
      '7.9M views on OPPO Diologtech, ~60% DM-to-member conversion on Cak Investment Club, and internal AI production systems CAKETING, CakVisual & CakAI Pro.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Haidar Ghazy Arkan Portfolio Preview'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Haidar Ghazy Arkan | AI-Native Growth Marketer & Content Strategist',
    description:
      'AI content strategy, character-locked AI personas, and custom production systems. 7.9M views & ~60% DM-to-member.',
    images: ['/og-image.png']
  },
  robots: {
    index: true,
    follow: true
  }
};

const themeInitScript = `(function(){try{var t=localStorage.getItem('hga_theme');document.documentElement.dataset.theme=(t==='light'||t==='dark')?t:'dark';document.documentElement.lang='en';}catch(e){document.documentElement.dataset.theme='dark';}})();`;

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: siteIdentity.name,
  jobTitle: 'Head of Creator & AI Marketing Strategist',
  worksFor: {
    '@type': 'Organization',
    name: 'CAK AI'
  },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Institut Seni Indonesia (ISI) Surakarta'
  },
  email: `mailto:${siteIdentity.email}`,
  url: SITE_URL,
  sameAs: [siteIdentity.linkedin, siteIdentity.instagram]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-canvas font-sans text-ink antialiased selection:bg-accent selection:text-accent-ink">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <AppProviders>
          <CinematicIntro />
          <Navbar />
          <main id="main-content">{children}</main>
        </AppProviders>
      </body>
    </html>
  );
}
