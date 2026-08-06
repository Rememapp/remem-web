'use client'

import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Logo } from '@/components/layout/logo'
import { ThemeToggle } from '@/components/layout/theme-toggle'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navLinks = [
    { href: '/features', label: 'Features' },
    { href: '/how-it-works', label: 'How it works' },
    { href: '/faq', label: 'FAQ' },
    { href: '/about', label: 'About' },
] as const

export function Navbar() {
    const pathname = usePathname()
    const [scrolled, setScrolled] = useState(false)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8)
        onScroll()
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    // Close the mobile menu on navigation.
    useEffect(() => setOpen(false), [pathname])

    return (
        <header
            className={cn(
                'fixed inset-x-0 top-0 z-50 transition-all duration-300',
                scrolled || open ? 'border-b border-border bg-background/85 backdrop-blur-xl' : 'border-b border-transparent bg-transparent',
            )}
        >
            <nav aria-label="Main" className="container-page flex h-16 items-center justify-between">
                <Logo />

                <div className="hidden items-center gap-1 md:flex">
                    {navLinks.map((link) => {
                        const active = pathname === link.href || pathname.startsWith(`${link.href}/`)
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                aria-current={active ? 'page' : undefined}
                                className={cn(
                                    'group relative rounded-md px-3.5 py-2 font-mono text-xs font-medium tracking-[0.12em] uppercase transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring',
                                    active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
                                )}
                            >
                                <span aria-hidden className={cn('mr-1.5 inline-block size-1.5 align-[0.05em] transition-colors', active ? 'bg-primary' : 'bg-transparent group-hover:bg-steel')} />
                                {link.label}
                            </Link>
                        )
                    })}
                </div>

                <div className="flex items-center gap-2">
                    <ThemeToggle />
                    <Button asChild className="hidden md:inline-flex">
                        <Link href="/#waitlist">Join waitlist</Link>
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        aria-expanded={open}
                        aria-controls="mobile-menu"
                        aria-label={open ? 'Close menu' : 'Open menu'}
                        onClick={() => setOpen((v) => !v)}
                    >
                        {open ? <X className="size-5" /> : <Menu className="size-5" />}
                    </Button>
                </div>
            </nav>

            {open ? (
                <div id="mobile-menu" className="border-t border-border bg-background/95 backdrop-blur-xl md:hidden">
                    <div className="container-page flex flex-col gap-1 py-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="rounded-md px-3 py-2.5 font-mono text-xs font-medium tracking-[0.12em] text-muted-foreground uppercase transition-colors hover:bg-secondary/60 hover:text-foreground"
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Button asChild className="mt-2">
                            <Link href="/#waitlist">Join waitlist</Link>
                        </Button>
                    </div>
                </div>
            ) : null}
        </header>
    )
}
