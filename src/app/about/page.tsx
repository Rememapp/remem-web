import type { Metadata } from 'next'
import Link from 'next/link'
import { HardDrive, ShieldCheck, Brain, UserCheck, Repeat, ArrowRight, Code2 } from 'lucide-react'

import { PageHeader } from '@/components/page-header'
import { Reveal } from '@/components/motion/reveal'
import { FinalCta } from '@/components/sections/final-cta'
import { Button } from '@/components/ui/button'
import { pageMetadata } from '@/lib/metadata'

export const metadata: Metadata = pageMetadata({
    title: 'About: Building a Privacy-First Browser Memory',
    description: 'Why we are building Remem: a browser memory that remembers for you, without your data ever leaving your hands.',
    path: '/about',
})

const principles = [
    {
        icon: HardDrive,
        title: 'Local First',
        description: 'Your memory lives with you, on your device.',
        tone: 'text-primary border-primary/30 bg-primary/10',
        hover: 'hover:border-primary/50 hover:shadow-[0_8px_30px_-4px_color-mix(in_oklch,var(--primary)_20%,transparent)]',
    },
    {
        icon: ShieldCheck,
        title: 'Privacy First',
        description: 'Your data stays under your control.',
        tone: 'text-track-career border-track-career/30 bg-track-career/10',
        hover: 'hover:border-track-career/50 hover:shadow-[0_8px_30px_-4px_color-mix(in_oklch,var(--track-career)_20%,transparent)]',
    },
    {
        icon: Brain,
        title: 'AI When Needed',
        description: 'Use AI for writing, not guessing facts.',
        tone: 'text-track-answer border-track-answer/30 bg-track-answer/10',
        hover: 'hover:border-track-answer/50 hover:shadow-[0_8px_30px_-4px_color-mix(in_oklch,var(--track-answer)_20%,transparent)]',
    },
    {
        icon: UserCheck,
        title: 'Human in Control',
        description: 'Remem never submits forms for you.',
        tone: 'text-boundary border-boundary/30 bg-boundary/10',
        hover: 'hover:border-boundary/50 hover:shadow-[0_8px_30px_-4px_color-mix(in_oklch,var(--boundary)_20%,transparent)]',
    },
    {
        icon: Repeat,
        title: 'Never Repeat Yourself',
        description: 'Teach Remem once. Reuse it everywhere.',
        tone: 'text-primary border-primary/30 bg-primary/10',
        hover: 'hover:border-primary/50 hover:shadow-[0_8px_30px_-4px_color-mix(in_oklch,var(--primary)_20%,transparent)]',
    },
] as const

