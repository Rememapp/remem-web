import type { Metadata } from 'next'

import { PageHeader } from '@/components/page-header'
import { Reveal } from '@/components/motion/reveal'
import { pageMetadata } from '@/lib/metadata'

export const metadata: Metadata = pageMetadata({
    title: 'Privacy policy',
    description: 'The Remem privacy policy in plain language: your data lives on your device, backup goes encrypted to your own Google Drive, and we have nothing to sell.',
    path: '/privacy',
})

const sections = [
    {
        heading: 'The short version',
        lead: "We can't read or sell data we don't have.",
        body: [
            "Your memory data — profiles, answers, documents — is stored on your device, not ours. Creating an account shares your email, name, and profile photo from Google sign-in, which we store to know who you are across sessions. Using an AI feature sends the specific information that feature needs to our AI provider. Joining the waitlist stores your email. That's the complete list — we don't collect anything else.",
        ],
    },
    {
        heading: 'Local storage',
        body: [
            'Everything you teach Remem is stored in your browser on your machine. Form matching and filling happen locally. Uninstalling the extension or using its delete action removes this data permanently — there is no server copy.',
        ],
    },
    {
        heading: 'Your account',
        body: [
            "Signing in with Google shares your email address, name, and profile photo with us, which we store to identify your account and keep you signed in across sessions and devices. We never see or store your Google password — sign-in happens directly with Google. Email us and we'll delete your account and this data.",
        ],
    },
    {
        heading: 'AI requests',
        body: [
            "AI runs only when you trigger it. What we send depends on the feature: teaching Remem something new in chat sends your message plus your existing profile — including identity details like your name and address — so it can recognize duplicates, fill gaps, and ask good follow-up questions. Drafting an answer on a form sends your career history and the job posting or question you're answering, but deliberately leaves out identity details like your name, date of birth, or address. Prompts go to OpenAI or DeepSeek to generate a response — or directly through your own key, if you've added one. We don't store the content of these requests once an answer comes back; we only log which feature was used and how many tokens it cost, for our own usage accounting.",
        ],
    },
    {
        heading: 'Optional Google Drive backup',
        body: [
            "Backup is off by default. Turn it on, and your data is encrypted on your device before it ever leaves — then uploaded directly to your own Google Drive, not to our servers. The file lives in your Drive, under your account; we never hold a copy, and our server can't read it even in transit. To make this work, we store an encrypted Google authorization token that lets our server act as your Drive client — it can only write to a hidden app folder in your Drive that only Remem can see, never your regular files. Delete the backup there, or turn the setting off, and it is gone.",
            "Remem's use and transfer of information received from Google APIs adheres to the Google API Services User Data Policy, including the Limited Use requirements.",
        ],
    },
    {
        heading: 'Security',
        body: [
            "Like most web services, our servers briefly note the IP address behind sign-in and form-submission requests, purely to block abuse like repeated automated login attempts. We don't use it to determine your location, and it isn't linked to your profile.",
        ],
    },
    {
        heading: 'The waitlist',
        body: [
            "If you join the waitlist, we store your email address and use it for one thing: telling you about Remem's launch and early access. No sharing, no selling, and every email includes an unsubscribe link that actually works.",
        ],
    },
    {
        heading: 'Analytics',
        body: [
            'This website may use privacy-respecting, cookie-free analytics (page views and anonymous events like "joined waitlist"). No cross-site tracking, no advertising identifiers, no fingerprinting.',
        ],
    },
    {
        heading: 'Cookies',
        body: ['This site sets no tracking cookies. The only thing stored in your browser is your theme preference (dark or light), which never leaves your device.'],
    },
    {
        heading: 'Your rights',
        body: [
            'Delete your local memory in one action, anytime. Restore an encrypted backup from your own Google Drive whenever you want it back. Email us to delete your account. Unsubscribe from waitlist emails with one click, or just write to us.',
        ],
    },
    {
        heading: 'Questions',
        body: ['This policy is meant to be readable. If anything is unclear, email hello@rememapp.uk and a human will answer.'],
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
