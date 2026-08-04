import { getAllPosts, getPost } from '@/lib/blog'
import { OG_SIZE, renderOgImage } from '@/lib/og'

export const alt = 'Remem blog post'
export const size = OG_SIZE
export const contentType = 'image/png'

export function generateStaticParams() {
    return getAllPosts().map((post) => ({ slug: post.slug }))
}

export default async function OgImage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const post = getPost(slug)
    return renderOgImage({
        title: post?.title ?? 'Remem Blog',
        subtitle: post?.description ?? 'Notes on privacy-first, local-first software.',
    })
}
