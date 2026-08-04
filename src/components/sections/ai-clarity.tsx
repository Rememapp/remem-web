import { Database, Sparkles, Check } from 'lucide-react'

import { Reveal } from '@/components/motion/reveal'
import { SectionHeading } from '@/components/section-heading'

const deterministic = ['Your name, email, and phone', 'Addresses and dates', 'Employment and education history', 'Document numbers and IDs']
const generative = ['Cover letters', 'Essays and motivation answers', 'Statements of purpose', 'Anything genuinely open-ended']

export function AiClarity() {
    return (
        <section className="border-y border-border bg-card/40 py-24 md:py-32">
            <div className="container-page">
                <SectionHeading
                    eyebrow="About the AI"
                    title="AI is not used for everything. On purpose."
                    description="Facts are filled from memory, exactly as you saved them. AI only writes — and only when a question actually needs writing."
                />
                <div className="mt-14 grid gap-4 md:grid-cols-2">
                    <Reveal className="h-full">
                        <div className="h-full rounded-3xl border border-border bg-card p-8">
                            <div className="flex items-center gap-3">
                                <span className="flex size-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                                    <Database aria-hidden className="size-5" />
                                </span>
                                <div>
                                    <h3 className="font-display text-lg font-semibold">Deterministic memory</h3>
                                    <p className="text-sm text-muted-foreground">Exact values, zero guessing</p>
                                </div>
                            </div>
                            <ul className="mt-6 space-y-3">
                                {deterministic.map((item) => (
                                    <li key={item} className="flex items-center gap-2.5 text-sm">
                                        <Check aria-hidden className="size-4 shrink-0 text-emerald-500" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <p className="mt-6 border-t border-border pt-4 text-sm leading-relaxed text-muted-foreground">
                                A model never decides what your address is. These fields are matched with deterministic logic and filled verbatim from your profile.
                            </p>
                        </div>
                    </Reveal>
                    <Reveal delay={0.1} className="h-full">
                        <div className="h-full rounded-3xl border border-border bg-card p-8">
                            <div className="flex items-center gap-3">
                                <span className="flex size-11 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400">
                                    <Sparkles aria-hidden className="size-5" />
                                </span>
                                <div>
                                    <h3 className="font-display text-lg font-semibold">AI writing assistant</h3>
                                    <p className="text-sm text-muted-foreground">Drafts, never decisions</p>
                                </div>
                            </div>
                            <ul className="mt-6 space-y-3">
                                {generative.map((item) => (
                                    <li key={item} className="flex items-center gap-2.5 text-sm">
                                        <Check aria-hidden className="size-4 shrink-0 text-violet-500" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <p className="mt-6 border-t border-border pt-4 text-sm leading-relaxed text-muted-foreground">
                                Drafted from your real history, shown to you first, and rewritable in place. AI assists — it never replaces your voice or your judgment.
                            </p>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    )
}
