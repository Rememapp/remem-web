import type { Metadata } from 'next'

import { FeatureExplorer } from '@/components/feature-explorer'
import { Reveal } from '@/components/motion/reveal'
import { PageHeader } from '@/components/page-header'
import { FinalCta } from '@/components/sections/final-cta'

export const metadata: Metadata = {
    title: 'Features',
    description: 'Smart form detection, profile memory, AI writing for open-ended questions, local-first storage, and one-click fill — every Remem feature, explained.',
    alternates: { canonical: '/features' },
}

export default function FeaturesPage() {
    return (
        <>
            <PageHeader
                title="Everything Remem remembers for you"
                description="Deterministic memory for facts, AI for writing, and a review step in front of everything. Click through the full toolkit below."
            />
            <section className="container-page pb-24">
                <Reveal>
                    <FeatureExplorer />
                </Reveal>
            </section>
            <FinalCta />
        </>
    )
}
