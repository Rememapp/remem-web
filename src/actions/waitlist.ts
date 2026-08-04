'use server'

import fs from 'node:fs/promises'
import path from 'node:path'
import { z } from 'zod'

export interface WaitlistResult {
    status: 'success' | 'duplicate' | 'error'
    message: string
}

const waitlistSchema = z.object({
    email: z.email('Enter a valid email address.').max(254),
    // Honeypot: real users never see or fill this field.
    company: z.literal('').optional(),
})

/** Naive in-memory rate limit — enough to blunt naive spam without a dependency. */
const submissions = new Map<string, { count: number; windowStart: number }>()
const RATE_WINDOW_MS = 60_000
const RATE_MAX = 5

function rateLimited(key: string): boolean {
    const now = Date.now()
    const entry = submissions.get(key)
    if (!entry || now - entry.windowStart > RATE_WINDOW_MS) {
        submissions.set(key, { count: 1, windowStart: now })
        return false
    }
    entry.count += 1
    return entry.count > RATE_MAX
}

interface WaitlistStore {
    add(email: string): Promise<'added' | 'duplicate'>
}

/** Resend Audiences — used automatically when RESEND_API_KEY + RESEND_AUDIENCE_ID are set. */
const resendStore: WaitlistStore = {
    async add(email) {
        const response = await fetch(`https://api.resend.com/audiences/${process.env.RESEND_AUDIENCE_ID}/contacts`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, unsubscribed: false }),
        })
        if (response.status === 409) return 'duplicate'
        if (!response.ok) throw new Error(`Resend responded with ${response.status}`)
        return 'added'
    },
}

/** Local JSON file — development fallback so the flow works end to end with zero config. */
const fileStore: WaitlistStore = {
    async add(email) {
        const file = path.join(process.cwd(), '.data', 'waitlist.json')
        await fs.mkdir(path.dirname(file), { recursive: true })
        let emails: string[] = []
        try {
            emails = JSON.parse(await fs.readFile(file, 'utf8')) as string[]
        } catch {
            // First signup — file doesn't exist yet.
        }
        if (emails.includes(email)) return 'duplicate'
        emails.push(email)
        await fs.writeFile(file, JSON.stringify(emails, null, 2))
        return 'added'
    },
}

function getStore(): WaitlistStore {
    if (process.env.RESEND_API_KEY && process.env.RESEND_AUDIENCE_ID) return resendStore
    return fileStore
}

export async function joinWaitlist(_prev: WaitlistResult | null, formData: FormData): Promise<WaitlistResult> {
    const parsed = waitlistSchema.safeParse({
        email: String(formData.get('email') ?? '')
            .trim()
            .toLowerCase(),
        company: String(formData.get('company') ?? ''),
    })

    if (!parsed.success) {
        // A filled honeypot means a bot — pretend it worked and drop it.
        if (parsed.error.issues.some((issue) => issue.path[0] === 'company')) {
            return { status: 'success', message: 'You are on the list.' }
        }
        return { status: 'error', message: parsed.error.issues[0]?.message ?? 'Enter a valid email address.' }
    }

    const { email } = parsed.data

    if (rateLimited(email)) {
        return { status: 'error', message: 'Too many attempts. Try again in a minute.' }
    }

    try {
        const result = await getStore().add(email)
        if (result === 'duplicate') {
            return { status: 'duplicate', message: 'You are already on the list — we will be in touch.' }
        }
        return { status: 'success', message: 'You are on the list.' }
    } catch (error) {
        console.error('[waitlist] signup failed:', error)
        return { status: 'error', message: 'Something went wrong on our end. Please try again.' }
    }
}
