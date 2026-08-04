'use client'

import { CheckCircle2, Eye, FileText, MousePointerClick, ScanSearch, Send, UserRound, type LucideIcon } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useCallback, useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/utils'

interface Step {
    icon: LucideIcon
    title: string
    description: string
    visual: string[]
}

const steps: Step[] = [
    {
        icon: UserRound,
        title: 'Create your profile',
        description: 'Answer questions in the Memory Builder, dictate, or upload your CV. Remem confirms each fact with you before saving it — locally.',
        visual: ['Name · confirmed', 'Employment history · confirmed', 'Education · confirmed'],
    },
    {
        icon: FileText,
        title: 'Visit any form',
        description: 'A job application, a visa form, a checkout. Remem sits quietly until you ask for it.',
        visual: ['jobs.example.com/apply', '42 fields detected', 'Waiting for your trigger'],
    },
    {
        icon: ScanSearch,
        title: 'Remem understands',
        description: 'It maps each field to your memory — deterministically. “Given name”, “First name”, same answer.',
        visual: ['First name → Alex', 'Employer → Northwind Labs', 'Open question → needs a draft'],
    },
    {
        icon: Eye,
        title: 'Review suggestions',
        description: 'Every value is shown before anything is touched. Edit, rewrite AI drafts, or skip fields entirely.',
        visual: ['12 matches ready', '1 draft to review', 'Nothing filled yet'],
    },
    {
        icon: MousePointerClick,
        title: 'Fill the form',
        description: 'One click. Forty fields. Done in seconds instead of twenty minutes.',
        visual: ['Filling 13 fields…', 'Done in 1.2s', 'Everything editable'],
    },
    {
        icon: Send,
        title: 'You submit',
        description: 'Remem never presses submit. Read it over, change your mind, or send it — your call.',
        visual: ['Submit button: untouched', 'Final review: yours', 'Sent — by you'],
    },
]

const STEP_INTERVAL_MS = 4000

export function Timeline() {
    const [active, setActive] = useState(0)
    const [paused, setPaused] = useState(false)
    const reducedMotion = useReducedMotion()
    const containerRef = useRef<HTMLDivElement>(null)

    // Auto-advance until the visitor interacts; skipped entirely under reduced motion.
    useEffect(() => {
        if (paused || reducedMotion) return
        const id = setInterval(() => setActive((current) => (current + 1) % steps.length), STEP_INTERVAL_MS)
        return () => clearInterval(id)
    }, [paused, reducedMotion])

    const select = useCallback((index: number) => {
        setActive(index)
        setPaused(true)
    }, [])

    const activeStep = steps[active] ?? steps[0]!

    return (
        <div ref={containerRef} className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
            <ol className="relative space-y-1" aria-label="How Remem works, step by step">
                {steps.map((step, index) => {
                    const isActive = index === active
                    return (
                        <li key={step.title} className="relative">
                            <button
                                type="button"
                                onClick={() => select(index)}
                                aria-current={isActive ? 'step' : undefined}
                                className={cn(
                                    'group flex w-full items-start gap-4 rounded-2xl p-4 text-left transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring',
                                    isActive ? 'bg-card border border-border shadow-[0_8px_30px_rgba(0,0,0,0.06)]' : 'border border-transparent hover:bg-secondary/50',
                                )}
                            >
                                <span
                                    className={cn(
                                        'mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl transition-colors',
                                        isActive ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground group-hover:text-foreground',
                                    )}
                                >
                                    <step.icon aria-hidden className="size-4.5" />
                                </span>
                                <span>
                                    <span className={cn('block font-medium transition-colors', isActive ? 'text-foreground' : 'text-muted-foreground')}>
                                        <span className="mr-2 text-xs tabular-nums opacity-60">{String(index + 1).padStart(2, '0')}</span>
                                        {step.title}
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
                                                <span className="mt-1.5 block text-sm leading-relaxed text-muted-foreground">{step.description}</span>
                                            </motion.span>
                                        ) : null}
                                    </AnimatePresence>
                                </span>
                            </button>
                        </li>
                    )
                })}
            </ol>

            {/* Step visual */}
            <div aria-hidden className="relative hidden items-center lg:flex">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={active}
                        initial={reducedMotion ? false : { opacity: 0, y: 16, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={reducedMotion ? undefined : { opacity: 0, y: -16, scale: 0.98 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full rounded-2xl border border-border bg-card p-6 shadow-[0_16px_60px_rgba(0,0,0,0.12)]"
                    >
                        <div className="flex items-center gap-3">
                            <span className="flex size-10 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                                <activeStep.icon className="size-5" />
                            </span>
                            <p className="font-display text-lg font-semibold">{activeStep.title}</p>
                        </div>
                        <div className="mt-6 space-y-3">
                            {activeStep.visual.map((line, lineIndex) => (
                                <motion.div
                                    key={line}
                                    initial={reducedMotion ? false : { opacity: 0, x: 12 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.15 + lineIndex * 0.12, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                    className="flex items-center gap-2.5 rounded-xl border border-border bg-background px-4 py-3 text-sm"
                                >
                                    <CheckCircle2 className="size-4 shrink-0 text-emerald-500" />
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
