import { CheckCircle2 } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'

import { Reveal } from '@/components/motion/reveal'
import { Button } from '@/components/ui/button'
import { pageMetadata } from '@/lib/metadata'

export const metadata: Metadata = pageMetadata({
    title: "You're on the list",
    description: 'Waitlist confirmation for Remem early access.',
    path: '/waitlist/success',
    noindex: true,
})

export default function WaitlistSuccessPage() {
    return (
        <section className="container-page flex min-h-[70vh] flex-col items-center justify-center pt-32 pb-24 text-center">
            <Reveal immediate>
                <div className="relative mx-auto flex size-16 items-center justify-center bg-primary/10">
                    <span aria-hidden className="absolute top-0 left-0 size-3 border-t border-l border-primary/60" />
                    <span aria-hidden className="absolute top-0 right-0 size-3 border-t border-r border-primary/60" />
                    <span aria-hidden className="absolute bottom-0 left-0 size-3 border-b border-l border-primary/60" />
                    <span aria-hidden className="absolute right-0 bottom-0 size-3 border-r border-b border-primary/60" />
                    <CheckCircle2 aria-hidden className="size-8 text-primary" />
                </div>
            </Reveal>
            <Reveal immediate delay={0.1}>
                <h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-balance uppercase md:text-5xl">You&apos;re in</h1>
            </Reveal>
            <Reveal immediate delay={0.18}>
                <p className="mt-4 max-w-md text-lg leading-relaxed text-muted-foreground">
                    Welcome to the waitlist. <br /> We&apos;ll only email you when there&apos;s something worth sharing — like beta access or launch.
                </p>
            </Reveal>
            <Reveal immediate delay={0.26} className="mt-8 flex flex-wrap justify-center gap-3">
                <Button asChild>
                    <Link href="/how-it-works">See how It works</Link>
                </Button>
                <Button asChild variant="outline">
                    <Link href="/faq">Read the FAQ</Link>
                </Button>
            </Reveal>
        </section>
    )
}
