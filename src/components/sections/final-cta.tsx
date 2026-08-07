import { Reveal } from '@/components/motion/reveal'
import { WaitlistForm } from '@/components/waitlist-form'

export function FinalCta() {
    return (
        <section id="waitlist" className="container-page scroll-mt-24 py-24 md:py-36">
            <Reveal>
                <div className="relative flex flex-col items-center rounded-lg border border-border bg-card px-6 py-16 text-center md:py-20">
                    {/* Reticle corners — the target, locked */}
                    <span aria-hidden className="absolute top-3 left-3 size-4 border-t border-l border-primary/60" />
                    <span aria-hidden className="absolute top-3 right-3 size-4 border-t border-r border-primary/60" />
                    <span aria-hidden className="absolute bottom-3 left-3 size-4 border-b border-l border-primary/60" />
                    <span aria-hidden className="absolute right-3 bottom-3 size-4 border-r border-b border-primary/60" />

                    <h2 className="max-w-2xl font-display text-4xl font-bold tracking-tight text-balance uppercase md:text-5xl">Type it once. Then never again</h2>
                    <p className="mt-4 max-w-md text-lg text-muted-foreground text-pretty">
                        Join the waitlist to be the first to try Remem. <br /> No spam — just the launch email.
                    </p>
                    <div className="mt-8 flex w-full justify-center">
                        <WaitlistForm source="final-cta" />
                    </div>
                    <p className="mt-6 flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
                        <span aria-hidden className="size-1.5 bg-boundary" />
                        You will always press submit yourself
                    </p>
                </div>
            </Reveal>
        </section>
    )
}
