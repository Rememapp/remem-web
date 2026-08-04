/**
 * Provider-agnostic analytics events. Works with Plausible/Umami-style
 * script tags out of the box; safely no-ops when no provider is present.
 */
type EventProps = Record<string, string | number | boolean>

declare global {
    interface Window {
        plausible?: (event: string, options?: { props?: EventProps }) => void
        umami?: { track: (event: string, props?: EventProps) => void }
    }
}

export function trackEvent(event: string, props?: EventProps): void {
    if (typeof window === 'undefined') return
    window.plausible?.(event, props ? { props } : undefined)
    window.umami?.track(event, props)
}
