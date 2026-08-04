import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

const CHANGELOG_DIR = path.join(process.cwd(), 'content', 'changelog')

export interface ChangelogEntry {
    version: string
    title: string
    date: string
    content: string
}

export function getChangelog(): ChangelogEntry[] {
    if (!fs.existsSync(CHANGELOG_DIR)) return []
    return fs
        .readdirSync(CHANGELOG_DIR)
        .filter((f) => /\.mdx?$/.test(f))
        .map((fileName) => {
            const raw = fs.readFileSync(path.join(CHANGELOG_DIR, fileName), 'utf8')
            const { data, content } = matter(raw)
            return {
                version: String(data.version ?? fileName.replace(/\.mdx?$/, '')),
                title: String(data.title ?? ''),
                date: String(data.date ?? ''),
                content,
            }
        })
        .sort((a, b) => +new Date(b.date) - +new Date(a.date))
}
