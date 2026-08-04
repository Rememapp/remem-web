import { Eye, Hand, RefreshCw, PenSquare } from 'lucide-react'

import { Reveal } from '@/components/motion/reveal'
import { SectionHeading } from '@/components/section-heading'

const principles = [
    {
        icon: PenSquare,
        title: 'Fill once',
        detail: 'Teach Remem about yourself in minutes — type it, dictate it, or upload your CV.',
        tint: 'bg-sky-500/10 text-sky-600 dark:text-sky-400',
    },
    {
        icon: RefreshCw,
        title: 'Reuse everywhere',
        detail: 'Every stored answer is ready on the next form, whatever the site calls the field.',
        tint: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    },
    {
        icon: Eye,
        title: 'Review before filling',
        detail: 'See exactly what will go where. Change anything. Then fill in one click.',
        tint: 'bg-violet-500/10 text-violet-600 dark:text-violet-400',
    },
    {
        icon: Hand,
        title: 'Never auto-submit',
        detail: 'Remem stops at the submit button, every time. That click is yours alone.',
        tint: 'bg-rose-500/10 text-rose-600 dark:text-rose-400',
    },
] as const

export function Solution() {
    return (
        <section className="border-y border-border bg-card/40 py-24 md:py-32">
            <div className="container-page">
                <SectionHeading eyebrow="The solution" title="Fill once. Reuse everywhere." description="Remem keeps everything under your control — it suggests, you decide." />
                <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {principles.map((principle, index) => (
                        <Reveal key={principle.title} delay={index * 0.08} className="h-full">
                            <div className="flex h-full flex-col items-center rounded-2xl border border-border bg-card p-6 text-center">
                                <div className={`flex size-12 items-center justify-center rounded-2xl ${principle.tint}`}>
                                    <principle.icon aria-hidden className="size-6" />
                                </div>
                                <h3 className="mt-4 font-display text-lg font-semibold">{principle.title}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{principle.detail}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    )
}
