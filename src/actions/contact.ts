'use server'

import { z } from 'zod'

export interface ContactResult {
    status: 'success' | 'error'
    message: string
}

const contactSchema = z.object({
    name: z.string().trim().min(2, 'Tell us your name.').max(100),
    email: z.email('Enter a valid email address.').max(254),
    message: z.string().trim().min(10, 'A few more words would help us respond well.').max(5000),
    // Honeypot: hidden from real users.
    company: z.literal('').optional(),
})

export async function sendContactMessage(_prev: ContactResult | null, formData: FormData): Promise<ContactResult> {
    const parsed = contactSchema.safeParse({
        name: String(formData.get('name') ?? ''),
        email: String(formData.get('email') ?? '').trim(),
        message: String(formData.get('message') ?? ''),
        company: String(formData.get('company') ?? ''),
    })

    if (!parsed.success) {
        if (parsed.error.issues.some((issue) => issue.path[0] === 'company')) {
            return { status: 'success', message: 'Thanks — we read every message.' }
        }
        return { status: 'error', message: parsed.error.issues[0]?.message ?? 'Please check the form and try again.' }
    }

    try {
        if (process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL) {
            const response = await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    from: 'Remem Contact <contact@remem.app>',
                    to: [process.env.CONTACT_TO_EMAIL],
                    reply_to: parsed.data.email,
                    subject: `Contact form: ${parsed.data.name}`,
                    text: parsed.data.message,
                }),
            })
            if (!response.ok) throw new Error(`Resend responded with ${response.status}`)
        } else {
            console.info('[contact] message received (no email provider configured):', parsed.data)
        }
        return { status: 'success', message: 'Thanks — we read every message and reply within a couple of days.' }
    } catch (error) {
        console.error('[contact] send failed:', error)
        return { status: 'error', message: 'Something went wrong sending your message. Email us instead at hello@remem.app.' }
    }
}
