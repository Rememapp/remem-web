// Client for the real backend (the sibling `remem-api` worker). The forms post straight from the
// visitor's browser — not through a Next.js server action — so the API's per-IP rate limiting and
// Turnstile check see the visitor's own address rather than this site's server. remem-api allowlists
// this site's origins in its CORS config (SITE_ORIGINS in its server.ts); if the site ever moves
// domains, that list has to move with it.

export const API_BASE_URL = process.env.NEXT_PUBLIC_REMEM_API_URL ?? 'https://api.rememapp.uk'

export interface ContactResult {
    status: 'success' | 'error'
    message: string
}

interface SubmissionFields {
    /** Honeypot — hidden field real users never fill. Sent through so the API can drop bots silently. */
    company?: string
    turnstileToken?: string
}

// One place that turns transport-level failures into the friendly line each form shows. `null` from
// the shared helper means one of the errors both forms phrase the same way; form-specific fallbacks
// stay in the callers.
async function postSubmission(path: string, payload: object): Promise<{ data: { status?: string; error?: string } | null; refusal: string | null }> {
    try {
        const response = await fetch(`${API_BASE_URL}${path}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        })
        const data = (await response.json().catch(() => null)) as { status?: string; error?: string } | null
        if (response.ok) return { data, refusal: null }
        if (response.status === 429) return { data, refusal: 'Too many attempts. Try again in a minute.' }
        if (data?.error === 'captcha_required' || data?.error === 'captcha_failed') {
            return { data, refusal: 'We could not verify you are human — please try again.' }
        }
        return { data, refusal: 'Something went wrong on our end. Please try again.' }
    } catch {
        return { data: null, refusal: 'Could not reach the server. Check your connection and try again.' }
    }
}

export async function sendContactMessage(input: { name: string; email: string; message: string } & SubmissionFields): Promise<ContactResult> {
    const { refusal } = await postSubmission('/api/site/contact', input)
    if (refusal) return { status: 'error', message: refusal }
    return { status: 'success', message: 'Thanks — we read every message and reply within a couple of days.' }
}
