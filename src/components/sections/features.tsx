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
                title="Built for the job hunt"
                description="Remem does one brutal workflow — job applications — exceptionally well. Other form types come later."
            />

            <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-6">
                {/* One reviewed click — the hero capability */}
                <Reveal className="h-full md:col-span-4">
                    <Panel id="fill.review" tone="text-primary">
                        <div className="flex h-full flex-col justify-between gap-6 sm:flex-row sm:items-center">
                            <div className="max-w-xs">
                                <h3 className="font-display text-xl font-semibold tracking-tight uppercase">One reviewed click</h3>
                                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                                    A forty-field application becomes one click — after you have seen exactly what will go where. You still press submit.
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
                                <div className="rounded-md bg-primary py-1.5 text-center font-mono text-[10px] font-semibold tracking-[0.14em] text-primary-foreground uppercase transition-transform duration-300 group-hover:scale-[1.02]">
                                    Review &amp; fill
                                </div>
                            </div>
                        </div>
                    </Panel>
                </Reveal>

                {/* Synonym matching — the ghost tracks resolved */}
                <Reveal delay={0.08} className="h-full md:col-span-2">
                    <Panel id="match.fields" tone="text-track-career">
                        <div className="flex flex-col justify-between h-full">
                            <div>
                                <h3 className="font-display text-xl font-semibold tracking-tight uppercase">Speaks fluent ATS</h3>
                                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                                    Whatever Greenhouse, Lever, Workday, or Ashby calls a field, Remem knows they are the same question.
                                </p>
                            </div>
                            <div aria-hidden className="mt-6 select-none">
                                <div className="space-y-1.5">
                                    {['Given name', 'Legal first name'].map((synonym) => (
                                        <p key={synonym} className="w-fit rounded-sm border border-dashed border-steel/60 px-2 py-1 font-mono text-[10px] tracking-wide text-muted-foreground">
                                            “{synonym}”
                                        </p>
                                    ))}
                                </div>
                                <svg viewBox="0 0 200 20" className="my-1 h-5 w-full" fill="none" stroke="var(--steel)">
                                    <path d="M30,2 Q50,14 96,16" strokeDasharray="3 4" opacity="0.6" />
                                    <path d="M40,2 Q55,10 96,14" strokeDasharray="3 4" opacity="0.6" />
                                </svg>
                                <p className="w-fit rounded-sm border border-primary/40 bg-primary/10 px-2 py-1 font-mono text-[10px] font-semibold tracking-wide text-primary">identity.givenName → Alex</p>
                            </div>
                        </div>
                    </Panel>
                </Reveal>

                {/* Profile memory */}
                <Reveal className="h-full md:col-span-2">
                    <Panel id="memory.profile" tone="text-primary">
                        <div className="flex flex-col justify-between h-full">
                            <div>
                                <h3 className="font-display text-xl font-semibold tracking-tight uppercase">Profile memory</h3>
                                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Type it once — or upload your CV and confirm what Remem extracts, fact by fact.</p>
                            </div>
                            <div aria-hidden className="mt-6 flex flex-wrap gap-1.5 select-none">
                                {MEMORY_CHIPS.map((chip) => (
                                    <span key={chip} className="rounded-sm border border-border bg-background px-2.5 py-1 font-mono text-[10px] tracking-wide text-muted-foreground">
                                        {chip}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </Panel>
                </Reveal>

                {/* Review first — the boundary */}
                <Reveal delay={0.06} className="h-full md:col-span-2">
                    <Panel id="review.always" tone="text-boundary">
                        <div className="flex flex-col justify-between h-full">
                            <div>
                                <h3 className="font-display text-xl font-semibold tracking-tight uppercase">You review everything</h3>
                                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Every value is shown before a field changes. Nothing fills on its own.</p>
                            </div>
                            <div aria-hidden className="mt-6 select-none">
                                <div className="flex items-center justify-between rounded-md border border-border bg-background px-3.5 py-2.5">
                                    <span className="font-mono text-[10px] tracking-[0.12em] text-muted-foreground uppercase">Auto-submit</span>
                                    <span className="rounded-sm bg-boundary/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold tracking-[0.12em] text-boundary uppercase">Never</span>
                                </div>
                            </div>
                        </div>
                    </Panel>
                </Reveal>

                {/* AI drafts */}
                <Reveal delay={0.12} className="h-full md:col-span-2">
                    <Panel id="ai.drafts" tone="text-track-answer">
                        <div className="flex flex-col justify-between h-full">
                            <div>
                                <h3 className="font-display text-xl font-semibold tracking-tight uppercase">Drafts, not decisions</h3>
                                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">AI writes the “why us?” answers from your real history — you edit and approve.</p>
                            </div>
                            <div aria-hidden className="mt-6 select-none">
                                <p className="rounded-md border border-track-answer/30 bg-background px-3.5 py-2.5 text-[11px] text-muted-foreground italic">“After seven years shipping developer tools…”</p>
                            </div>
                        </div>
                    </Panel>
                </Reveal>
            </div>
        </section>
    )
}
