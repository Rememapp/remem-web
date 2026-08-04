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
        body: 'Remem is a browser extension that stores your information locally and helps you reuse it on web forms, plus an optional hosted AI service for drafting open-ended answers. These terms cover the extension, the AI service, and this website.',
    },
    {
        heading: 'Your data is yours',
        body: 'You own everything you store in Remem. We claim no rights over your profiles, answers, or documents. Export and deletion are always available.',
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
        body: 'The local extension works offline and does not depend on us. The AI service and cloud backup are provided “as is” and may occasionally be unavailable. We are not liable for indirect damages, and our total liability is limited to what you paid us in the last twelve months.',
    },
    {
        heading: 'Changes',
        body: 'If these terms change materially, we will say so clearly — on this page and, if you are on the waitlist or a paying user, by email. Continued use after a change means you accept it.',
    },
    {
        heading: 'Contact',
        body: 'Questions about these terms: hello@remem.app.',
    },
]

export default function TermsPage() {
    return (
        <>
            <PageHeader eyebrow="Legal" title="Terms of service" description="Short, honest, and current as of August 2026." />
            <section className="container-page pb-24">
                <Reveal className="mx-auto max-w-2xl space-y-10">
                    {sections.map((section) => (
                        <div key={section.heading}>
                            <h2 className="font-display text-xl font-semibold">{section.heading}</h2>
                            <p className="mt-3 leading-relaxed text-muted-foreground">{section.body}</p>
                        </div>
                    ))}
                </Reveal>
            </section>
        </>
    )
}
