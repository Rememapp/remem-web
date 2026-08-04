import type { Metadata } from 'next'

import { PageHeader } from '@/components/page-header'
import { Reveal } from '@/components/motion/reveal'
import { FinalCta } from '@/components/sections/final-cta'

export const metadata: Metadata = {
    title: 'About',
    description: 'Why we are building Remem: a browser that remembers for you, without your data ever leaving your hands.',
    alternates: { canonical: '/about' },
}

export default function AboutPage() {
    return (
        <>
            <PageHeader eyebrow="About" title="The web should remember you — without owning you" />
            <section className="container-page pb-12">
                <Reveal className="prose-remem mx-auto max-w-2xl space-y-6 text-base leading-relaxed text-muted-foreground md:text-lg">
                    <p>
                        Somewhere along the way, we accepted a strange deal: every website gets to ask who you are, and you get to answer — again, and again, and again. The same employment history
                        into the fifth ATS this week. The same address into another government portal. The same “tell us about yourself” for the tenth time.
                    </p>
                    <p>
                        The tools that promised to fix this made a different trade. They fixed the typing by taking the data — syncing your life to someone else&apos;s servers, selling the convenience
                        back to you, and asking you to trust a privacy policy you&apos;ll never read.
                    </p>
                    <p className="font-medium text-foreground">We think memory belongs to the person doing the remembering.</p>
                    <p>
                        Remem is a memory layer for your browser that works the way memory should: it lives with you, on your device. You teach it about yourself once. It fills the repetitive fields
                        deterministically — no model guessing at your passport number — and drafts the open-ended answers only when you ask, from your real history, for your review. It never submits
                        anything. It never uploads a form. And when you want your data back, you export it — or delete it — and it is actually gone.
                    </p>
                    <p>
                        The vision is bigger than job applications. Every form on the web — visas, admissions, insurance, onboarding — is the same question asked with different labels. A browser that
                        understands that, privately, saves you hours of your life a year. That&apos;s the product we&apos;re building.
                    </p>
                    <p>The extension is open source, because claims about privacy should be checkable. If that resonates, join the waitlist — or read the code.</p>
                </Reveal>
            </section>
            <FinalCta />
        </>
    )
}
