import { Reveal } from '@/components/motion/reveal'
import { SectionHeading } from '@/components/section-heading'
import { Badge } from '@/components/ui/badge'

const supported = [
    { name: 'Chrome', initial: 'C', tint: 'bg-amber-500/10 text-amber-600 dark:text-amber-400' },
    { name: 'Edge', initial: 'E', tint: 'bg-sky-500/10 text-sky-600 dark:text-sky-400' },
    { name: 'Brave', initial: 'B', tint: 'bg-orange-500/10 text-orange-600 dark:text-orange-400' },
    { name: 'Arc', initial: 'A', tint: 'bg-rose-500/10 text-rose-600 dark:text-rose-400' },
] as const

const planned = [
    { name: 'Firefox', initial: 'F', tint: 'bg-violet-500/10 text-violet-600 dark:text-violet-400' },
    { name: 'Safari', initial: 'S', tint: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' },
] as const

export function Browsers() {
    return (
        <section className="container-page py-24 md:py-32">
            <SectionHeading eyebrow="Browser support" title="Works where you already work" description="Remem runs in every Chromium-based browser at launch." />
            <Reveal className="mt-12">
                <div className="flex flex-wrap items-stretch justify-center gap-4">
                    {supported.map((browser) => (
                        <div key={browser.name} className="flex w-32 flex-col items-center gap-3 rounded-2xl border border-border bg-card p-6">
                            <span className={`flex size-12 items-center justify-center rounded-2xl font-display text-xl font-bold ${browser.tint}`}>{browser.initial}</span>
                            <p className="text-sm font-medium">{browser.name}</p>
                        </div>
                    ))}
                    {planned.map((browser) => (
                        <div key={browser.name} className="flex w-32 flex-col items-center gap-3 rounded-2xl border border-dashed border-border p-6 opacity-70">
                            <span className={`flex size-12 items-center justify-center rounded-2xl font-display text-xl font-bold ${browser.tint}`}>{browser.initial}</span>
                            <p className="text-sm font-medium">{browser.name}</p>
                            <Badge variant="outline">Planned</Badge>
                        </div>
                    ))}
                </div>
            </Reveal>
        </section>
    )
}
