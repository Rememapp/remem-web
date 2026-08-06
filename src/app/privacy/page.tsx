import type { Metadata } from 'next'

import { PageHeader } from '@/components/page-header'
import { Reveal } from '@/components/motion/reveal'

export const metadata: Metadata = {
    title: 'Privacy policy',
    description: 'The Remem privacy policy in plain language: your data lives on your device, backup goes encrypted to your own Google Drive, and we have nothing to sell.',
    alternates: { canonical: '/privacy' },
}

const sections = [
    {
        heading: 'The short version',
        lead: 'We can’t read or sell data we don’t have.',
        body: [
            'Your memory data — profiles, answers, documents — is stored on your device, not ours. The only personal data this website collects is your email address, if you join the waitlist.',
        ],
    },
    {
        heading: 'Local storage',
        body: [
            'Everything you teach Remem is stored in your browser on your machine. Form matching and filling happen locally. Uninstalling the extension or using its delete action removes this data permanently — there is no server copy.',
        ],
    },
    {
        heading: 'AI requests',
        body: [
            'AI only runs when you explicitly ask for it — drafting a cover letter, for example. Only the information needed to write that specific answer is sent to our API. Remem never uploads pages, forms, or your saved memory on its own, and we do not permanently store the requests you send the AI.',
        ],
    },
    {
        heading: 'Optional Google Drive backup',
        body: [
            'Backup is off by default. Turn it on, and your data is encrypted on your device before it ever leaves — then uploaded directly to your own Google Drive, not to our servers. The file lives in your Drive, under your account; we never hold a copy. Delete it there, or turn the setting off, and it is gone.',
        ],
    },
    {
        heading: 'The waitlist',
        body: [
            'If you join the waitlist, we store your email address and use it for one thing: telling you about Remem’s launch and early access. No sharing, no selling, and every email includes an unsubscribe link that actually works.',
        ],
    },
    {
        heading: 'Analytics',
        body: [
            'This website may use privacy-respecting, cookie-free analytics (page views and anonymous events like “joined waitlist”). No cross-site tracking, no advertising identifiers, no fingerprinting.',
        ],
    },
    {
        heading: 'Cookies',
        body: ['This site sets no tracking cookies. The only thing stored in your browser is your theme preference (dark or light), which never leaves your device.'],
    },
    {
        heading: 'Your rights',
        body: [
            'Delete your local memory in one action, anytime. Restore an encrypted backup from your own Google Drive whenever you want it back. Unsubscribe from waitlist emails with one click, or just write to us.',
        ],
    },
    {
        heading: 'Questions',
        body: ['This policy is meant to be readable. If anything is unclear, email hello@remem.itssvk.dev and a human will answer.'],
    },
]

export default function PrivacyPage() {
    return (
        <>
            <PageHeader title="Privacy policy" description="Written to be read, not skimmed past. Last updated August 2026." />
            <section className="container-page pb-24">
                <Reveal className="mx-auto max-w-2xl">
                    <div className="rounded-lg border border-primary/20 bg-primary/5 p-6 sm:p-7">
                        <div className="inline-flex items-center gap-2 rounded-sm border border-primary/30 bg-background/60 px-2.5 py-1">
                            <span aria-hidden className="size-1.5 bg-primary" />
                            <span className="readout text-[10px] text-primary">Our promise</span>
                        </div>
                        <p className="mt-3 leading-relaxed text-foreground">
                            Your memory belongs to you. By default, it stays on your device, under your control, and is never uploaded unless you explicitly ask Remem to do so.
                        </p>
                    </div>
                    <div className="mt-12 space-y-12">
                        {sections.map((section) => (
                            <div key={section.heading}>
                                <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">{section.heading}</h2>
                                {section.lead ? <p className="mt-3 text-lg leading-relaxed font-semibold text-foreground text-balance">{section.lead}</p> : null}
                                {section.body.map((paragraph) => (
                                    <p key={paragraph.slice(0, 32)} className="mt-3 leading-relaxed text-muted-foreground">
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        ))}
                    </div>
                </Reveal>
            </section>
        </>
    )
}
