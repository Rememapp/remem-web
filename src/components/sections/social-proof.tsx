import { Reveal } from '@/components/motion/reveal'

/**
 * Beamline status strip — the trust readout. Every line is a verifiable
 * commitment, not social proof theater; swap in stars/counts at launch.
 */
const readouts = [
    { key: 'source', value: 'Open', detail: 'Extension code is public', tone: 'bg-primary' },
    { key: 'storage', value: 'Local', detail: 'No server copy of your data', tone: 'bg-track-career' },
    { key: 'auto-submit', value: 'Never', detail: 'Hard-coded, not a setting', tone: 'bg-boundary' },
    { key: 'status', value: 'Waitlist', detail: 'Launching on Chromium first', tone: 'bg-track-answer' },
] as const

export function SocialProof() {
    return (
        <section className="border-y border-border bg-card/40">
            <Reveal from="none">
                <ul className="container-page grid grid-cols-2 divide-border md:grid-cols-4 md:divide-x">
                    {readouts.map((item) => (
                        <li key={item.key} className="flex flex-col gap-1 px-2 py-6 first:pl-0 md:px-8">
                            <p className="readout flex items-center gap-2 text-muted-foreground">
                                <span aria-hidden className={`inline-block size-1.5 ${item.tone}`} />
                                {item.key}
                            </p>
                            <p className="font-display text-lg font-semibold tracking-tight uppercase">{item.value}</p>
                            <p className="text-xs text-muted-foreground">{item.detail}</p>
                        </li>
                    ))}
                </ul>
            </Reveal>
        </section>
    )
}
