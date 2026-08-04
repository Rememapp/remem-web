import type { Metadata } from 'next'

import { ContactForm } from '@/components/contact-form'
import { PageHeader } from '@/components/page-header'
import { Reveal } from '@/components/motion/reveal'
import { siteConfig } from '@/lib/site'

export const metadata: Metadata = {
    title: 'Contact',
    description: 'Questions, feedback, or press — get in touch with the Remem team. We read every message.',
    alternates: { canonical: '/contact' },
}

export default function ContactPage() {
    return (
        <>
            <PageHeader eyebrow="Contact" title="Talk to us" description={`We read every message. Prefer email? Write to ${siteConfig.email}.`} />
            <section className="container-page pb-24">
                <Reveal className="mx-auto max-w-xl">
                    <ContactForm />
                </Reveal>
            </section>
        </>
    )
}
