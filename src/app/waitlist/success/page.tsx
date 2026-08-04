import { CheckCircle2 } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'

import { Reveal } from '@/components/motion/reveal'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
    title: "You're on the list",
    description: 'Waitlist confirmation for Remem early access.',
    robots: { index: false },
    alternates: { canonical: '/waitlist/success' },
}

export default function WaitlistSuccessPage() {
    return (
        <section className="container-page flex min-h-[70vh] flex-col items-center justify-center pt-32 pb-24 text-center">
            <Reveal immediate>
                <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-500/10">
                    <CheckCircle2 aria-hidden className="size-8 text-emerald-500" />
                </div>
            </Reveal>
            <Reveal immediate delay={0.1}>
                <h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-balance md:text-5xl">You&apos;re in.</h1>
            </Reveal>
            <Reveal immediate delay={0.18}>
                <p className="mt-4 max-w-md text-lg leading-relaxed text-muted-foreground">
                    Welcome to the waitlist. We&apos;ll email you exactly twice: once when early access opens for you, and once at launch. That&apos;s it.
                </p>
            </Reveal>
            <Reveal immediate delay={0.26} className="mt-8 flex flex-wrap justify-center gap-3">
                <Button asChild>
                    <Link href="/how-it-works">See how Remem works</Link>
                </Button>
                <Button asChild variant="outline">
                    <Link href="/blog">Read the blog</Link>
                </Button>
            </Reveal>
        </section>
    )
}
