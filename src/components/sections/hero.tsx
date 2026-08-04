import { ArrowDown } from 'lucide-react'
import Link from 'next/link'

import { BrowserMockup } from '@/components/browser-mockup'
import { Reveal } from '@/components/motion/reveal'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { WaitlistForm } from '@/components/waitlist-form'

export function Hero() {
    return (
        <section className="container-page flex flex-col items-center pt-36 pb-20 text-center md:pt-44">
            <Reveal immediate from="down">
                <Badge variant="accent">Privacy-first browser memory · Launching soon</Badge>
            </Reveal>
            <Reveal immediate delay={0.08}>
                <h1 className="mt-6 max-w-3xl font-display text-5xl font-bold tracking-tight text-balance md:text-7xl">Never repeat yourself.</h1>
            </Reveal>
            <Reveal immediate delay={0.16}>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty md:text-xl">
                    Fill in your information once. Remem remembers it — privately, on your device — and helps you reuse it on every form the web throws at you.
                </p>
            </Reveal>
            <Reveal immediate delay={0.24} className="mt-8 flex w-full flex-col items-center gap-4">
                <WaitlistForm source="hero" className="mx-auto" />
                <Button asChild variant="ghost" className="text-muted-foreground">
                    <Link href="/how-it-works">
                        See how it works
                        <ArrowDown aria-hidden className="size-4" />
                    </Link>
                </Button>
            </Reveal>
            <Reveal immediate delay={0.35} className="mt-14 w-full">
                <BrowserMockup />
            </Reveal>
        </section>
    )
}
