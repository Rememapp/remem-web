import type { Metadata } from 'next'

import { ContactForm } from '@/components/contact-form'
import { PageHeader } from '@/components/page-header'
import { Reveal } from '@/components/motion/reveal'
import { pageMetadata } from '@/lib/metadata'
import { siteConfig } from '@/lib/site'

export const metadata: Metadata = pageMetadata({
    title: 'Contact: Questions, Feedback & Press',
    description: 'Questions, feedback, or press — get in touch with the Remem team. We read every message.',
    path: '/contact',
})

export default function ContactPage() {
    return (
        <>
            <PageHeader title="Talk to us" description={`We read every message. Prefer email? Write to ${siteConfig.email}.`} />
            <section className="container-page pb-24">
                <Reveal className="mx-auto max-w-xl">
                    <ContactForm />
                </Reveal>
            </section>
        </>
    )
}
