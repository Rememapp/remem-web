import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import type { Faq } from '@/lib/faqs'

export function FaqList({ items }: { items: Faq[] }) {
    return (
        <Accordion type="single" collapsible className="w-full">
            {items.map((faq) => (
                <AccordionItem key={faq.question} value={faq.question}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    )
}
