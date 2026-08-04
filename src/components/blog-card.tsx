import Link from 'next/link'

import { Badge } from '@/components/ui/badge'
import type { Post } from '@/lib/blog'
import { formatDate } from '@/lib/utils'

export function BlogCard({ post }: { post: Post }) {
    return (
        <article className="group relative h-full rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span aria-hidden>·</span>
                <span>{post.readingMinutes} min read</span>
            </div>
            <h2 className="mt-3 font-display text-xl font-semibold tracking-tight transition-colors group-hover:text-primary">
                <Link href={`/blog/${post.slug}`} className="outline-none after:absolute after:inset-0 focus-visible:ring-2 focus-visible:ring-ring">
                    {post.title}
                </Link>
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{post.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                        {tag}
                    </Badge>
                ))}
            </div>
        </article>
    )
}
