import { ArrowLeft } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { JsonLd } from '@/components/json-ld'
import { MdxContent } from '@/components/mdx-content'
import { Badge } from '@/components/ui/badge'
import { getAllPosts, getPost } from '@/lib/blog'
import { siteConfig } from '@/lib/site'
import { formatDate } from '@/lib/utils'

interface BlogPostPageProps {
    params: Promise<{ slug: string }>
}

export function generateStaticParams() {
    return getAllPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const { slug } = await params
    const post = getPost(slug)
    if (!post) return {}
    return {
        title: post.title,
        description: post.description,
        alternates: { canonical: `/blog/${post.slug}` },
        openGraph: {
            type: 'article',
            title: post.title,
            description: post.description,
            publishedTime: post.date,
            authors: [post.author],
            url: `${siteConfig.url}/blog/${post.slug}`,
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.description,
        },
    }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params
    const post = getPost(slug)
    if (!post) notFound()

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        author: { '@type': 'Person', name: post.author },
        publisher: { '@type': 'Organization', name: siteConfig.name, logo: { '@type': 'ImageObject', url: `${siteConfig.url}/logo-512.png` } },
        mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
    }

    return (
        <article className="container-page pt-36 pb-24 md:pt-40">
            <div className="mx-auto max-w-2xl">
                <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground">
                    <ArrowLeft aria-hidden className="size-4" />
                    All posts
                </Link>
                <header className="mt-8">
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                        <time dateTime={post.date}>{formatDate(post.date)}</time>
                        <span aria-hidden>·</span>
                        <span>{post.readingMinutes} min read</span>
                        <span aria-hidden>·</span>
                        <span>{post.author}</span>
                    </div>
                    <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-balance md:text-5xl">{post.title}</h1>
                    <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{post.description}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                            <Badge key={tag} variant="secondary">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                </header>
                <hr className="my-10 border-border" />
                <div className="text-base">
                    <MdxContent source={post.content} />
                </div>
            </div>
            <JsonLd data={jsonLd} />
        </article>
    )
}
