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
        body: [
            'Your memory data — profiles, answers, documents — is stored on your device. We do not have it, so we cannot read it, lose it, or sell it. The only personal data this website collects is your email address, if you join the waitlist.',
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
            'When you ask the AI to draft an open-ended answer (like a cover letter), the context needed for that draft is sent to our API, used to generate the text, and not persisted. We never upload pages or forms automatically, and your stored memory is never synced to us as part of AI requests.',
        ],
    },
    {
        heading: 'Optional Google Drive backup',
        body: [
            'Backup is off by default. If you enable it, your data is encrypted on your device and then uploaded to your own Google Drive — not to our servers. The backup file lives in your Drive, under your account and your control; we never hold a copy. Delete it there, or disable backup, and it is gone.',
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
            'Export your extension data anytime, in a readable format. Delete everything in one action. For waitlist emails, unsubscribe from any message or write to us and we will remove you promptly.',
        ],
    },
    {
        heading: 'Questions',
        body: ['This policy is meant to be readable. If anything is unclear, email hello@remem.app and a human will answer.'],
    },
]

export default function PrivacyPage() {
    return (
        <>
            <PageHeader title="Privacy policy" description="Written to be read, not skimmed past. Last updated August 2026." />
            <section className="container-page pb-24">
                <Reveal className="mx-auto max-w-2xl space-y-10">
                    {sections.map((section) => (
                        <div key={section.heading}>
                            <h2 className="font-display text-xl font-semibold">{section.heading}</h2>
                            {section.body.map((paragraph) => (
                                <p key={paragraph.slice(0, 32)} className="mt-3 leading-relaxed text-muted-foreground">
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    ))}
                </Reveal>
            </section>
        </>
    )
}
