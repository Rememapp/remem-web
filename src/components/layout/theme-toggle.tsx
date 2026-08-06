'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function ThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    const buttonRef = useRef<HTMLButtonElement>(null)

    useEffect(() => setMounted(true), [])

    const isLight = mounted && resolvedTheme === 'light'

    const toggleTheme = () => {
        const next = resolvedTheme === 'dark' ? 'light' : 'dark'
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

        if (reduceMotion || typeof document.startViewTransition !== 'function') {
            setTheme(next)
            return
        }

        const rect = buttonRef.current?.getBoundingClientRect()
        const x = rect ? rect.left + rect.width / 2 : window.innerWidth
        const y = rect ? rect.top + rect.height / 2 : 0
        const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))

        const root = document.documentElement
        root.style.setProperty('--theme-toggle-x', `${x}px`)
        root.style.setProperty('--theme-toggle-y', `${y}px`)
        root.style.setProperty('--theme-toggle-r', `${radius}px`)

        document.startViewTransition(() => {
            // next-themes applies the class in a useEffect, which fires too late for the
            // view transition to capture — flip it here so the snapshot is correct, then
            // let setTheme sync React state and localStorage (its own class write is a no-op).
            root.classList.remove('light', 'dark')
            root.classList.add(next)
            setTheme(next)
        })
    }

    return (
        <Button ref={buttonRef} variant="ghost" size="icon" aria-label={isLight ? 'Switch to light mode' : 'Switch to dark mode'} onClick={toggleTheme}>
            <span className="relative block size-4">
                <Sun
                    aria-hidden
                    className={cn(
                        'absolute inset-0 size-4 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
                        isLight ? 'scale-100 rotate-0 opacity-100' : 'scale-50 -rotate-90 opacity-0',
                    )}
                />
                <Moon
                    aria-hidden
                    className={cn(
                        'absolute inset-0 size-4 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
                        isLight ? 'scale-50 rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100',
                    )}
                />
            </span>
        </Button>
    )
}
