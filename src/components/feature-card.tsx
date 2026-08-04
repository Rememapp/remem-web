import type { Feature } from '@/lib/features'

interface FeatureCardProps {
    feature: Feature
    /** Shows a labeled screenshot placeholder block under the copy. */
    withScreenshot?: boolean
}

export function FeatureCard({ feature, withScreenshot = false }: FeatureCardProps) {
    return (
        <div className="group h-full rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
            <div className={`flex size-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105 ${feature.tint}`}>
                <feature.icon aria-hidden className="size-5" />
            </div>
            <h3 className="mt-4 font-medium">{feature.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
            {withScreenshot ? (
                <div className="mt-5 flex aspect-video items-center justify-center rounded-xl border border-dashed border-border bg-secondary/50">
                    <span className="text-xs text-muted-foreground">Screenshot coming soon</span>
                </div>
            ) : null}
        </div>
    )
}
