import type { MetadataRoute } from 'next'

import { getAllPosts } from '@/lib/blog'
import { siteConfig } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
    const staticRoutes: MetadataRoute.Sitemap = [
        { path: '', priority: 1, changeFrequency: 'weekly' as const },
        { path: '/features', priority: 0.9, changeFrequency: 'monthly' as const },
        { path: '/how-it-works', priority: 0.9, changeFrequency: 'monthly' as const },
        { path: '/faq', priority: 0.8, changeFrequency: 'monthly' as const },
        { path: '/about', priority: 0.6, changeFrequency: 'monthly' as const },
        { path: '/blog', priority: 0.8, changeFrequency: 'weekly' as const },
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

    const postRoutes: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
        url: `${siteConfig.url}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'yearly',
        priority: 0.7,
    }))

    return [...staticRoutes, ...postRoutes]
}
