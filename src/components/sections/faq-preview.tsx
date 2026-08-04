import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import { FaqList } from '@/components/faq-list'
import { Reveal } from '@/components/motion/reveal'
import { SectionHeading } from '@/components/section-heading'
import { Button } from '@/components/ui/button'
import { faqs } from '@/lib/faqs'

export function FaqPreview() {
    return (
        <section className="border-t border-border bg-card/40 py-24 md:py-32">
            <div className="container-page">
                <SectionHeading eyebrow="FAQ" title="Fair questions, straight answers" />
                <Reveal className="mx-auto mt-10 max-w-2xl">
                    <FaqList items={faqs.slice(0, 6)} />
                    <div className="mt-8 text-center">
                        <Button asChild variant="outline">
                            <Link href="/faq">
                                All {faqs.length} questions
                                <ArrowRight aria-hidden className="size-4" />
                            </Link>
                        </Button>
                    </div>
                </Reveal>
            </div>
        </section>
    )
}
