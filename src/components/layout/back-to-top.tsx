'use client'

import { ArrowUp } from 'lucide-react'
import { useEffect, useState } from 'react'

import { cn } from '@/lib/utils'

export function BackToTop() {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 480)
        onScroll()
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const scrollToTop = () => {
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
    }

    return (
        <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            aria-hidden={!visible}
            tabIndex={visible ? 0 : -1}
            className={cn(
                'fixed right-5 bottom-5 z-40 flex size-11 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-[0_4px_20px_-4px_color-mix(in_oklch,var(--primary)_45%,transparent)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] outline-none hover:brightness-110 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98] sm:right-8 sm:bottom-8 dark:bg-foreground dark:text-background dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.35)] dark:hover:opacity-90 dark:hover:brightness-100',
                visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0',
            )}
        >
            <ArrowUp className="size-4.5" aria-hidden />
        </button>
    )
}
