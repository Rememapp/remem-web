import type { IconType } from 'react-icons'
import { FaEdge } from 'react-icons/fa'
import { SiArc, SiBrave, SiFirefoxbrowser, SiGooglechrome, SiSafari } from 'react-icons/si'

import { Reveal } from '@/components/motion/reveal'
import { SectionHeading } from '@/components/section-heading'

interface BrowserItem {
    name: string
    icon: IconType
    active: boolean
}

const browsers: BrowserItem[] = [
    { name: 'Chrome', icon: SiGooglechrome, active: true },
    { name: 'Edge', icon: FaEdge, active: true },
    { name: 'Brave', icon: SiBrave, active: true },
    { name: 'Arc', icon: SiArc, active: true },
    { name: 'Firefox', icon: SiFirefoxbrowser, active: false },
    { name: 'Safari', icon: SiSafari, active: false },
]

export function Browsers() {
    return (
        <section className="container-page py-24 md:py-32">
            <SectionHeading title="Works where you already work" description="Remem runs in every Chromium-based browser at launch." />
            <Reveal className="mt-12">
                <ul className="mx-auto grid max-w-4xl grid-cols-2 gap-3.5 sm:grid-cols-3 md:grid-cols-6">
                    {browsers.map((browser) => (
                        <li
                            key={browser.name}
                            className="group flex flex-col items-center justify-center gap-3 rounded-lg border border-border bg-card p-5 text-center transition-colors hover:border-primary/30"
                        >
                            <div className="flex size-10 items-center justify-center rounded-md border border-border/60 bg-background/50 text-foreground transition-colors group-hover:border-primary/30 group-hover:text-primary">
                                <browser.icon aria-hidden className={`size-5 transition-colors ${browser.active ? 'text-foreground/90 group-hover:text-primary' : 'text-muted-foreground/60'}`} />
                            </div>
                            <div className="space-y-1">
                                <p className={`text-sm font-medium ${browser.active ? 'text-foreground' : 'text-muted-foreground'}`}>{browser.name}</p>
                                <p
                                    className={`flex items-center justify-center gap-1.5 font-mono text-[10px] font-semibold tracking-[0.14em] uppercase ${
                                        browser.active ? 'text-primary' : 'text-muted-foreground/60'
                                    }`}
                                >
                                    <span aria-hidden className={`size-1.5 ${browser.active ? 'bg-primary' : 'bg-muted-foreground/40'}`} />
                                    {browser.active ? 'Active' : 'Planned'}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            </Reveal>
        </section>
    )
}
