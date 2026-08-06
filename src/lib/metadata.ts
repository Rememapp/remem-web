import type { Metadata } from 'next'

import { siteConfig } from '@/lib/site'

interface PageMetadataInput {
    /** Page-specific title. Omit for the homepage to use the site default. */
    title?: string
    description: string
    /** Path starting with "/", e.g. "/about". Defaults to the homepage. */
    path?: string
    /** Set true for thin/utility pages that shouldn't be indexed. */
    noindex?: boolean
}

/**
 * Builds page metadata with openGraph/twitter fields resolved from THIS page's
 * own title, description, and URL. Next.js metadata inheritance replaces a
 * parent's openGraph/twitter object wholesale rather than merging per-field, so
 * without this every page silently reused the root layout's homepage OG card.
 */
export function pageMetadata({ title, description, path = '/', noindex = false }: PageMetadataInput): Metadata {
    const resolvedTitle = title ? `${title} — ${siteConfig.name}` : `${siteConfig.name} — ${siteConfig.tagline}`
    const url = path === '/' ? siteConfig.url : `${siteConfig.url}${path}`

    return {
        ...(title ? { title } : {}),
        description,
        alternates: { canonical: path },
        ...(noindex ? { robots: { index: false, follow: false } } : {}),
        openGraph: {
            type: 'website',
            siteName: siteConfig.name,
            title: resolvedTitle,
            description,
            url,
            locale: 'en_US',
        },
        twitter: {
            card: 'summary_large_image',
            title: resolvedTitle,
            description,
            creator: '@ShouvikMohanta',
        },
    }
}
