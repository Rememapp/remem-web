import Link from 'next/link'

import { Button } from '@/components/ui/button'

export default function NotFound() {
    return (
        <section className="container-page flex min-h-[70vh] flex-col items-center justify-center pt-32 pb-24 text-center">
            <p className="font-display text-7xl font-bold tracking-tight text-primary tnum">404</p>
            <p className="mt-2 font-mono text-[11px] tracking-[0.18em] text-boundary uppercase">memory.lookup — no match</p>
            <h1 className="mt-4 font-display text-3xl font-bold tracking-tight uppercase">This page doesn&apos;t exist</h1>
            <p className="mt-3 max-w-sm text-muted-foreground">Ironically, we have no memory of it. Let&apos;s get you back somewhere useful.</p>
            <Button asChild className="mt-8">
                <Link href="/">Back to home</Link>
            </Button>
        </section>
    )
}
