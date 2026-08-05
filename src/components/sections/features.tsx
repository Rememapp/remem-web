import { Check, Eye, MousePointerClick, Sparkles, UserRound } from 'lucide-react'

import { Reveal } from '@/components/motion/reveal'
import { SectionHeading } from '@/components/section-heading'

const ATS_PLATFORMS = ['Greenhouse', 'Lever', 'Workday', 'Ashby']

const MEMORY_CHIPS = ['Work history', 'Education', 'Addresses', 'Visa status', 'Notice period', 'Links']

/**
 * Job-application-focused bento grid. Each tile carries a small illustrative
 * visual built from real UI fragments instead of a stock icon-card.
 */
export function Features() {
    return (
        <section className="container-page py-24 md:py-32">
            <SectionHeading
                eyebrow="What it does"
                title="Built for the job hunt"
                description="Remem does one brutal workflow — job applications — exceptionally well. Other form types come later."
            />

            <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-6">
                {/* One-click fill — the hero capability */}
                <Reveal className="md:col-span-4">
                    <div className="group flex h-full flex-col justify-between gap-6 rounded-3xl border border-border bg-card p-7 transition-colors hover:border-primary/30 sm:flex-row sm:items-center">
                        <div className="max-w-xs">
                            <span className="flex size-10 items-center justify-center rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400">
                                <MousePointerClick aria-hidden className="size-5" />
                            </span>
                            <h3 className="mt-4 font-display text-xl font-semibold">One reviewed click</h3>
                            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                A forty-field application becomes one click — after you have seen exactly what will go where. You still press submit.
                            </p>
                        </div>
                        <div aria-hidden className="w-full max-w-55 shrink-0 space-y-2 select-none">
                            {[
                                { label: 'Full legal name', value: 'Alex Rivera' },
                                { label: 'Most recent employer', value: 'Northwind Labs' },
                                { label: 'Notice period', value: '30 days' },
                            ].map((field) => (
                                <div key={field.label} className="rounded-xl border border-border bg-background px-3 py-2">
                                    <p className="text-[9px] font-medium tracking-wide text-muted-foreground uppercase">{field.label}</p>
                                    <div className="flex items-center justify-between gap-2">
                                        <p className="text-xs">{field.value}</p>
                                        <Check className="size-3 text-emerald-500" />
                                    </div>
                                </div>
                            ))}
                            <div className="rounded-full bg-primary py-1.5 text-center text-[10px] font-semibold text-primary-foreground transition-transform duration-300 group-hover:scale-[1.03]">Review &amp; fill</div>
                        </div>
                    </div>
                </Reveal>

                {/* ATS coverage */}
                <Reveal delay={0.08} className="md:col-span-2">
                    <div className="flex h-full flex-col rounded-3xl border border-border bg-card p-7 transition-colors hover:border-primary/30">
                        <h3 className="font-display text-xl font-semibold">Speaks fluent ATS</h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Whatever the platform calls its fields, Remem knows they are the same questions.</p>
                        <ul aria-label="Supported applicant tracking systems" className="mt-auto space-y-2 pt-5">
                            {ATS_PLATFORMS.map((ats) => (
                                <li key={ats} className="flex items-center justify-between rounded-xl border border-border bg-background px-3.5 py-2 text-sm">
                                    {ats}
                                    <Check aria-hidden className="size-3.5 text-emerald-500" />
                                </li>
                            ))}
                        </ul>
                    </div>
                </Reveal>

                {/* Profile memory */}
                <Reveal className="md:col-span-2">
                    <div className="flex h-full flex-col rounded-3xl border border-border bg-card p-7 transition-colors hover:border-primary/30">
                        <span className="flex size-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                            <UserRound aria-hidden className="size-5" />
                        </span>
                        <h3 className="mt-4 font-display text-xl font-semibold">Profile memory</h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Type it once — or upload your CV and confirm what Remem extracts.</p>
                        <div aria-hidden className="mt-auto flex flex-wrap gap-1.5 pt-5 select-none">
                            {MEMORY_CHIPS.map((chip) => (
                                <span key={chip} className="rounded-full border border-border bg-background px-2.5 py-1 text-[11px] text-muted-foreground">
                                    {chip}
                                </span>
                            ))}
                        </div>
                    </div>
                </Reveal>

                {/* Review first */}
                <Reveal delay={0.06} className="md:col-span-2">
                    <div className="flex h-full flex-col rounded-3xl border border-border bg-card p-7 transition-colors hover:border-primary/30">
                        <span className="flex size-10 items-center justify-center rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400">
                            <Eye aria-hidden className="size-5" />
                        </span>
                        <h3 className="mt-4 font-display text-xl font-semibold">You review everything</h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Every value is shown before a field changes. Nothing fills on its own.</p>
                        <div aria-hidden className="mt-auto pt-5 select-none">
                            <div className="flex items-center justify-between rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs">
                                <span className="text-muted-foreground">Auto-submit</span>
                                <span className="rounded-full bg-rose-500/10 px-2.5 py-0.5 font-semibold text-rose-600 dark:text-rose-400">Never</span>
                            </div>
                        </div>
                    </div>
                </Reveal>

                {/* AI drafts */}
                <Reveal delay={0.12} className="md:col-span-2">
                    <div className="flex h-full flex-col rounded-3xl border border-border bg-card p-7 transition-colors hover:border-primary/30">
                        <span className="flex size-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400">
                            <Sparkles aria-hidden className="size-5" />
                        </span>
                        <h3 className="mt-4 font-display text-xl font-semibold">Drafts, not decisions</h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">AI writes the “why us?” answers from your real history — you edit and approve.</p>
                        <div aria-hidden className="mt-auto pt-5 select-none">
                            <p className="rounded-xl border border-border bg-background px-3.5 py-2.5 text-[11px] text-muted-foreground italic">“After seven years shipping developer tools…”</p>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    )
}
