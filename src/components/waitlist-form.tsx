'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { joinWaitlist } from '@/actions/waitlist'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { trackEvent } from '@/lib/analytics'
import { cn } from '@/lib/utils'

const waitlistSchema = z.object({
    email: z.email('Enter a valid email address.'),
    company: z.string().max(0).optional(),
})

type WaitlistInput = z.infer<typeof waitlistSchema>

interface WaitlistFormProps {
    /** hero: large input + button row. compact: fits footers and CTA bands. */
    size?: 'hero' | 'compact'
    /** Where the signup happened — sent with the analytics event. */
    source: string
    className?: string
}

export function WaitlistForm({ size = 'hero', source, className }: WaitlistFormProps) {
    const router = useRouter()
    const [pending, startTransition] = useTransition()
    const [serverMessage, setServerMessage] = useState<{ tone: 'error' | 'info'; text: string } | null>(null)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<WaitlistInput>({ resolver: zodResolver(waitlistSchema), defaultValues: { email: '', company: '' } })

    const onSubmit = handleSubmit((values) => {
        setServerMessage(null)
        startTransition(async () => {
            const formData = new FormData()
            formData.set('email', values.email)
            formData.set('company', values.company ?? '')
            const result = await joinWaitlist(null, formData)

            if (result.status === 'success') {
                trackEvent('waitlist_joined', { source })
                router.push('/waitlist/success')
            } else if (result.status === 'duplicate') {
                trackEvent('waitlist_duplicate', { source })
                setServerMessage({ tone: 'info', text: result.message })
            } else {
                setServerMessage({ tone: 'error', text: result.message })
            }
        })
    })

    const errorText = errors.email?.message ?? (serverMessage?.tone === 'error' ? serverMessage.text : null)
    const large = size === 'hero'

    return (
        <form onSubmit={onSubmit} noValidate className={cn('w-full', large ? 'max-w-md' : 'max-w-sm', className)}>
            <div className={cn('flex w-full gap-2', large ? 'flex-col sm:flex-row' : 'flex-row')}>
                <div className="flex-1">
                    <label htmlFor={`waitlist-email-${source}`} className="sr-only">
                        Email address
                    </label>
                    <Input
                        id={`waitlist-email-${source}`}
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        aria-invalid={errorText ? true : undefined}
                        aria-describedby={`waitlist-status-${source}`}
                        className={cn(large && 'h-12 rounded-full px-5 text-base')}
                        {...register('email')}
                    />
                </div>
                {/* Honeypot — hidden from people, tempting to bots. */}
                <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] size-px opacity-0" {...register('company')} />
                <Button type="submit" size={large ? 'lg' : 'default'} disabled={pending}>
                    {pending ? <Loader2 aria-hidden className="animate-spin" /> : null}
                    {pending ? 'Joining…' : 'Join waitlist'}
                    {!pending && <ArrowRight aria-hidden className="size-4" />}
                </Button>
            </div>
            <p id={`waitlist-status-${source}`} role="status" aria-live="polite" className={cn('mt-2 min-h-5 text-sm', serverMessage?.tone === 'info' ? 'text-primary' : 'text-destructive')}>
                {serverMessage?.tone === 'info' ? (
                    <span className="inline-flex items-center gap-1.5">
                        <CheckCircle2 aria-hidden className="size-4" />
                        {serverMessage.text}
                    </span>
                ) : (
                    errorText
                )}
            </p>
        </form>
    )
}
