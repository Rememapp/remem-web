import { Reveal } from '@/components/motion/reveal'
import { SectionHeading } from '@/components/section-heading'

const deterministic = ['Your name, email, and phone', 'Addresses and dates', 'Employment and education history', 'Document numbers and IDs']
const generative = ['Cover letters', 'Essays and motivation answers', 'Statements of purpose', 'Anything genuinely open-ended']

/**
 * The two channels, kept visually apart on purpose: deterministic memory rides
 * the violet identity ink; AI writing rides amber, the draft ink. Conflating
 * them would break the product's core promise.
 */
export function AiClarity() {
    return (
        <section className="container-page py-24 md:py-32">
            <div className="container-page">
                <SectionHeading
                    align="left"
                    title="AI is not used for everything. On purpose"
                    description="Facts are filled from memory, exactly as you saved them. AI only writes — and only when a question actually needs writing."
                />
                <div className="mt-14 grid gap-4 md:grid-cols-2">
                    <Reveal className="h-full">
                        <div className="flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card">
                            <div className="flex items-center justify-between bg-primary px-6 py-3">
                                <h3 className="font-mono text-xs font-semibold tracking-[0.16em] text-primary-foreground uppercase">Deterministic channel</h3>
                                <p className="font-mono text-[10px] tracking-[0.12em] text-primary-foreground/80 uppercase">Facts</p>
                            </div>
                            <div className="flex flex-1 flex-col p-7">
                                <p className="text-sm text-muted-foreground">Exact values, zero guessing.</p>
                                <ul className="mt-5 space-y-3">
                                    {deterministic.map((item) => (
                                        <li key={item} className="flex items-center gap-2.5 text-sm">
                                            <span aria-hidden className="size-1.5 shrink-0 bg-primary" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                                <p className="mt-auto border-t border-border pt-4 text-sm leading-relaxed text-muted-foreground">
                                    A model never decides what your address is. These fields are matched with deterministic logic and filled verbatim from your profile.
                                </p>
                            </div>
                        </div>
                    </Reveal>
                    <Reveal delay={0.1} className="h-full">
                        <div className="flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card">
                            <div className="flex items-center justify-between bg-track-answer px-6 py-3">
                                <h3 className="font-mono text-xs font-semibold tracking-[0.16em] text-background uppercase dark:text-background">AI channel</h3>
                                <p className="font-mono text-[10px] tracking-[0.12em] text-background/80 uppercase">Drafts only</p>
                            </div>
                            <div className="flex flex-1 flex-col p-7">
                                <p className="text-sm text-muted-foreground">Drafts, never decisions.</p>
                                <ul className="mt-5 space-y-3">
                                    {generative.map((item) => (
                                        <li key={item} className="flex items-center gap-2.5 text-sm">
                                            <span aria-hidden className="size-1.5 shrink-0 bg-track-answer" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                                <p className="mt-auto border-t border-border pt-4 text-sm leading-relaxed text-muted-foreground">
                                    Drafted from your real history, shown to you first, and rewritable in place. AI assists — it never replaces your voice or your judgment.
                                </p>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    )
}
