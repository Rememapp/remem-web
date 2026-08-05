import Link from 'next/link'

import { Reveal } from '@/components/motion/reveal'
import { SectionHeading } from '@/components/section-heading'
import { Button } from '@/components/ui/button'

/** Each guarantee is a readout line: mono key, plain-language value, status ink. */
const guarantees = [
    { key: 'storage.location', title: 'Everything local', detail: 'Your memory lives on your device, not on our servers.', status: 'LOCAL', tone: 'text-primary border-primary/40' },
    { key: 'backup.route', title: 'Backup to your own Drive', detail: 'Off by default. Encrypted before it uploads to your Google Drive — never to us.', status: 'OPT-IN', tone: 'text-track-career border-track-career/40' },
    { key: 'data.sale', title: 'No selling your data', detail: 'We could not sell what we do not have.', status: 'NO DATA', tone: 'text-primary border-primary/40' },
    { key: 'uploads.silent', title: 'No silent uploads', detail: 'Forms and pages are never uploaded automatically.', status: 'NEVER', tone: 'text-boundary border-boundary/40' },
    { key: 'form.submit', title: 'Never auto-submits', detail: 'A hard rule in the code, not a toggle in the settings.', status: 'NEVER', tone: 'text-boundary border-boundary/40' },
    { key: 'data.exit', title: 'You own everything', detail: 'Export or delete all of it, anytime, in one action.', status: 'YOURS', tone: 'text-primary border-primary/40' },
] as const

/**
 * The data-route schematic: your device at center, one opt-in encrypted route
 * to your own Drive, and no route at all to Remem — drawn, not promised.
 */
function DataRouteSchematic() {
    return (
        <figure aria-hidden className="relative flex h-full min-h-64 flex-col justify-center select-none">
            <svg viewBox="0 0 360 260" fill="none" className="w-full">
                {/* Your device — the vertex */}
                <g stroke="var(--foreground)">
                    <rect x="28" y="100" width="88" height="60" rx="4" strokeWidth="1.25" />
                    <line x1="52" y1="170" x2="92" y2="170" strokeWidth="1.25" />
                    <circle cx="72" cy="130" r="10" stroke="var(--primary)" strokeWidth="1.5" />
                    <circle cx="72" cy="130" r="2.5" fill="var(--primary)" stroke="none" />
                </g>
                <text x="72" y="196" textAnchor="middle" fill="var(--muted-foreground)" fontSize="10" className="font-mono" letterSpacing="1.5">
                    YOUR DEVICE
                </text>

                {/* Opt-in encrypted route to your own Drive */}
                <path d="M120,118 Q210,70 292,86" stroke="var(--track-career)" strokeWidth="1.5" strokeDasharray="7 6" />
                <text x="200" y="66" textAnchor="middle" fill="var(--track-career)" fontSize="9" className="font-mono" letterSpacing="1.2">
                    OPT-IN · ENCRYPTED FIRST
                </text>
                <g stroke="var(--track-career)">
                    <rect x="286" y="80" width="60" height="40" rx="4" strokeWidth="1.25" />
                </g>
                <text x="316" y="136" textAnchor="middle" fill="var(--muted-foreground)" fontSize="10" className="font-mono" letterSpacing="1.5">
                    YOUR DRIVE
                </text>

                {/* The route that does not exist */}
                <path d="M120,146 Q210,190 288,204" stroke="var(--boundary)" strokeWidth="1.25" strokeDasharray="3 8" opacity="0.7" />
                <g stroke="var(--boundary)" strokeWidth="1.5">
                    <line x1="196" y1="162" x2="216" y2="182" />
                    <line x1="216" y1="162" x2="196" y2="182" />
                </g>
                <g stroke="var(--boundary)" opacity="0.7">
                    <rect x="286" y="188" width="60" height="40" rx="4" strokeWidth="1.25" strokeDasharray="5 4" />
                </g>
                <text x="316" y="244" textAnchor="middle" fill="var(--boundary)" fontSize="10" className="font-mono" letterSpacing="1.5">
                    REMEM SERVERS
                </text>
                <text x="206" y="212" textAnchor="end" fill="var(--boundary)" fontSize="9" className="font-mono" letterSpacing="1.2">
                    NO ROUTE EXISTS
                </text>
            </svg>
            <figcaption className="sr-only">Diagram: data flows from your device only to your own Google Drive, opt-in and encrypted first. There is no route to Remem servers.</figcaption>
        </figure>
    )
}

export function Privacy() {
    return (
        <section className="container-page py-24 md:py-32">
            <SectionHeading
                align="left"
                title="Private by architecture, not by promise"
                description="Remem handles addresses, IDs, and work history. So it is built so that trusting us is barely required."
            />
            <Reveal className="mt-14">
                <div className="overflow-hidden rounded-lg border border-border bg-card">
                    <div className="grid lg:grid-cols-[1fr_minmax(0,24rem)]">
                        <ul className="divide-y divide-border">
                            {guarantees.map((guarantee) => (
                                <li key={guarantee.key} className="grid gap-x-6 gap-y-1 p-5 sm:grid-cols-[11rem_1fr_auto] sm:items-center md:px-7">
                                    <p className="font-mono text-[11px] font-medium tracking-[0.08em] text-muted-foreground">{guarantee.key}</p>
                                    <div>
                                        <h3 className="text-sm font-medium">{guarantee.title}</h3>
                                        <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">{guarantee.detail}</p>
                                    </div>
                                    <p className={`mt-1 w-fit rounded-sm border px-2 py-0.5 font-mono text-[10px] font-semibold tracking-[0.14em] sm:mt-0 ${guarantee.tone}`}>{guarantee.status}</p>
                                </li>
                            ))}
                        </ul>
                        <div className="border-t border-border p-6 lg:border-t-0 lg:border-l">
                            <DataRouteSchematic />
                        </div>
                    </div>
                    <div className="flex flex-col items-start justify-between gap-4 border-t border-border bg-secondary/40 p-6 sm:flex-row sm:items-center md:px-7">
                        <p className="text-sm leading-relaxed text-muted-foreground">The extension is open source — every one of these claims is verifiable in the code.</p>
                        <Button asChild variant="outline" size="sm">
                            <Link href="/privacy">Read the privacy policy</Link>
                        </Button>
                    </div>
                </div>
            </Reveal>
        </section>
    )
}
