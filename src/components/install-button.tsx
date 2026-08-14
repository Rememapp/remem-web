'use client'

import Link from 'next/link'
import type { ComponentType, SVGProps } from 'react'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { trackEvent } from '@/lib/analytics'
import { siteConfig } from '@/lib/site'

import { FaEdge } from 'react-icons/fa'
import { SiBrave, SiFirefoxbrowser, SiGooglechrome, SiSafari } from 'react-icons/si'

type DetectedBrowser = 'chrome' | 'edge' | 'brave' | 'firefox' | 'safari'

interface NavigatorWithBrandHints extends Navigator {
    userAgentData?: { brands: { brand: string }[] }
    brave?: { isBrave: () => Promise<boolean> }
}

interface BrowserMeta {
    label: string
    Icon: ComponentType<SVGProps<SVGSVGElement>>
    /** false: Remem isn't published there yet — render as a disabled status, not a broken install link. */
    installable: boolean
}

const BROWSER_META: Record<DetectedBrowser, BrowserMeta> = {
    chrome: { label: 'Add to Chrome', Icon: SiGooglechrome, installable: true },
    edge: { label: 'Add to Edge', Icon: FaEdge, installable: true },
    brave: { label: 'Add to Brave', Icon: SiBrave, installable: true },
    // Reliably detectable (stable UA tokens), but Remem isn't on Firefox/Safari yet — the Chrome
    // Web Store link genuinely can't install anything there, so these get a status, not a CTA.
    firefox: { label: 'Not available for Firefox', Icon: SiFirefoxbrowser, installable: false },
    safari: { label: 'Not available for Safari', Icon: SiSafari, installable: false },
}

async function detectBrowser(): Promise<DetectedBrowser> {
    const nav = navigator as NavigatorWithBrandHints
    const ua = nav.userAgent

    const isBrave = await nav.brave?.isBrave().catch(() => false)
    if (isBrave) return 'brave'

    if (/Firefox\//.test(ua)) return 'firefox'

    const isEdge = (nav.userAgentData?.brands.some((b) => b.brand.includes('Edge')) ?? false) || /Edg\//.test(ua)
    if (isEdge) return 'edge'

    // Safari carries "Safari/" in its UA, but so does every other WebKit/Blink browser for legacy
    // compatibility — only Safari itself lacks all of these other engines' own tokens.
    const isSafari = /Safari\//.test(ua) && !/Chrome|Chromium|CriOS|FxiOS|OPR/.test(ua)
    if (isSafari) return 'safari'

    // Arc has no confirmed public signal distinguishing it from plain Chromium — falls through to
    // Chrome, which is still a correct, working link for it.
    return 'chrome'
}

interface InstallButtonProps {
    /** hero: large button. compact: fits inline with other actions. */
    size?: 'hero' | 'compact'
    /** Where the button appears — sent with the analytics event. */
    source: string
    className?: string
}

export function InstallButton({ size = 'hero', source, className }: InstallButtonProps) {
    // Defaults to Chrome so server and first client render match; swaps after mount once the
    // (possibly async, e.g. Brave's own feature-detect) check resolves — same install link either way.
    const [browser, setBrowser] = useState<DetectedBrowser>('chrome')

    useEffect(() => {
        let cancelled = false
        detectBrowser().then((result) => {
            if (!cancelled) setBrowser(result)
        })
        return () => {
            cancelled = true
        }
    }, [])

    const { label, Icon, installable } = BROWSER_META[browser]
    const buttonSize = size === 'hero' ? 'lg' : 'default'

    if (!installable) {
        return (
            <Button type="button" variant="outline" disabled size={buttonSize} className={className}>
                <Icon aria-hidden className="size-4" />
                {label}
            </Button>
        )
    }

    return (
        <Button asChild size={buttonSize} className={className} onClick={() => trackEvent('install_clicked', { source, browser })}>
            <Link href={siteConfig.links.chromeWebStore} target="_blank" rel="noopener noreferrer">
                <Icon aria-hidden className="size-4" />
                {label}
            </Link>
        </Button>
    )
}
