'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircle2, Loader2 } from 'lucide-react'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { sendContactMessage } from '@/actions/contact'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { trackEvent } from '@/lib/analytics'

const contactSchema = z.object({
    name: z.string().trim().min(2, 'Tell us your name.'),
    email: z.email('Enter a valid email address.'),
    message: z.string().trim().min(10, 'A few more words would help us respond well.'),
    company: z.string().max(0).optional(),
})

type ContactInput = z.infer<typeof contactSchema>

export function ContactForm() {
    const [pending, startTransition] = useTransition()
    const [result, setResult] = useState<{ ok: boolean; text: string } | null>(null)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ContactInput>({ resolver: zodResolver(contactSchema), defaultValues: { name: '', email: '', message: '', company: '' } })

    const onSubmit = handleSubmit((values) => {
        setResult(null)
        startTransition(async () => {
            const formData = new FormData()
            formData.set('name', values.name)
            formData.set('email', values.email)
            formData.set('message', values.message)
            formData.set('company', values.company ?? '')
            const response = await sendContactMessage(null, formData)
            setResult({ ok: response.status === 'success', text: response.message })
            if (response.status === 'success') {
                trackEvent('contact_submitted')
                reset()
            }
        })
    })

    if (result?.ok) {
        return (
            <div role="status" className="flex flex-col items-center gap-3 rounded-3xl border border-border bg-card p-10 text-center">
                <CheckCircle2 aria-hidden className="size-8 text-emerald-500" />
                <p className="font-medium">Message sent</p>
                <p className="max-w-sm text-sm text-muted-foreground">{result.text}</p>
            </div>
        )
    }

    return (
        <form onSubmit={onSubmit} noValidate className="space-y-5 rounded-3xl border border-border bg-card p-6 md:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="contact-name">Name</Label>
                    <Input id="contact-name" autoComplete="name" placeholder="Your name" aria-invalid={errors.name ? true : undefined} {...register('name')} />
                    {errors.name ? <p className="text-sm text-destructive">{errors.name.message}</p> : null}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="contact-email">Email</Label>
                    <Input id="contact-email" type="email" autoComplete="email" placeholder="you@example.com" aria-invalid={errors.email ? true : undefined} {...register('email')} />
                    {errors.email ? <p className="text-sm text-destructive">{errors.email.message}</p> : null}
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="contact-message">Message</Label>
                <Textarea id="contact-message" placeholder="What's on your mind?" aria-invalid={errors.message ? true : undefined} {...register('message')} />
                {errors.message ? <p className="text-sm text-destructive">{errors.message.message}</p> : null}
            </div>
            {/* Honeypot — hidden from people, tempting to bots. */}
            <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] size-px opacity-0" {...register('company')} />
            {result && !result.ok ? (
                <p role="alert" className="text-sm text-destructive">
                    {result.text}
                </p>
            ) : null}
            <Button type="submit" disabled={pending}>
                {pending ? <Loader2 aria-hidden className="animate-spin" /> : null}
                {pending ? 'Sending…' : 'Send message'}
            </Button>
        </form>
    )
}
