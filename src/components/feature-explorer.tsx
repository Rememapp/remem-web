'use client'

import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

import { features, type FeatureChannel } from '@/lib/features'
import { cn } from '@/lib/utils'

/** Channel accents, shared with the rest of the site's violet/cyan/amber/red classification. */
const CHANNEL_TONES: Record<FeatureChannel, { badge: string; text: string; ring: string }> = {
    memory: { badge: 'bg-primary text-primary-foreground', text: 'text-primary', ring: 'border-primary/30' },
    match: { badge: 'bg-track-career text-background', text: 'text-track-career', ring: 'border-track-career/30' },
    ai: { badge: 'bg-track-answer text-background', text: 'text-track-answer', ring: 'border-track-answer/30' },
    control: { badge: 'bg-boundary text-background', text: 'text-boundary', ring: 'border-boundary/30' },
}

const STEP_INTERVAL_MS = 4000

export function FeatureExplorer() {
    const [active, setActive] = useState(0)
    const [paused, setPaused] = useState(false)
    const reducedMotion = useReducedMotion()

    // Pin the whole section to the tallest height it has ever rendered, so the list expanding
    // or collapsing as the active item changes can't shrink the section and nudge the waitlist
    // form further down the page. Only ever grows, never shrinks, and settles after first paint.
    const sectionRef = useRef<HTMLDivElement>(null)
    const [sectionMinHeight, setSectionMinHeight] = useState<number>()

    useLayoutEffect(() => {
        const el = sectionRef.current
        if (!el) return
        const observer = new ResizeObserver((entries) => {
            const height = entries[0]?.contentRect.height
            if (!height) return
            setSectionMinHeight((prev) => (prev === undefined ? height : Math.max(prev, height)))
        })
        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    // Auto-advance until the visitor interacts; skipped entirely under reduced motion.
    useEffect(() => {
        if (paused || reducedMotion) return
        const id = setInterval(() => setActive((current) => (current + 1) % features.length), STEP_INTERVAL_MS)
        return () => clearInterval(id)
    }, [paused, reducedMotion])

    const select = useCallback((index: number) => {
        setActive(index)
        setPaused(true)
    }, [])

    const activeFeature = features[active] ?? features[0]!
    const activeTone = CHANNEL_TONES[activeFeature.channel]

    return (
        <div ref={sectionRef} style={{ minHeight: sectionMinHeight }} className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
            <ol className="relative space-y-1" aria-label="Every Remem feature, by channel">
                {features.map((feature, index) => {
                    const isActive = index === active
                    const tone = CHANNEL_TONES[feature.channel]
                    return (
                        <li key={feature.id} className="relative">
                            <button
                                type="button"
                                onClick={() => select(index)}
                                aria-current={isActive ? 'step' : undefined}
                                className={cn(
                                    'group flex w-full items-start gap-4 rounded-lg p-4 text-left transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring',
                                    isActive ? 'border border-border bg-card' : 'border border-transparent hover:bg-secondary/50',
                                )}
                            >
                                <span
                                    className={cn(
                                        'mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-md transition-colors',
                                        isActive ? tone.badge : 'bg-secondary text-muted-foreground group-hover:text-foreground',
                                    )}
                                >
                                    <feature.icon aria-hidden className="size-4.5" />
                                </span>
                                <span className="min-w-0">
                                    <span className={cn('block font-medium transition-colors', isActive ? 'text-foreground' : 'text-muted-foreground')}>
                                        <span className="tnum mr-2 font-mono text-xs opacity-60">{String(index + 1).padStart(2, '0')}</span>
                                        {feature.title}
                                        <span className={cn('ml-2 font-mono text-[10px] tracking-[0.08em]', isActive ? tone.text : 'text-muted-foreground/70')}>{feature.id}</span>
                                    </span>
                                    <AnimatePresence initial={false}>
                                        {isActive ? (
                                            <motion.span
                                                initial={reducedMotion ? false : { height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={reducedMotion ? undefined : { height: 0, opacity: 0 }}
                                                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                                                className="block overflow-hidden"
                                            >
                                                <span className="mt-1.5 block text-sm leading-relaxed text-muted-foreground">{feature.description}</span>
                                            </motion.span>
                                        ) : null}
                                    </AnimatePresence>
                                </span>
                            </button>
                        </li>
                    )
                })}
            </ol>

            {/* Feature visual — pinned so it stays in view across a longer list than the timeline's */}
            <div aria-hidden className="relative hidden items-start lg:sticky lg:top-28 lg:flex lg:self-start">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeFeature.id}
                        initial={reducedMotion ? false : { opacity: 0, y: 16, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={reducedMotion ? undefined : { opacity: 0, y: -16, scale: 0.98 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className={cn('w-full rounded-lg border bg-card p-6 shadow-[0_16px_60px_rgba(0,0,0,0.12)]', activeTone.ring)}
                    >
                        <div className="flex items-center gap-3">
                            <span className={cn('flex size-10 items-center justify-center rounded-md', activeTone.badge)}>
                                <activeFeature.icon className="size-5" />
                            </span>
                            <div>
                                <p className="font-display text-lg font-semibold tracking-tight uppercase">{activeFeature.title}</p>
                                <p className={cn('font-mono text-[10px] tracking-[0.14em] uppercase', activeTone.text)}>ch.{activeFeature.channel}</p>
                            </div>
                        </div>
                        <div className="mt-6 space-y-3">
                            {activeFeature.visual.map((line, lineIndex) => (
                                <motion.div
                                    key={line}
                                    initial={reducedMotion ? false : { opacity: 0, x: 12 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.15 + lineIndex * 0.12, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                    className="flex items-center gap-2.5 rounded-md border border-border bg-background px-4 py-3 font-mono text-xs tracking-wide"
                                >
                                    <span aria-hidden className={cn('size-1.5 shrink-0', activeTone.badge.split(' ')[0])} />
                                    {line}
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    )
}
