import { Eye, Layers, Sparkles, type LucideIcon } from 'lucide-react'
import type { Metadata } from 'next'

import { PageHeader } from '@/components/page-header'
import { Reveal } from '@/components/motion/reveal'
import { SectionHeading } from '@/components/section-heading'
import { FinalCta } from '@/components/sections/final-cta'
import { pageMetadata } from '@/lib/metadata'
import { cn } from '@/lib/utils'

export const metadata: Metadata = pageMetadata({
    title: 'Browser Autofill Alternative: What Remem Adds',
    description:
        'Chrome and Edge autofill fill a handful of fixed fields. See exactly where that stops and where Remem picks up — cross-site field matching, AI-drafted answers, and a review step before anything submits.',
    path: '/browser-autofill-alternative',
})

interface ComparisonRow {
    capability: string
    autofill: string
    remem: string
    rememWins: boolean
}

const comparisonRows: ComparisonRow[] = [
    { capability: 'Name, email, address, phone', autofill: 'Fills it', remem: 'Fills it', rememWins: false },
    {
        capability: '“First name”, “Given name”, “Legal first name”',
        autofill: 'Treated as unrelated fields',
        remem: 'Recognized as the same question',
        rememWins: true,
    },
    {
        capability: 'A forty-field, multi-step ATS application',
        autofill: 'Fills a few fields, skips the rest',
        remem: 'Maps and fills the whole form',
        rememWins: true,
    },
    {
        capability: '“Why do you want to work here?”',
        autofill: 'Leaves it blank',
        remem: 'Drafts it from your history, for you to edit',
        rememWins: true,
    },
    {
        capability: 'Reviewing what gets filled',
        autofill: 'Fills silently',
        remem: 'Shows you every value before you submit',
        rememWins: true,
    },
    {
        capability: 'Where your data lives',
        autofill: 'Can sync to your Google or Microsoft account',
        remem: 'Stays on your device unless you turn on backup',
        rememWins: true,
    },
]

interface Differentiator {
    icon: LucideIcon
    tone: string
    title: string
    description: string
}

const differentiators: Differentiator[] = [
    {
        icon: Layers,
        tone: 'text-track-career border-track-career/30 bg-track-career/10',
        title: 'Understands equivalent questions',
        description:
            'Greenhouse asks for your “given name.” Workday asks for your “legal first name.” Autofill sees two unrelated fields; Remem sees the same question asked twice.',
    },
    {
        icon: Sparkles,
        tone: 'text-track-answer border-track-answer/30 bg-track-answer/10',
        title: 'Drafts what autofill leaves blank',
        description:
            'Open-ended questions — cover letters, “tell us about yourself” — have no fixed value to autofill. Remem drafts them from your real history, and you edit before any of it is used.',
    },
    {
        icon: Eye,
        tone: 'text-primary border-primary/30 bg-primary/10',
        title: 'Shows you before it submits anything',
        description: 'Autofill drops values straight into the page. Remem fills, then waits — every field stays editable until you decide the application is ready.',
    },
]

export default function BrowserAutofillAlternativePage() {
    return (
        <>
            <PageHeader
                title="Remem vs. browser autofill"
                description="Autofill fills a handful of fields. Job applications ask for a lot more than that — here's exactly where the two differ."
            />

            <section className="container-page pb-12">
                <Reveal className="mx-auto max-w-2xl text-center">
                    <p className="text-lg leading-relaxed text-muted-foreground text-pretty">
                        Browser autofill is good at what it&apos;s built for: a short list of fixed fields, filled the same way on every site. A forty-field job application is a different problem —
                        one autofill was never built to solve.
                    </p>
                </Reveal>
            </section>

            <section className="container-page pb-24">
                <SectionHeading title="Side by side" description="Same browser, same job application, two different tools." />
                <Reveal className="mt-10">
                    <div className="overflow-x-auto rounded-lg border border-border">
                        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                            <caption className="sr-only">Comparison of browser autofill and Remem across common job-application scenarios</caption>
                            <thead>
                                <tr className="border-b border-border bg-secondary/40">
                                    <th scope="col" className="p-4 font-mono text-[11px] font-semibold tracking-[0.1em] text-muted-foreground uppercase">
                                        On a job application
                                    </th>
                                    <th scope="col" className="p-4 font-mono text-[11px] font-semibold tracking-[0.1em] text-muted-foreground uppercase">
                                        Browser autofill
                                    </th>
                                    <th scope="col" className="p-4 font-mono text-[11px] font-semibold tracking-[0.1em] text-primary uppercase">
                                        Remem
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {comparisonRows.map((row) => (
                                    <tr key={row.capability}>
                                        <th scope="row" className="p-4 align-top font-medium text-foreground">
                                            {row.capability}
                                        </th>
                                        <td className="p-4 align-top text-muted-foreground">{row.autofill}</td>
                                        <td className={cn('p-4 align-top', row.rememWins ? 'font-medium text-primary' : 'text-muted-foreground')}>{row.remem}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Reveal>
            </section>

            <section className="container-page pb-24">
                <SectionHeading title="What autofill can't do" description="Three gaps, and how Remem closes them." />
                <div className="mt-10 grid gap-4 md:grid-cols-3">
                    {differentiators.map((item, index) => (
                        <Reveal key={item.title} delay={index * 0.06} className="h-full">
                            <div className="flex h-full flex-col rounded-lg border border-border bg-card p-6">
                                <span className={cn('flex size-10 items-center justify-center rounded-md border', item.tone)}>
                                    <item.icon aria-hidden className="size-5" />
                                </span>
                                <h3 className="mt-4 font-display text-lg font-semibold tracking-tight uppercase">{item.title}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>

            <section className="container-page pb-24">
                <Reveal className="mx-auto max-w-2xl rounded-lg border border-border bg-secondary/30 p-6 sm:p-8">
                    <p className="readout text-muted-foreground">Where autofill is still the better tool</p>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        Remem is built for job applications today — Greenhouse, Lever, Workday, Ashby, and similar ATS platforms. For a checkout form or a government portal, plain browser autofill
                        is still the right tool. We&apos;d rather say that here than let the comparison overreach.
                    </p>
                </Reveal>
            </section>

            <FinalCta />
        </>
    )
}
