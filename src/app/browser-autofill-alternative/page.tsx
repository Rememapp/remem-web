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
    description: 'Browser autofill fills fixed fields. Remem matches equivalent questions across ATS platforms, drafts open-ended answers, and reviews everything before submit.',
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
        autofill: 'Can sync with your Google or Microsoft account',
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
        description: 'Greenhouse asks for your “given name.” Workday asks for your “legal first name.” Autofill sees two unrelated fields; Remem sees the same question asked twice.',
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
        description: 'Autofill drops values into the page. Remem fills, then waits — every field stays editable until you decide the application is ready.',
    },
]

export default function BrowserAutofillAlternativePage() {
    return (
        <>
            <PageHeader
                title="Remem vs. browser autofill"
                description="Browser autofill remembers a small set of fixed fields. Remem is built for forms where the questions, structure, and answers change from site to site."
            />

            <section className="container-page pb-16">
                <Reveal className="mx-auto max-w-2xl text-center">
                    <p className="text-base leading-relaxed text-muted-foreground sm:text-lg text-pretty">
                        Browser autofill is great at remembering fixed information and filling it the same way across sites. Job applications are different — questions vary, forms change, and many
                        answers require context.
                    </p>
                    <p className="mt-4 font-medium text-foreground text-base sm:text-lg text-pretty">Remem is built for that gap.</p>
                </Reveal>
            </section>

            <section className="container-page pb-24">
                <SectionHeading title="Side by side" description="Same browser, same job application, two different tools." />
                <Reveal className="mt-10">
                    <div className="overflow-x-auto rounded-lg border border-border bg-card shadow-xs">
                        <table className="w-full min-w-160 border-collapse text-left text-[15px] leading-relaxed">
                            <caption className="sr-only">Comparison of built-in browser autofill and Remem across job application scenarios</caption>
                            <thead>
                                <tr className="border-b border-border bg-secondary/40">
                                    <th scope="col" className="px-6 py-4 font-mono text-[11px] font-semibold tracking-[0.12em] text-muted-foreground uppercase">
                                        On a job application
                                    </th>
                                    <th scope="col" className="px-6 py-4 font-mono text-[11px] font-semibold tracking-[0.12em] text-muted-foreground uppercase">
                                        BROWSER AUTOFILL
                                    </th>
                                    <th scope="col" className="px-6 py-4 font-mono text-[11px] font-semibold tracking-[0.12em] text-primary uppercase">
                                        REMEM
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {comparisonRows.map((row) => (
                                    <tr key={row.capability} className="hover:bg-secondary/20 transition-colors">
                                        <th scope="row" className="px-6 py-4.5 align-top font-medium text-foreground max-w-60">
                                            {row.capability}
                                        </th>
                                        <td className="px-6 py-4.5 align-top text-muted-foreground">{row.autofill}</td>
                                        <td className={cn('px-6 py-4.5 align-top', row.rememWins ? 'font-medium text-primary' : 'text-muted-foreground')}>{row.remem}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Reveal>
            </section>

            <section className="container-page pb-24">
                <SectionHeading title="What autofill still misses" description="Three gaps, and how Remem closes them." />
                <div className="mt-10 grid gap-5 md:grid-cols-3">
                    {differentiators.map((item, index) => (
                        <Reveal key={item.title} delay={index * 0.06} className="h-full">
                            <div className="flex h-full flex-col justify-between rounded-lg border border-border bg-card p-6 sm:p-7">
                                <div>
                                    <span className={cn('flex size-10 items-center justify-center rounded-md border', item.tone)}>
                                        <item.icon aria-hidden className="size-5" />
                                    </span>
                                    <h3 className="mt-5 font-display text-lg font-semibold tracking-tight uppercase">{item.title}</h3>
                                    <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>

            <section className="container-page pb-24">
                <Reveal className="mx-auto max-w-2xl rounded-lg border border-border bg-secondary/30 p-6 sm:p-8">
                    <p className="readout text-muted-foreground">USE THE RIGHT TOOL</p>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        Remem is built for job applications today — Greenhouse, Lever, Workday, Ashby, and similar ATS platforms. For a checkout form or a government portal, plain browser autofill is
                        still the right tool. We&apos;d rather say that than let the comparison overreach.
                    </p>
                </Reveal>
            </section>

            <FinalCta />
        </>
    )
}
