import type { Metadata } from 'next'

import { PageHeader } from '@/components/page-header'
import { Reveal } from '@/components/motion/reveal'
import { FinalCta } from '@/components/sections/final-cta'
import { Timeline } from '@/components/timeline'
import { pageMetadata } from '@/lib/metadata'

export const metadata: Metadata = pageMetadata({
    title: 'How it works',
    description: 'From creating your local profile to submitting a form yourself — the six-step loop behind Remem, and why it never auto-submits anything.',
    path: '/how-it-works',
})

export default function HowItWorksPage() {
    return (
        <>
            <PageHeader title="From blank profile to submitted form" description="Six steps, and you control every one. Click through the loop below." />
            <section className="container-page pb-24">
                <Reveal>
                    <Timeline />
                </Reveal>
            </section>
            <FinalCta />
        </>
    )
}
