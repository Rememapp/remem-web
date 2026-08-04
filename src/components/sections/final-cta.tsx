import { Reveal } from '@/components/motion/reveal'
import { WaitlistForm } from '@/components/waitlist-form'

export function FinalCta() {
    return (
        <section id="waitlist" className="container-page scroll-mt-24 py-24 md:py-36">
            <Reveal>
                <div className="flex flex-col items-center rounded-3xl border border-border bg-card px-6 py-16 text-center md:py-20">
                    <h2 className="max-w-2xl font-display text-4xl font-bold tracking-tight text-balance md:text-5xl">Type it once. Then never again.</h2>
                    <p className="mt-4 max-w-md text-lg text-muted-foreground text-pretty">Join the waitlist for early access and launch pricing. No spam — just the launch email.</p>
                    <div className="mt-8 flex w-full justify-center">
                        <WaitlistForm source="final-cta" />
                    </div>
                </div>
            </Reveal>
        </section>
    )
}
