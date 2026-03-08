import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Mintora Xora - Transparent, Community-Focused Token',
  description: 'Mintora Xora is a transparent, community-focused blockchain ecosystem exploring modern financial participation models through diversified investments and strategic capital allocation.',
  keywords: ['Mintora', 'Xora', 'XORA token', 'cryptocurrency', 'blockchain', 'community-focused', 'transparent', 'presale', 'digital assets', 'DeFi'],
  authors: [{ name: 'Mintora Xora Team' }],
  creator: 'Mintora Xora Team',
  publisher: 'Mintora Xora',
  
  metadataBase: new URL('https://xora.capital'),
  alternates: {
    canonical: 'https://xora.capital',
  },
  
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://xora.capital',
    title: 'Mintora Xora - Transparent, Community-Focused Token',
    description: 'Explore a transparent blockchain ecosystem with diversified financial strategies and community-driven growth.',
    siteName: 'Mintora Xora',
    images: [
      {
        url: '/Images/Icon Nobg.png',
        width: 1200,
        height: 630,
        alt: 'Mintora Xora Logo',
        type: 'image/png',
      },
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'Mintora Xora - Transparent, Community-Focused Token',
    description: 'A transparent blockchain ecosystem exploring modern financial models.',
    images: ['/Images/Icon Nobg.png'],
  },
  
  icons: {
    icon: [
      {
        url: '/Images/Icon Nobg.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: '/Images/Icon Nobg.png',
        sizes: '192x192',
        type: 'image/png',
      },
    ],
    apple: {
      url: '/Images/Icon Nobg.png',
      sizes: '180x180',
      type: 'image/png',
    },
    shortcut: '/Images/Icon Nobg.png',
  },
  
  manifest: '/site.webmanifest',
  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1a1a1a" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="XORA" />
      </head>
      <body className="font-sans antialiased flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
