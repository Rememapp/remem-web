import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import { FeatureCard } from '@/components/feature-card'
import { Stagger, StaggerItem } from '@/components/motion/reveal'
import { SectionHeading } from '@/components/section-heading'
import { Button } from '@/components/ui/button'
import { features } from '@/lib/features'

export function Features() {
    return (
        <section className="container-page py-24 md:py-32">
            <SectionHeading eyebrow="Features" title="A memory that works the way you do" description="Deterministic where it can be, intelligent only where it must be." />
            <Stagger className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" interval={0.05}>
                {features.map((feature) => (
                    <StaggerItem key={feature.title} className="h-full">
                        <FeatureCard feature={feature} />
                    </StaggerItem>
                ))}
                <StaggerItem className="h-full">
                    <div className="flex h-full flex-col items-start justify-center rounded-2xl border border-dashed border-border p-6">
                        <p className="text-sm text-muted-foreground">There&apos;s more — including what each feature looks like in the extension.</p>
                        <Button asChild variant="link" className="mt-2 px-0">
                            <Link href="/features">
                                Explore all features
                                <ArrowRight aria-hidden className="size-4" />
                            </Link>
                        </Button>
                    </div>
                </StaggerItem>
            </Stagger>
        </section>
    )
}
