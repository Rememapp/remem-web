import { getAllPosts } from '@/lib/blog'
import { siteConfig } from '@/lib/site'

export const dynamic = 'force-static'

function escapeXml(value: string): string {
    return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')
}

export function GET() {
    const posts = getAllPosts()
    const items = posts
        .map(
            (post) => `        <item>
            <title>${escapeXml(post.title)}</title>
            <link>${siteConfig.url}/blog/${post.slug}</link>
            <guid>${siteConfig.url}/blog/${post.slug}</guid>
            <description>${escapeXml(post.description)}</description>
            <pubDate>${new Date(post.date).toUTCString()}</pubDate>
        </item>`,
        )
        .join('\n')

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
    <channel>
        <title>${escapeXml(`${siteConfig.name} Blog`)}</title>
        <link>${siteConfig.url}/blog</link>
        <description>${escapeXml(metadataDescription)}</description>
        <language>en-us</language>
${items}
    </channel>
</rss>`

    return new Response(xml, {
        headers: {
            'Content-Type': 'application/rss+xml; charset=utf-8',
            'Cache-Control': 'public, max-age=3600',
        },
    })
}

const metadataDescription = 'Notes on privacy-first software, local-first architecture, and the modern job application.'
