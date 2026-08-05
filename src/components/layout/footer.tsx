import Link from 'next/link'

import { Logo } from '@/components/layout/logo'
import { siteConfig } from '@/lib/site'

const columns = [
    {
        heading: 'Product',
        links: [
            { href: '/features', label: 'Features' },
            { href: '/how-it-works', label: 'How it works' },
            { href: '/faq', label: 'FAQ' },
            { href: '/changelog', label: 'Changelog' },
        ],
    },
    {
        heading: 'Legal',
        links: [
            { href: '/privacy', label: 'Privacy policy' },
            { href: '/terms', label: 'Terms' },
        ],
    },
    {
        heading: 'Connect',
        links: [
            { href: '/about', label: 'About' },
            { href: '/contact', label: 'Contact' },
        ],
    },
] as const

export function Footer() {
    return (
        <footer className="border-t border-border">
            <div className="container-page py-14">
                <div className="flex flex-col gap-12 md:flex-row md:justify-between">
                    <div className="max-w-xs space-y-3">
                        <Logo />
                        <p className="text-sm leading-relaxed text-muted-foreground">{siteConfig.tagline} A private memory for your browser — local-first, reviewed by you, owned by you.</p>
                    </div>
                    <div className="grid grid-cols-2 gap-10 sm:flex sm:gap-16">
                        {columns.map((column) => (
                            <div key={column.heading}>
                                <h3 className="readout text-muted-foreground">{column.heading}</h3>
                                <ul className="mt-4 space-y-2.5">
                                    {column.links.map((link) => (
                                        <li key={link.label}>
                                            <Link
                                                href={link.href}
                                                {...('external' in link && link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                                                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mt-12 flex flex-col gap-2 border-t border-border pt-6 font-mono text-xs tracking-wide text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
                    <p className="tnum">© {new Date().getFullYear()} Remem. All rights reserved.</p>
                    <p className="flex items-center gap-2">
                        <span aria-hidden className="inline-block size-1.5 bg-primary" />
                        Your data stays yours. That&apos;s the whole point.
                    </p>
                </div>
            </div>
        </footer>
    )
}
