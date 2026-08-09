import type { MetadataRoute } from 'next'

import { siteConfig } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
    const staticRoutes: MetadataRoute.Sitemap = [
        { path: '', priority: 1, changeFrequency: 'weekly' as const },
        { path: '/features', priority: 0.9, changeFrequency: 'monthly' as const },
        { path: '/how-it-works', priority: 0.9, changeFrequency: 'monthly' as const },
        { path: '/faq', priority: 0.8, changeFrequency: 'monthly' as const },
        { path: '/browser-autofill-alternative', priority: 0.7, changeFrequency: 'monthly' as const },
        { path: '/about', priority: 0.6, changeFrequency: 'monthly' as const },
        { path: '/changelog', priority: 0.6, changeFrequency: 'weekly' as const },
        { path: '/contact', priority: 0.5, changeFrequency: 'yearly' as const },
        { path: '/privacy', priority: 0.4, changeFrequency: 'yearly' as const },
        { path: '/terms', priority: 0.4, changeFrequency: 'yearly' as const },
    ].map(({ path, priority, changeFrequency }) => ({
        url: `${siteConfig.url}${path}`,
        lastModified: new Date(),
        changeFrequency,
        priority,
    }))

    return staticRoutes
}
