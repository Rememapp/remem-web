import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import { EventBloom } from '@/components/event-bloom'
import { InteractiveDemo } from '@/components/interactive-demo'
import { Reveal } from '@/components/motion/reveal'
import { Button } from '@/components/ui/button'
import { WaitlistForm } from '@/components/waitlist-form'
import { Badge } from '../ui/badge'

export function Hero() {
    return (
        <section className="container-page pt-32 pb-20 md:pt-40">
            <div className="grid items-center gap-12 lg:grid-cols-12">
                <div className="lg:col-span-5">
                    <Reveal immediate from="down">
                        <div className="mb-4 flex flex-wrap items-center gap-2.5">
                            <Badge variant="accent" className="gap-1.5">
                                <span aria-hidden className="size-1.5 bg-primary" />
                                REMEM
                            </Badge>
                            <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">Privacy-first browser memory</span>
                        </div>
                        <h1 className="font-display text-5xl font-bold tracking-tight text-balance uppercase md:text-6xl xl:text-7xl">Never repeat yourself</h1>
                    </Reveal>
                    <Reveal immediate delay={0.1}>
                        <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground text-pretty">
                            Remem is a browser extension that remembers your information once, then fills job applications from your memory on your device. You review every field, then press submit
                            yourself.
                        </p>
                    </Reveal>
                    <Reveal immediate delay={0.2} className="mt-8 flex flex-col gap-4">
                        <WaitlistForm source="hero" />
                        <Button asChild variant="ghost" className="w-fit -translate-x-3 text-muted-foreground">
                            <Link href="/how-it-works">
                                See how it works
                                <ArrowRight aria-hidden className="size-4" />
                            </Link>
                        </Button>
                    </Reveal>
                </div>
                <Reveal immediate delay={0.15} from="none" className="lg:col-span-7">
                    <EventBloom />
                </Reveal>
            </div>

            {/* The bloom's diving track lands here: the event's source, live */}
            <div aria-hidden className="mx-auto -mt-2 hidden w-fit flex-col items-center md:flex lg:ml-[52%]">
                <span className="h-10 border-l-2 border-dashed border-primary/50" />
                <p className="mt-2 flex items-center gap-1.5 font-mono text-[10px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                    <span className="size-1.5 bg-primary" />
                    event.source — run the scan yourself
                </p>
            </div>

            <Reveal immediate delay={0.4} className="mt-6 md:mt-4">
                <InteractiveDemo />
            </Reveal>
        </section>
    )
}
