import type { Metadata } from 'next'

import { PageHeader } from '@/components/page-header'
import { Reveal } from '@/components/motion/reveal'

export const metadata: Metadata = {
    title: 'Terms of service',
    description: 'The Remem terms of service, in language you can actually read.',
    alternates: { canonical: '/terms' },
}

const sections = [
    {
        heading: 'What Remem is',
        body: 'Remem is a local-first browser memory that stores your information on your device and helps you reuse it across web forms, plus an optional hosted AI service for drafting open-ended answers. These terms cover the browser memory, the AI service, and this website.',
    },
    {
        heading: 'Your data is yours',
        body: 'You own everything you store in Remem — your profiles, answers, and documents. Delete your local memory anytime, in one action. If you’ve turned on encrypted backup, you can restore it from your own Google Drive. Remem never claims ownership of anything you save.',
    },
    {
        heading: 'Your responsibilities',
        body: 'You review what Remem fills before you submit it — that is the product’s core design, and it is also your job. You are responsible for the accuracy of anything you submit and for using Remem only on forms you are entitled to fill.',
    },
    {
        heading: 'Acceptable use',
        body: 'Don’t use Remem to misrepresent your identity, automate abuse of websites, or violate the terms of the sites you visit. Remem is built for people filling their own forms with their own information.',
    },
    {
        heading: 'The AI service',
        body: 'AI drafts are suggestions, generated from the context you provide. Read them before using them. We don’t guarantee that generated text is accurate or suitable — you do, by reviewing it.',
    },
    {
        heading: 'Availability',
        body: 'The local browser memory runs entirely on your device — it works independently of us and doesn’t need our servers to fill a form. The AI writing service and cloud backup depend on a connection to us, so they may occasionally be unavailable. We work to keep them reliable, but we can’t guarantee uninterrupted availability. We’re not liable for indirect damages, and our total liability is limited to what you paid us in the last twelve months.',
    },
    {
        heading: 'Changes',
        body: 'If these terms change materially, we will say so clearly — on this page and, if you are on the waitlist or a paying user, by email. Continued use after a change means you accept it.',
    },
    {
        heading: 'Contact',
        body: 'Questions? Email us at hello@remem.itssvk.dev — a real person will reply.',
    },
]

export default function TermsPage() {
    return (
        <>
            <PageHeader title="Terms of service" description="Short, honest, and current as of August 2026." />
            <section className="container-page pb-24">
                <Reveal className="mx-auto max-w-2xl">
                    <div className="rounded-lg border border-primary/20 bg-primary/5 p-6 sm:p-7">
                        <div className="inline-flex items-center gap-2 rounded-sm border border-primary/30 bg-background/60 px-2.5 py-1">
                            <span aria-hidden className="size-1.5 bg-primary" />
                            <span className="readout text-[10px] text-primary">Our principles</span>
                        </div>
                        <p className="mt-3 leading-relaxed text-foreground">
                            Remem exists to reduce repetition — not remove responsibility. You stay in control of what gets filled and what gets submitted.
                        </p>
                    </div>
                    <div className="mt-12 space-y-12">
                        {sections.map((section) => (
                            <div key={section.heading}>
                                <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">{section.heading}</h2>
                                <p className="mt-3 leading-relaxed text-muted-foreground">{section.body}</p>
                            </div>
                        ))}
                    </div>
                </Reveal>
            </section>
        </>
    )
}
