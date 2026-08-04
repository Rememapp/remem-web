import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

export interface PostFrontmatter {
    title: string
    description: string
    date: string
    author: string
    tags: string[]
}

export interface Post extends PostFrontmatter {
    slug: string
    content: string
    readingMinutes: number
}

function parsePost(fileName: string): Post {
    const slug = fileName.replace(/\.mdx?$/, '')
    const raw = fs.readFileSync(path.join(BLOG_DIR, fileName), 'utf8')
    const { data, content } = matter(raw)
    const frontmatter = data as PostFrontmatter
    return {
        ...frontmatter,
        tags: frontmatter.tags ?? [],
        slug,
        content,
        readingMinutes: Math.max(1, Math.round(content.split(/\s+/).length / 200)),
    }
}

export function getAllPosts(): Post[] {
    if (!fs.existsSync(BLOG_DIR)) return []
    return fs
        .readdirSync(BLOG_DIR)
        .filter((f) => /\.mdx?$/.test(f))
        .map(parsePost)
        .sort((a, b) => +new Date(b.date) - +new Date(a.date))
}

export function getPost(slug: string): Post | undefined {
    return getAllPosts().find((p) => p.slug === slug)
}
