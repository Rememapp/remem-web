import { Ban, CloudUpload, Download, HardDrive, Hand, UserCheck } from 'lucide-react'
import Link from 'next/link'

import { Reveal } from '@/components/motion/reveal'
import { SectionHeading } from '@/components/section-heading'
import { Button } from '@/components/ui/button'

const guarantees = [
    { icon: HardDrive, title: 'Everything local', detail: 'Your memory lives on your device, not on our servers.' },
    { icon: CloudUpload, title: 'Backup to your own Drive', detail: 'Off by default. Encrypted before it uploads to your Google Drive — never to us.' },
    { icon: Ban, title: 'No selling your data', detail: 'We could not sell what we do not have.' },
    { icon: UserCheck, title: 'No silent uploads', detail: 'Forms and pages are never uploaded automatically.' },
    { icon: Hand, title: 'Never auto-submits', detail: 'A hard rule in the code, not a toggle in the settings.' },
    { icon: Download, title: 'You own everything', detail: 'Export or delete all of it, anytime, in one action.' },
] as const

export function Privacy() {
    return (
        <section className="container-page py-24 md:py-32">
            <SectionHeading
                eyebrow="Privacy"
                title="Private by architecture, not by promise"
                description="Remem handles addresses, IDs, and work history. So it is built so that trusting us is barely required."
            />
            <Reveal className="mt-14">
                <div className="overflow-hidden rounded-3xl border border-border bg-card">
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                        {guarantees.map((guarantee, index) => (
                            <li key={guarantee.title} className={`flex gap-4 border-border p-6 ${index !== guarantees.length ? 'border-b sm:border-r' : ''}`}>
                                <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                                    <guarantee.icon aria-hidden className="size-5" />
                                </span>
                                <div>
                                    <h3 className="font-medium">{guarantee.title}</h3>
                                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{guarantee.detail}</p>
                                </div>
                            </li>
                        ))}
                        <li className="flex items-center justify-between gap-4 border-border bg-secondary/40 p-6 sm:col-span-2 lg:col-span-3">
                            <p className="text-sm leading-relaxed text-muted-foreground">The extension is open source — every one of these claims is verifiable in the code.</p>
                            <Button asChild variant="outline" size="sm">
                                <Link href="/privacy">Read the privacy policy</Link>
                            </Button>
                        </li>
                    </ul>
                </div>
            </Reveal>
        </section>
    )
}
