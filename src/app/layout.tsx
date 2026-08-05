import type { Metadata, Viewport } from 'next'
import { Geist, Outfit } from 'next/font/google'
import type { ReactNode } from 'react'

import { Footer } from '@/components/layout/footer'
import { Navbar } from '@/components/layout/navbar'
import { ThemeProvider } from '@/components/layout/theme-provider'
import { JsonLd } from '@/components/json-ld'
import { siteConfig } from '@/lib/site'

import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist', display: 'swap' })
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit', display: 'swap' })

export const metadata: Metadata = {
    metadataBase: new URL(siteConfig.url),
    title: {
        default: `${siteConfig.name} — ${siteConfig.tagline}`,
        template: `%s — ${siteConfig.name}`,
    },
    description: siteConfig.description,
    keywords: [...siteConfig.keywords],
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    alternates: {
        canonical: './',
    },
    openGraph: {
        type: 'website',
        siteName: siteConfig.name,
        title: `${siteConfig.name} — ${siteConfig.tagline}`,
        description: siteConfig.description,
        url: siteConfig.url,
        locale: 'en_US',
    },
    twitter: {
        card: 'summary_large_image',
        title: `${siteConfig.name} — ${siteConfig.tagline}`,
        description: siteConfig.description,
        creator: '@rememapp',
    },
    icons: {
        icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
        apple: [{ url: '/logo-192.png' }],
    },
    robots: {
        index: true,
        follow: true,
    },
}

export const viewport: Viewport = {
    themeColor: [
        { media: '(prefers-color-scheme: dark)', color: '#0b0f19' },
        { media: '(prefers-color-scheme: light)', color: '#f8fafc' },
    ],
    width: 'device-width',
    initialScale: 1,
}

const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo-512.png`,
    sameAs: [siteConfig.links.twitter, siteConfig.links.github],
}

const softwareJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: siteConfig.name,
    applicationCategory: 'BrowserApplication',
    operatingSystem: 'Chrome, Edge, Brave, Arc',
    description: siteConfig.description,
    url: siteConfig.url,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${geist.variable} ${outfit.variable} font-sans`}>
                <ThemeProvider>
                    <a
                        href="#main"
                        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-100 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:text-primary-foreground"
                    >
                        Skip to content
                    </a>
                    <Navbar />
                    <main id="main">{children}</main>
                    <Footer />
                </ThemeProvider>
                <JsonLd data={organizationJsonLd} />
                <JsonLd data={softwareJsonLd} />
            </body>
        </html>
    )
}
