import { Check } from 'lucide-react'
import type { ReactNode } from 'react'

import { Reveal } from '@/components/motion/reveal'
import { SectionHeading } from '@/components/section-heading'

const MEMORY_CHIPS = ['Work history', 'Education', 'Addresses', 'Visa status', 'Notice period', 'Links']

/** Instrument panel: machined corners, a mono channel id pinned top-right. */
function Panel({ id, tone, children, className }: { id: string; tone: string; children: ReactNode; className?: string }) {
    return (
        <div className={`group relative flex h-full flex-col justify-between rounded-lg border border-border bg-card p-7 transition-colors hover:border-primary/30 ${className ?? ''}`}>
            <p aria-hidden className={`absolute top-4 right-4 font-mono text-[10px] font-semibold tracking-[0.14em] select-none ${tone}`}>
                {id}
            </p>
            {children}
        </div>
    )
}

export function Features() {
    return (
        <section className="container-page py-24 md:py-32">
            <SectionHeading
                title="Starting with the web's most-repeated question"
                description="Job applications ask it more than any other form. The same browser memory is built to answer whatever the web asks next."
            />

            <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-6">
                {/* Browser Memory — the hero capability */}
                <Reveal className="h-full md:col-span-4">
                    <Panel id="fill.review" tone="text-primary">
                        <div className="flex h-full flex-col justify-between gap-6 sm:flex-row sm:items-center">
                            <div className="max-w-xs">
                                <h3 className="font-display text-2xl font-semibold tracking-tight uppercase">Browser Memory</h3>
                                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                                    Remem scans the page and fills every field from memory, instantly. You review each value, fix anything that&apos;s off, and press submit yourself.
                                </p>
                            </div>
                            <div aria-hidden className="w-full max-w-55 shrink-0 space-y-2 select-none">
                                {[
                                    { label: 'Full legal name', value: 'Alex Rivera' },
                                    { label: 'Most recent employer', value: 'Northwind Labs' },
                                    { label: 'Notice period', value: '30 days' },
                                ].map((field) => (
                                    <div key={field.label} className="rounded-md border border-border bg-background px-3 py-2">
                                        <p className="font-mono text-[9px] font-medium tracking-[0.12em] text-muted-foreground uppercase">{field.label}</p>
                                        <div className="flex items-center justify-between gap-2">
                                            <p className="text-xs">{field.value}</p>
                                            <Check className="size-3 text-primary" />
                                        </div>
                                    </div>
                                ))}
                                <div className="rounded-md border border-boundary/40 bg-boundary/10 py-1.5 text-center font-mono text-[10px] font-semibold tracking-[0.14em] text-boundary uppercase transition-transform duration-300 group-hover:scale-[1.02]">
                                    You press submit
                                </div>
                            </div>
                        </div>
                    </Panel>
                </Reveal>

                {/* One Question, Any ATS — the synonym match resolved */}
                <Reveal delay={0.08} className="h-full md:col-span-2">
                    <Panel id="match.fields" tone="text-track-career">
                        <div className="flex flex-col justify-between h-full">
                            <div>
                                <h3 className="font-display text-xl font-semibold tracking-tight text-balance uppercase text-track-career">One Question, Any ATS</h3>
                                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Greenhouse calls it one thing. Workday calls it another. Remem already knows it&apos;s the same question.</p>
                            </div>
                            <div aria-hidden className="mt-6 select-none">
                                <div className="space-y-1.5">
                                    {['Given name', 'Legal first name'].map((synonym) => (
                                        <p key={synonym} className="w-fit rounded-sm border border-dashed border-steel/60 px-2 py-1 font-mono text-[10px] tracking-wide text-muted-foreground">
                                            “{synonym}”
                                        </p>
                                    ))}
                                </div>
                                <svg viewBox="0 0 200 20" className="my-1 h-5 w-full" fill="none" stroke="var(--track-career)">
                                    <path d="M30,2 Q50,14 96,16" strokeWidth="1.25" strokeDasharray="3 4" opacity="0.85" />
                                    <path d="M40,2 Q55,10 96,14" strokeWidth="1.25" strokeDasharray="3 4" opacity="0.85" />
                                </svg>
                                <p className="w-fit rounded-sm border border-primary/60 bg-primary/15 px-2 py-1 font-mono text-[11px] font-semibold tracking-wide text-primary shadow-[0_4px_16px_-4px_color-mix(in_oklch,var(--primary)_45%,transparent)] transition-shadow duration-300 group-hover:shadow-[0_6px_20px_-4px_color-mix(in_oklch,var(--primary)_55%,transparent)]">
                                    identity.givenName → Alex
                                </p>
                            </div>
                        </div>
                    </Panel>
                </Reveal>

                {/* Teach Remem */}
                <Reveal className="h-full md:col-span-2">
                    <Panel id="memory.profile" tone="text-primary/60">
                        <div className="flex flex-col justify-between h-full">
                            <div>
                                <h3 className="font-display text-lg font-semibold tracking-tight uppercase">Teach Remem</h3>
                                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Type it once — or upload your CV and confirm what Remem extracts, fact by fact.</p>
                            </div>
                            <div aria-hidden className="mt-5 flex flex-wrap gap-1.5 select-none">
                                {MEMORY_CHIPS.map((chip) => (
                                    <span key={chip} className="rounded-sm border border-border bg-background px-2.5 py-1 font-mono text-[10px] tracking-wide text-muted-foreground">
                                        {chip}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </Panel>
                </Reveal>

                {/* Human in Control — the submit boundary */}
                <Reveal delay={0.06} className="h-full md:col-span-2">
                    <Panel id="review.always" tone="text-boundary/60">
                        <div className="flex flex-col justify-between h-full">
                            <div>
                                <h3 className="font-display text-lg font-semibold tracking-tight uppercase">Human in Control</h3>
                                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Remem fills what it can from memory. Whether anything gets submitted is always your call.</p>
                            </div>
                            <div aria-hidden className="mt-5 select-none">
                                <div className="flex items-center justify-between rounded-md border border-border bg-background px-3.5 py-2.5">
                                    <span className="font-mono text-[10px] tracking-[0.12em] text-muted-foreground uppercase">Auto-submit</span>
                                    <span className="rounded-sm bg-boundary/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold tracking-[0.12em] text-boundary uppercase">Never</span>
                                </div>
                            </div>
                        </div>
                    </Panel>
                </Reveal>

                {/* AI When Needed */}
                <Reveal delay={0.12} className="h-full md:col-span-2">
                    <Panel id="ai.drafts" tone="text-track-answer/60">
                        <div className="flex flex-col justify-between h-full">
                            <div>
                                <h3 className="font-display text-lg font-semibold tracking-tight uppercase">AI When Needed</h3>
                                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">AI drafts the “why us?” answers from your real history — you edit and approve.</p>
                            </div>
                            <div aria-hidden className="mt-5 select-none">
                                <p className="rounded-md border border-track-answer/30 bg-background px-3.5 py-2.5 text-[11px] text-muted-foreground italic">
                                    “After seven years shipping developer tools…”
                                </p>
                            </div>
                        </div>
                    </Panel>
                </Reveal>
            </div>
        </section>
    )
}
