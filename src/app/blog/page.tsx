import type { Metadata } from 'next'

import { BlogCard } from '@/components/blog-card'
import { PageHeader } from '@/components/page-header'
import { Stagger, StaggerItem } from '@/components/motion/reveal'
import { getAllPosts } from '@/lib/blog'

export const metadata: Metadata = {
    title: 'Blog',
    description: 'Notes on privacy-first software, local-first architecture, and surviving the modern job application — from the team building Remem.',
    alternates: { canonical: '/blog' },
}

export default function BlogPage() {
    const posts = getAllPosts()

    return (
        <>
            <PageHeader eyebrow="Blog" title="Notes from building Remem" description="Privacy, local-first software, and the strange economics of typing your name 400 times a year." />
            <section className="container-page pb-24">
                <Stagger className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {posts.map((post) => (
                        <StaggerItem key={post.slug} className="h-full">
                            <BlogCard post={post} />
                        </StaggerItem>
                    ))}
                </Stagger>
            </section>
        </>
    )
}