export default function AboutPage() {
    return (
        <>
            <PageHeader title="The web should remember you — without owning you" />

            <section className="container-page pb-24 md:pb-32 space-y-24 md:space-y-32">
                {/* 1. THE PROBLEM */}
                <Reveal className="border-t border-border pt-14 md:pt-18">
                    <div className="grid gap-8 lg:grid-cols-[12rem_1fr] lg:gap-12">
                        <div className="flex items-center gap-2 pt-1">
                            <span className="size-1.5 bg-boundary/80" />
                            <span className="readout text-[10px] tracking-[0.2em] text-muted-foreground">01 // THE PROBLEM</span>
                        </div>
                        <div className="space-y-4 max-w-3xl">
                            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight uppercase text-foreground">
                                Every website asks who you are. Again, and again.
                            </h2>
                            <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
                                Somewhere along the way, we accepted a strange deal: every website gets to ask who you are, and you get to answer — again, and again, and again.
                            </p>
                            <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
                                The same employment history into the fifth ATS this week. The same address into another government portal. The same “tell us about yourself” for the tenth time.
                            </p>
                        </div>
                    </div>
                </Reveal>

                {/* 2. THE WRONG TRADE */}
                <Reveal className="border-t border-border pt-14 md:pt-18">
                    <div className="grid gap-8 lg:grid-cols-[12rem_1fr] lg:gap-12">
                        <div className="flex items-center gap-2 pt-1">
                            <span className="size-1.5 bg-track-answer/80" />
                            <span className="readout text-[10px] tracking-[0.2em] text-muted-foreground">02 // THE WRONG TRADE</span>
                        </div>
                        <div className="rounded-lg border border-border bg-card p-6 sm:p-8 md:p-10 space-y-4 max-w-3xl">
                            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight uppercase text-foreground">Convenience bought with your privacy</h2>
                            <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
                                The tools that promised to fix this made a different trade. They fixed the typing by taking your data — syncing your life to someone else&apos;s servers, selling
                                convenience back to you, and asking you to trust a privacy policy you&apos;ll never read.
                            </p>
                        </div>
                    </div>
                </Reveal>

                {/* 3. OUR PHILOSOPHY (Emotional Centerpiece) */}
                <Reveal className="my-12 md:my-16 rounded-lg border border-primary/20 bg-primary/5 px-6 py-12 sm:px-12 sm:py-16 md:px-16 md:py-20 text-center space-y-8">
                    <div className="inline-flex items-center gap-2 rounded-sm border border-primary/30 px-3 py-1 bg-background/60">
                        <span className="size-1.5 bg-primary" />
                        <span className="readout text-[10px] tracking-[0.2em] text-primary">03 // OUR PHILOSOPHY</span>
                    </div>
                    <blockquote className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-tight uppercase text-foreground leading-[1.12] text-balance max-w-4xl mx-auto">
                        “Memory belongs to the person doing the remembering.”
                    </blockquote>
                    <p className="text-base sm:text-lg leading-relaxed text-muted-foreground/80 font-normal max-w-xl mx-auto text-pretty">
                        Not a server. Not a corporate data lake. Remem is a memory layer for your browser that lives with you, on your device.
                    </p>
                </Reveal>

                {/* 4. THE PRINCIPLES (HOW REMEM WORKS) */}
                <Reveal className="border-t border-border pt-14 md:pt-18 space-y-10">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="size-1.5 bg-primary/80" />
                                <span className="readout text-[10px] tracking-[0.2em] text-muted-foreground">04 // THE PRINCIPLES</span>
                            </div>
                            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight uppercase text-foreground">How Remem works</h2>
                        </div>
                        <p className="text-sm text-muted-foreground max-w-md">Five non-negotiable rules guiding how browser memory handles your data.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        {principles.map((p, idx) => {
                            const Icon = p.icon
                            const isLast = idx === principles.length - 1
                            return (
                                <div
                                    key={p.title}
                                    className={`group rounded-lg border border-border bg-card p-6 sm:p-7 transition-all duration-300 ease-out hover:-translate-y-0.75 ${p.hover} ${
                                        isLast ? 'sm:col-span-2 lg:col-span-1' : ''
                                    }`}
                                >
                                    <div className={`size-10 rounded-md border flex items-center justify-center mb-4 transition-colors ${p.tone}`}>
                                        <Icon className="size-5 transition-transform duration-300 ease-out group-hover:scale-110" />
                                    </div>
                                    <h3 className="font-display text-lg font-bold tracking-tight uppercase text-foreground transition-colors">{p.title}</h3>
                                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
                                </div>
                            )
                        })}
                    </div>
                </Reveal>

                {/* 5. THE VISION & CLOSING MANIFESTO */}
                <Reveal className="border-t border-border pt-16 md:pt-24 space-y-14">
                    <div className="grid gap-8 lg:grid-cols-[12rem_1fr] lg:gap-12">
                        <div className="flex items-center gap-2 pt-1">
                            <span className="size-1.5 bg-track-career/80" />
                            <span className="readout text-[10px] tracking-[0.2em] text-muted-foreground">05 // THE VISION</span>
                        </div>
                        <div className="space-y-4 max-w-3xl">
                            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight uppercase text-foreground">Building memory for every form on the web</h2>
                            <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
                                The vision is bigger than job applications. Every form on the web — visas, admissions, insurance, onboarding — is the same question asked with different labels. A
                                browser that understands that, privately, saves you hours of your life a year.
                            </p>
                            <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
                                {/* The extension is open source, because claims about privacy should be checkable. If that resonates, join the waitlist — or inspect the code. */}
                                The extension will be open sourced soon, because claims about privacy should be checkable. If that resonates, join the waitlist.
                            </p>
                        </div>
                    </div>

                    {/* Closing Manifesto Banner */}
                    <div className="rounded-lg border border-border bg-card p-8 sm:p-12 md:p-16 text-center space-y-8">
                        <blockquote className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight uppercase text-foreground leading-tight text-balance max-w-3xl mx-auto">
                            The web asks the same questions every day.
                            <br />
                            <span className="text-primary">We think you should only have to answer them once.</span>
                        </blockquote>

                        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                            <Button asChild variant="default">
                                <Link href="#waitlist">
                                    Join the Waitlist
                                    <ArrowRight className="ml-2 size-4" />
                                </Link>
                            </Button>
                            <div className="relative group/tooltip inline-flex items-center">
                                <Button variant="outline" disabled className="cursor-not-allowed opacity-60">
                                    <Code2 className="mr-2 size-4" />
                                    Read the Code
                                    <span className="ml-2 rounded-sm border border-primary/30 bg-primary/10 px-1.5 py-0.5 text-[9px] font-mono text-primary">SOON</span>
                                </Button>
                                <div
                                    role="tooltip"
                                    className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 hidden w-max max-w-xs rounded-md border border-border bg-popover px-3 py-1.5 text-center font-mono text-[11px] text-popover-foreground shadow-md group-hover/tooltip:block"
                                >
                                    Codebase will be open sourced soon
                                </div>
                            </div>
                        </div>
                    </div>
                </Reveal>
            </section>

            <FinalCta />
        </>
    )
}
