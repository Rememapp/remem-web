import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

/**
 * Entrance wrappers, CSS-driven (see globals.css). Server components: content
 * ships visible in the SSR HTML — no hydration-gated opacity. `immediate`
 * plays once on load; otherwise a scroll timeline drives the settle where the
 * browser supports it, and the block is simply visible where it doesn't.
 * Reduced-motion users get static content via the media query.
 */

interface RevealProps {
    children: ReactNode
    className?: string
    /** Seconds to wait before the load animation (immediate mode only). */
    delay?: number
    /** Slide direction; 'none' fades only. */
    from?: 'up' | 'down' | 'none'
    /** Animate on load instead of on scroll into view. */
    immediate?: boolean
}

export function Reveal({ children, className, delay = 0, from = 'up', immediate = false }: RevealProps) {
    if (immediate) {
        return (
            <div className={cn('enter', from === 'down' && 'enter-down', from === 'none' && 'enter-fade', className)} style={delay ? { animationDelay: `${delay}s` } : undefined}>
                {children}
            </div>
        )
    }
    return <div className={cn('scroll-reveal', className)}>{children}</div>
}

export function Stagger({ children, className }: { children: ReactNode; className?: string }) {
    return <div className={className}>{children}</div>
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
    return <div className={cn('scroll-reveal', className)}>{children}</div>
}
