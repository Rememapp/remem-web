'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

// Cloudflare Turnstile, wrapped as a hook the two site forms share. The widget runs in
// "interaction-only" appearance: it solves invisibly for almost everyone and only materializes
// when Cloudflare decides the visitor needs to interact, so neither form pays a layout cost for it.
//
// When NEXT_PUBLIC_TURNSTILE_SITE_KEY is unset (e.g. a fresh clone) the hook renders nothing and
// getToken resolves null immediately — the API accepts tokenless submissions as long as its own
// secret is unset too, so the forms keep working end to end with zero config.

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ''
const SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'

interface TurnstileApi {
    render(container: HTMLElement, params: Record<string, unknown>): string
    reset(widgetId?: string): void
    remove(widgetId: string): void
}

declare global {
    interface Window {
        turnstile?: TurnstileApi
    }
}

let scriptPromise: Promise<TurnstileApi> | null = null

// Loaded once per page no matter how many forms mount (the footer and hero waitlist forms coexist).
function loadTurnstile(): Promise<TurnstileApi> {
    scriptPromise ??= new Promise((resolve, reject) => {
        if (window.turnstile) return resolve(window.turnstile)
        const script = document.createElement('script')
        script.src = SCRIPT_SRC
        script.async = true
        script.onload = () => (window.turnstile ? resolve(window.turnstile) : reject(new Error('Turnstile script loaded without API')))
        script.onerror = () => {
            // Allow a retry on the next mount instead of caching the failure forever.
            scriptPromise = null
            reject(new Error('Turnstile script failed to load'))
        }
        document.head.appendChild(script)
    })
    return scriptPromise
}

export interface TurnstileHandle {
    /** Element to render inside the form. Null when no site key is configured. */
    widget: React.ReactNode
    /** Resolves the current token, waiting briefly if the widget hasn't produced one yet. */
    getToken: () => Promise<string | undefined>
    /** Discards the current (single-use) token and asks for a fresh one — call after a failed submit. */
    reset: () => void
}

export function useTurnstile(): TurnstileHandle {
    const containerRef = useRef<HTMLDivElement | null>(null)
    const widgetIdRef = useRef<string | null>(null)
    const tokenRef = useRef<string | null>(null)
    // Tracked in state only to re-render consumers that might disable buttons on it; the source of
    // truth for getToken is the ref, which doesn't lag a render behind the callback.
    const [, setTokenState] = useState<string | null>(null)

    const setToken = useCallback((token: string | null) => {
        tokenRef.current = token
        setTokenState(token)
    }, [])

    useEffect(() => {
        if (!SITE_KEY || !containerRef.current) return
        let cancelled = false
        const container = containerRef.current

        loadTurnstile()
            .then((turnstile) => {
                if (cancelled || !container.isConnected) return
                widgetIdRef.current = turnstile.render(container, {
                    sitekey: SITE_KEY,
                    appearance: 'interaction-only',
                    theme: 'auto',
                    callback: (token: string) => setToken(token),
                    'expired-callback': () => setToken(null),
                    'error-callback': () => setToken(null),
                })
            })
            .catch(() => {
                // Script blocked (adblock, network). getToken will resolve undefined and the API
                // decides — with its secret set it will refuse, which is the correct failure mode.
            })

        return () => {
            cancelled = true
            if (widgetIdRef.current) {
                window.turnstile?.remove(widgetIdRef.current)
                widgetIdRef.current = null
            }
            setToken(null)
        }
    }, [setToken])

    const getToken = useCallback(async (): Promise<string | undefined> => {
        if (!SITE_KEY) return undefined
        // The invisible solve usually finishes well before a human can type an email; this wait only
        // matters for very fast submits or slow networks. Give up after 8s rather than hanging the form.
        const deadline = Date.now() + 8000
        while (!tokenRef.current && Date.now() < deadline) {
            await new Promise((r) => setTimeout(r, 150))
        }
        return tokenRef.current ?? undefined
    }, [])

    const reset = useCallback(() => {
        if (widgetIdRef.current) window.turnstile?.reset(widgetIdRef.current)
        setToken(null)
    }, [setToken])

    return {
        widget: SITE_KEY ? <div ref={containerRef} /> : null,
        getToken,
        reset,
    }
}
