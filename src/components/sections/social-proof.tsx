import { Code, Lock, Radio, Users } from 'lucide-react'

import { Reveal } from '@/components/motion/reveal'

const signals = [
    { icon: Radio, label: 'Launching soon' },
    { icon: Code, label: 'Open-source extension' },
    { icon: Lock, label: 'Local-first by design' },
    { icon: Users, label: 'Built with early testers' },
] as const

/** Placeholder trust strip — swap for GitHub stars, user counts, and testimonials at launch. */
export function SocialProof() {
    return (
        <section className="border-y border-border bg-card/40">
            <Reveal from="none">
                <div className="container-page flex flex-wrap items-center justify-center gap-x-10 gap-y-4 py-8">
                    {signals.map(({ icon: Icon, label }) => (
                        <div key={label} className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                            <Icon aria-hidden className="size-4" />
                            {label}
                        </div>
                    ))}
                </div>
            </Reveal>
        </section>
    )
}
