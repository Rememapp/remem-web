import { SectionHeading } from '@/components/section-heading'
import { Timeline } from '@/components/timeline'

export function Workflow() {
    return (
        <section className="border-y border-border bg-card/40 py-24 md:py-32">
            <div className="container-page">
                <SectionHeading eyebrow="How it works" title="Six steps. You control every one." description="From a blank profile to a submitted application — here is the whole loop." />
                <div className="mt-14">
                    <Timeline />
                </div>
            </div>
        </section>
    )
}
