import type { Metadata } from 'next'

import { FaqList } from '@/components/faq-list'
import { JsonLd } from '@/components/json-ld'
import { Reveal } from '@/components/motion/reveal'
import { PageHeader } from '@/components/page-header'
import { FinalCta } from '@/components/sections/final-cta'
import { faqs } from '@/lib/faqs'

export const metadata: Metadata = {
    title: 'FAQ',
    description: 'How Remem differs from browser autofill, where your data is stored, what the AI does and does not do, and every other question we get asked.',
    alternates: { canonical: '/faq' },
}

const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
}

export default function FaqPage() {
    return (
        <>
            <PageHeader title="Everything people ask us" description="If yours isn't here, ask — we answer every message." />
            <section className="container-page pb-12">
                <Reveal className="mx-auto max-w-2xl">
                    <FaqList items={faqs} />
                </Reveal>
            </section>
            <FinalCta />
            <JsonLd data={faqJsonLd} />
        </>
    )
}
