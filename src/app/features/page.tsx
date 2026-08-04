import type { Metadata } from 'next'

import { FeatureCard } from '@/components/feature-card'
import { Stagger, StaggerItem } from '@/components/motion/reveal'
import { PageHeader } from '@/components/page-header'
import { FinalCta } from '@/components/sections/final-cta'
import { features } from '@/lib/features'

export const metadata: Metadata = {
    title: 'Features',
    description: 'Smart form detection, profile memory, AI writing for open-ended questions, encrypted local storage, and one-click fill — every Remem feature, explained.',
    alternates: { canonical: '/features' },
}

export default function FeaturesPage() {
    return (
        <>
            <PageHeader
                eyebrow="Features"
                title="Everything Remem remembers for you"
                description="Deterministic memory for facts, AI for writing, and a review step in front of everything. Here is the full toolkit."
            />
            <section className="container-page pb-8">
                <Stagger className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" interval={0.05}>
                    {features.map((feature) => (
                        <StaggerItem key={feature.title} className="h-full">
                            <FeatureCard feature={feature} withScreenshot />
                        </StaggerItem>
                    ))}
                </Stagger>
            </section>
            <FinalCta />
        </>
    )
}
