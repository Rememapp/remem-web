import type { Metadata } from 'next'

import { MdxContent } from '@/components/mdx-content'
import { PageHeader } from '@/components/page-header'
import { Reveal } from '@/components/motion/reveal'
import { Badge } from '@/components/ui/badge'
import { getChangelog } from '@/lib/changelog'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = {
    title: 'Changelog',
    description: 'What we are building and shipping on the way to the Remem launch.',
    alternates: { canonical: '/changelog' },
}

export default function ChangelogPage() {
    const entries = getChangelog()

    return (
        <>
            <PageHeader title="Building in the open" description="Progress notes on the road to launch. New entries land here first." />
            <section className="container-page pb-24">
                <div className="mx-auto max-w-2xl space-y-12">
                    {entries.map((entry) => (
                        <Reveal key={entry.version}>
                            <article className="relative border-l border-border pl-8">
                                <span aria-hidden className="absolute top-1.5 -left-[5px] size-2.5 bg-primary" />
                                <div className="flex flex-wrap items-center gap-3">
                                    <Badge>{entry.version}</Badge>
                                    <time dateTime={entry.date} className="font-mono text-xs tracking-wide text-muted-foreground tnum">
                                        {formatDate(entry.date)}
                                    </time>
                                </div>
                                <h2 className="mt-3 font-display text-2xl font-bold tracking-tight">{entry.title}</h2>
                                <div className="mt-2">
                                    <MdxContent source={entry.content} />
                                </div>
                            </article>
                        </Reveal>
                    ))}
                </div>
            </section>
        </>
    )
}
