import type { IconType } from 'react-icons'
import { FaEdge } from 'react-icons/fa'
import { SiArc, SiBrave, SiFirefoxbrowser, SiGooglechrome, SiSafari } from 'react-icons/si'

import { Reveal } from '@/components/motion/reveal'
import { SectionHeading } from '@/components/section-heading'
import { Badge } from '@/components/ui/badge'

interface Browser {
    name: string
    icon: IconType
    tint: string
}

const supported: Browser[] = [
    { name: 'Chrome', icon: SiGooglechrome, tint: 'bg-amber-500/10 text-amber-600 dark:text-amber-400' },
    { name: 'Edge', icon: FaEdge, tint: 'bg-sky-500/10 text-sky-600 dark:text-sky-400' },
    { name: 'Brave', icon: SiBrave, tint: 'bg-orange-500/10 text-orange-600 dark:text-orange-400' },
    { name: 'Arc', icon: SiArc, tint: 'bg-rose-500/10 text-rose-600 dark:text-rose-400' },
]

const planned: Browser[] = [
    { name: 'Firefox', icon: SiFirefoxbrowser, tint: 'bg-violet-500/10 text-violet-600 dark:text-violet-400' },
    { name: 'Safari', icon: SiSafari, tint: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' },
]

export function Browsers() {
    return (
        <section className="container-page py-24 md:py-32">
            <SectionHeading eyebrow="Browser support" title="Works where you already work" description="Remem runs in every Chromium-based browser at launch." />
            <Reveal className="mt-12">
                <div className="flex flex-wrap items-stretch justify-center gap-4">
                    {supported.map((browser) => (
                        <div key={browser.name} className="flex w-32 flex-col items-center gap-3 rounded-2xl border border-border bg-card p-6">
                            <span className={`flex size-12 items-center justify-center rounded-2xl ${browser.tint}`}>
                                <browser.icon aria-hidden className="size-6" />
                            </span>
                            <p className="text-sm font-medium">{browser.name}</p>
                        </div>
                    ))}
                    {planned.map((browser) => (
                        <div key={browser.name} className="flex w-32 flex-col items-center gap-3 rounded-2xl border border-dashed border-border p-6 opacity-70">
                            <span className={`flex size-12 items-center justify-center rounded-2xl ${browser.tint}`}>
                                <browser.icon aria-hidden className="size-6" />
                            </span>
                            <p className="text-sm font-medium">{browser.name}</p>
                            <Badge variant="outline">Planned</Badge>
                        </div>
                    ))}
                </div>
            </Reveal>
        </section>
    )
}
