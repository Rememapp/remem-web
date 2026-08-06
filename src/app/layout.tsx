import type { Metadata, Viewport } from 'next'
import { Chakra_Petch, Geist, Geist_Mono } from 'next/font/google'
import type { ReactNode } from 'react'

import { BackgroundFx } from '@/components/background-fx'
import { Footer } from '@/components/layout/footer'
import { Navbar } from '@/components/layout/navbar'
import { ThemeProvider } from '@/components/layout/theme-provider'
import { JsonLd } from '@/components/json-ld'
import { siteConfig } from '@/lib/site'
import { Analytics } from '@vercel/analytics/next'

import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist', display: 'swap' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono', display: 'swap' })
const chakra = Chakra_Petch({ weight: ['500', '600', '700'], subsets: ['latin'], variable: '--font-chakra', display: 'swap' })

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
        creator: '@ShouvikMohanta',
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
        { media: '(prefers-color-scheme: dark)', color: '#0b0e14' },
        { media: '(prefers-color-scheme: light)', color: '#f7f8fa' },
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

const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
}

const directionContract = `impeccable direction contract — seed f17b9659 (challenger: collider event display)
THESIS: The page scan is one held collision event: facts curve out of your memory as
classified signal tracks, reviewed while frozen. Refuses the dark-SaaS glow page with
particle background and bento icon-cards.
OWN-WORLD: Vacuum-black ground, detector-steel rings and hairlines, tracks colored by
fact type — violet identity, cyan career, amber AI answers, red reserved for the one
hard boundary (the submit Remem never presses). Chakra Petch caps for display, Geist
body, Geist Mono readouts with tabular figures. Machined 8px corners, no gradients.
STORY: A job seeker sees their own repetition held still, understands facts fill
deterministically from their device, AI only drafts, and they always press submit —
then joins the waitlist.
FIRST VIEWPORT: Left: display-caps headline with violet square full stop, two-line
subcopy, waitlist input + button, mono status readout. Right/below: the live browser
demo as the event source, tracks blooming from it to pinned fact labels.
FORM: Collider event display — user-chosen catalog challenger over grounded #4
(terminal/diff), round 2 after one full re-roll.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish
review, the verdict, and DESIGN.md`

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${geist.variable} ${geistMono.variable} ${chakra.variable} font-sans`}>
                <div hidden aria-hidden data-impeccable-contract dangerouslySetInnerHTML={{ __html: `<!--\n${directionContract}\n-->` }} />
                <ThemeProvider>
                    <BackgroundFx />
                    <a
                        href="#main"
                        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-100 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:text-primary-foreground"
                    >
                        Skip to content
                    </a>
                    <Navbar />
                    <main id="main">{children}</main>
                    <Footer />
                </ThemeProvider>
                <Analytics />
                <JsonLd data={organizationJsonLd} />
                <JsonLd data={softwareJsonLd} />
                <JsonLd data={websiteJsonLd} />
            </body>
        </html>
    )
}
