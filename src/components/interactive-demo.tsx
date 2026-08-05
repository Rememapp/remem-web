'use client'

import { Check, CheckCircle2, Loader2, RotateCcw, ScanSearch, Settings, Sparkles, X } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import Image from 'next/image'
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'

import { cn } from '@/lib/utils'

/**
 * Interactive replica of the Remem extension's real fill loop, mirrored from the
 * extension codebase (`remem/src/entrypoints/popup/App.tsx`, `status-toast.tsx`,
 * `watching-badge.tsx`, `highlight-field.ts`). Authentic popup behavior: hidden until
 * the visitor clicks the toolbar icon, and it closes itself when the scan starts —
 * the real popup calls window.close() there too. A three-step coach mark guides the
 * visitor: open the popup → hit scan → press submit themselves.
 */

interface DemoField {
    id: string
    label: string
    value: string
    type: 'text' | 'email'
}

const FIELDS: DemoField[] = [
    { id: 'name', label: 'Full legal name', value: 'Alex Rivera', type: 'text' },
    { id: 'email', label: 'Email address', value: 'alex@rivera.dev', type: 'email' },
    { id: 'employer', label: 'Most recent employer', value: 'Northwind Labs', type: 'text' },
    { id: 'experience', label: 'Years of experience', value: '7', type: 'text' },
]

const OPEN_QUESTION = 'Why do you want this role?'

const AI_DRAFT =
    'After seven years shipping developer-facing tools at Northwind Labs, I want to build products people rely on every day — with a small team that owns its decisions. That is exactly what this role offers.'

// Vault contents behind the demo — the already-built profile the fields fill from.
const STATS = { identity: 9, career: 11, answers: 4 }
const TOTAL_FACTS = STATS.identity + STATS.career + STATS.answers

type Phase = 'idle' | 'detecting' | 'generating' | 'filling' | 'done' | 'submitted'

const TYPE_MS = 14
const TOTAL_STEPS = FIELDS.length + 1

/** Bobbing guidance chip with a directional arrow, used for the demo's three coach steps. */
function CoachChip({ children, arrow, className }: { children: ReactNode; arrow: 'up' | 'right' | 'down'; className?: string }) {
    const reducedMotion = useReducedMotion()
    const bob = arrow === 'right' ? { x: [0, 5, 0] } : { y: arrow === 'up' ? [0, 5, 0] : [0, -5, 0] }

    return (
        <motion.div
            initial={reducedMotion ? false : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1, ...(reducedMotion ? {} : bob) }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{
                opacity: { duration: 0.25 },
                scale: { duration: 0.25 },
                x: { duration: 1.6, repeat: Infinity, ease: 'easeInOut' },
                y: { duration: 1.6, repeat: Infinity, ease: 'easeInOut' },
            }}
            className={cn('pointer-events-none absolute z-30 select-none', className)}
        >
            <div className="relative rounded-full bg-primary px-3.5 py-2 text-xs font-semibold whitespace-nowrap text-primary-foreground shadow-[0_8px_30px_rgba(124,58,237,0.45)]">
                {children}
                <span
                    aria-hidden
                    className={cn(
                        'absolute size-2 rotate-45 bg-primary',
                        arrow === 'up' && 'top-0 right-5 -translate-y-1/2',
                        arrow === 'right' && 'top-1/2 right-0 translate-x-1/2 -translate-y-1/2',
                        arrow === 'down' && 'bottom-0 right-8 translate-y-1/2',
                    )}
                />
            </div>
        </motion.div>
    )
}

export function InteractiveDemo() {
    const reducedMotion = useReducedMotion()

    const [phase, setPhase] = useState<Phase>('idle')
    const [values, setValues] = useState<Record<string, string>>({})
    const [openAnswer, setOpenAnswer] = useState('')
    const [draftReady, setDraftReady] = useState(false)
    const [bursting, setBursting] = useState<string | null>(null)
    const [filledCount, setFilledCount] = useState(0)
    const [showBadge, setShowBadge] = useState(false)

    const [popupOpen, setPopupOpen] = useState(false)

    // Every scheduled step checks this token so replay/unmount cancels a running sequence.
    const runToken = useRef(0)
    const scannerRef = useRef<HTMLButtonElement>(null)
    const iconRef = useRef<HTMLButtonElement>(null)

    useEffect(() => {
        return () => {
            runToken.current += 1
        }
    }, [])

    // Move focus into the popup when it opens; Escape closes it, like a real popup.
    useEffect(() => {
        if (!popupOpen) return
        scannerRef.current?.focus({ preventScroll: true })
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setPopupOpen(false)
                iconRef.current?.focus({ preventScroll: true })
            }
        }
        document.addEventListener('keydown', onKeyDown)
        return () => document.removeEventListener('keydown', onKeyDown)
    }, [popupOpen])

    const sleep = (ms: number) =>
        new Promise<void>((resolve) => {
            setTimeout(resolve, ms)
        })

    const runScan = useCallback(async () => {
        const token = ++runToken.current
        const alive = () => runToken.current === token

        // The real popup closes itself the moment it injects the scanner (window.close()).
        setPhase('detecting')
        await sleep(reducedMotion ? 100 : 350)
        if (!alive()) return
        setPopupOpen(false)
        await sleep(reducedMotion ? 100 : 650)
        if (!alive()) return

        setPhase('generating')
        await sleep(reducedMotion ? 200 : 1300)
        if (!alive()) return

        setPhase('filling')
        for (const field of FIELDS) {
            setBursting(field.id)
            if (reducedMotion) {
                setValues((prev) => ({ ...prev, [field.id]: field.value }))
            } else {
                for (let i = 1; i <= field.value.length; i++) {
                    setValues((prev) => ({ ...prev, [field.id]: field.value.slice(0, i) }))
                    await sleep(TYPE_MS)
                    if (!alive()) return
                }
            }
            setFilledCount((count) => count + 1)
            await sleep(reducedMotion ? 60 : 320)
            if (!alive()) return
            setBursting(null)
        }

        // The open question gets a reviewable draft, typed in place — never a silent fill.
        setBursting('open')
        if (reducedMotion) {
            setOpenAnswer(AI_DRAFT)
        } else {
            for (let i = 1; i <= AI_DRAFT.length; i++) {
                setOpenAnswer(AI_DRAFT.slice(0, i))
                await sleep(5)
                if (!alive()) return
            }
        }
        setDraftReady(true)
        setFilledCount((count) => count + 1)
        await sleep(reducedMotion ? 60 : 350)
        if (!alive()) return
        setBursting(null)

        setPhase('done')
        await sleep(reducedMotion ? 400 : 3200)
        if (!alive()) return
        setShowBadge(true)
    }, [reducedMotion])

    const reset = useCallback(() => {
        runToken.current += 1
        setPhase('idle')
        setValues({})
        setOpenAnswer('')
        setDraftReady(false)
        setBursting(null)
        setFilledCount(0)
        setShowBadge(false)
    }, [])

    const running = phase === 'detecting' || phase === 'generating' || phase === 'filling'
    const fillDone = phase === 'done' || phase === 'submitted'
    const percent = Math.round((filledCount / TOTAL_STEPS) * 100)

    // Coach marks are state-based, not one-shot: whenever the visitor is in a state
    // whose only next step is opening the popup, the hint comes back (e.g. after
    // closing the popup without scanning, or after hitting replay).
    const coachOpenPopup = !popupOpen && phase === 'idle'
    const coachScan = popupOpen && phase === 'idle'
    const coachSubmit = phase === 'done' && !popupOpen

    return (
        <div className="mx-auto w-full max-w-5xl">
            <div
                role="group"
                aria-label="Interactive Remem demo"
                className="relative overflow-hidden rounded-lg border border-border bg-card text-left shadow-[0_24px_80px_rgba(0,0,0,0.25)] select-none"
            >
                {/* Window chrome — the extension icon lives here, like a real toolbar */}
                <div className="flex items-center gap-3 border-b border-border px-4 py-3">
                    <div className="flex gap-1.5" aria-hidden>
                        <span className="size-3 rounded-full bg-rose-400/80" />
                        <span className="size-3 rounded-full bg-amber-400/80" />
                        <span className="size-3 rounded-full bg-emerald-400/80" />
                    </div>
                    <div aria-hidden className="mx-auto flex h-7 w-full max-w-sm min-w-0 items-center justify-center overflow-hidden rounded-md bg-secondary px-3 font-mono text-[11px] tracking-wide text-muted-foreground">
                        <span className="truncate">jobs.example.com/apply/senior-engineer</span>
                    </div>
                    <button
                        ref={iconRef}
                        type="button"
                        onClick={() => setPopupOpen((open) => !open)}
                        aria-expanded={popupOpen}
                        aria-label={popupOpen ? 'Close the Remem popup' : 'Open the Remem popup'}
                        className={cn(
                            'relative flex size-7 shrink-0 items-center justify-center rounded-lg transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-ring',
                            popupOpen ? 'bg-primary/15 ring-1 ring-primary/40' : 'bg-secondary/80 hover:bg-primary/15 hover:ring-1 hover:ring-primary/40',
                            coachOpenPopup && 'shadow-[0_0_16px_rgba(134,59,255,0.45)] ring-1 ring-primary/50',
                        )}
                    >
                        <Image src="/logo.svg" alt="" width={16} height={16} />
                        {/* Attention ping until the visitor opens the popup once */}
                        {coachOpenPopup && (
                            <>
                                {!reducedMotion && <span aria-hidden className="absolute -top-0.5 -right-0.5 size-2 animate-ping rounded-full bg-primary" />}
                                <span aria-hidden className="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-primary" />
                            </>
                        )}
                    </button>
                </div>

                {/* Coach step 1 — anchored under the extension icon */}
                <AnimatePresence>
                    {coachOpenPopup && (
                        <CoachChip key="coach-open" arrow="up" className="top-14 right-3">
                            Try it — open Remem
                        </CoachChip>
                    )}
                </AnimatePresence>

                {/* The "page": a job application form */}
                <div className="p-6 sm:p-8 sm:pr-76">
                    <div className="space-y-4">
                        <div aria-hidden className="space-y-1.5 pb-1">
                            <div className="h-4 w-44 rounded bg-secondary" />
                            <div className="h-3 w-64 rounded bg-secondary/60" />
                        </div>

                        {FIELDS.map((field) => {
                            const filled = (values[field.id] ?? '') === field.value
                            return (
                                <div key={field.id} className="space-y-1.5">
                                    <label htmlFor={`demo-${field.id}`} className="block font-mono text-[10px] font-medium tracking-[0.12em] text-muted-foreground uppercase">
                                        {field.label}
                                    </label>
                                    <div className="relative">
                                        <input
                                            id={`demo-${field.id}`}
                                            type={field.type}
                                            value={values[field.id] ?? ''}
                                            onChange={(event) => setValues((prev) => ({ ...prev, [field.id]: event.target.value }))}
                                            className={cn(
                                                'w-full rounded-md border bg-background px-3.5 py-2.5 pr-9 text-sm text-foreground transition-all duration-700 outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30',
                                                // Mirrors the extension's highlight burst: solid outline + glow + tint that fades out.
                                                bursting === field.id ? 'border-primary bg-primary/10 shadow-[0_0_0_5px_rgba(134,59,255,0.22)] duration-100' : 'border-input shadow-none',
                                            )}
                                        />
                                        <AnimatePresence>
                                            {filled && bursting !== field.id ? (
                                                <motion.span
                                                    initial={reducedMotion ? false : { scale: 0.5, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2"
                                                >
                                                    <Check aria-hidden className="size-4 text-primary" />
                                                </motion.span>
                                            ) : null}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            )
                        })}

                        {/* Open-ended question — receives an AI draft to review, never a silent fill. */}
                        <div className="space-y-1.5">
                            <label htmlFor="demo-open-question" className="block font-mono text-[10px] font-medium tracking-[0.12em] text-muted-foreground uppercase">
                                {OPEN_QUESTION}
                            </label>
                            <textarea
                                id="demo-open-question"
                                rows={3}
                                value={openAnswer}
                                onChange={(event) => setOpenAnswer(event.target.value)}
                                className={cn(
                                    'w-full resize-none rounded-md border bg-background px-3.5 py-2.5 text-sm text-foreground transition-all duration-700 outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30',
                                    bursting === 'open' ? 'border-primary bg-primary/10 shadow-[0_0_0_5px_rgba(134,59,255,0.22)] duration-100' : 'border-input shadow-none',
                                )}
                            />
                            <div className="flex min-h-4 justify-end">
                                <AnimatePresence>
                                    {draftReady && phase !== 'submitted' ? (
                                        <motion.span
                                            initial={reducedMotion ? false : { opacity: 0, y: 4 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0 }}
                                            className="inline-flex items-center gap-1 text-[11px] font-medium text-primary"
                                        >
                                            <Sparkles aria-hidden className="size-3" />
                                            AI draft — review and edit in place
                                        </motion.span>
                                    ) : null}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* The page's own submit button — the demo never presses it. */}
                        <div className="relative flex items-center justify-between gap-3 pt-1">
                            <p className="text-[11px] text-muted-foreground">{fillDone ? 'Every field is editable — Remem stops here.' : ''}</p>
                            {/* Coach step 3 — the point of the whole product: the submit is yours */}
                            <AnimatePresence>
                                {coachSubmit && (
                                    <CoachChip key="coach-submit" arrow="down" className="right-2 -top-9">
                                        Your turn — hit submit
                                    </CoachChip>
                                )}
                            </AnimatePresence>
                            <button
                                type="button"
                                onClick={() => setPhase('submitted')}
                                className="rounded-md bg-foreground px-5 py-2 font-mono text-[11px] font-semibold tracking-[0.1em] text-background uppercase transition-transform outline-none hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.98]"
                            >
                                Submit application
                            </button>
                        </div>
                    </div>
                </div>

                {/* Click-away layer — a real popup closes when you click the page behind it */}
                {popupOpen && <button type="button" aria-label="Close the Remem popup" onClick={() => setPopupOpen(false)} className="absolute inset-0 z-10 cursor-default" tabIndex={-1} />}

                {/* Remem popup — compact replica of the extension's popup, anchored to the
                    toolbar icon and hidden until the icon is clicked, like the real thing. */}
                <AnimatePresence>
                    {popupOpen && (
                        <motion.div
                            key="popup"
                            initial={reducedMotion ? false : { opacity: 0, scale: 0.92, y: -8 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: -6 }}
                            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                            style={{ transformOrigin: 'top right' }}
                            className="absolute top-13 right-3 z-20 w-60"
                        >
                            {/* Coach step 2 — anchored to the scanner, outside the popup surface */}
                            <AnimatePresence>
                                {coachScan && (
                                    <CoachChip key="coach-scan" arrow="right" className="top-[276px] -left-40">
                                        Hit “Scan the page”
                                    </CoachChip>
                                )}
                            </AnimatePresence>

                            <div className="rounded-2xl border border-slate-800/80 bg-[#0b0f19] p-3 pb-1.5 text-slate-100 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
                                {/* Header: logo + Live/Demo capsule */}
                                <div className="mb-3 flex items-center justify-between">
                                    <div className="flex items-center gap-1.5">
                                        <Image src="/logo.svg" alt="" width={20} height={20} className="rounded-md shadow-sm ring-1 ring-violet-500/20" />
                                        <p className="font-display text-xs font-bold tracking-tight text-white">Remem</p>
                                    </div>
                                    <div
                                        className="relative flex items-center rounded-full border border-amber-500/25 bg-amber-950/20 p-0.5 text-[8px] font-bold uppercase shadow-[0_0_14px_rgba(251,191,36,0.09)]"
                                        title="This embedded popup runs in demo mode"
                                    >
                                        <span aria-hidden className="absolute top-0.5 right-0.5 bottom-0.5 left-[calc(50%+1px)] rounded-full border border-amber-400/35 bg-amber-950/80 shadow-[0_0_16px_rgba(251,191,36,0.3)]" />
                                        <span className="relative z-10 flex items-center gap-1 px-2 py-0.5 tracking-wider text-slate-600">
                                            <span aria-hidden className="size-1 shrink-0 rounded-full bg-slate-700" />
                                            Live
                                        </span>
                                        <span className="relative z-10 flex items-center gap-1 px-2 py-0.5 tracking-wide text-amber-400">
                                            <span aria-hidden className="size-1 shrink-0 animate-pulse rounded-full bg-amber-400 shadow-[0_0_5px_rgba(251,191,36,0.8)]" />
                                            Demo
                                        </span>
                                    </div>
                                </div>

                                {/* Vault ring */}
                                <div aria-hidden className="relative my-2.5 flex items-center justify-center">
                                    <div className="absolute inset-0 scale-75 rounded-full bg-violet-500/5 blur-xl" />
                                    <div className="relative flex size-20 items-center justify-center">
                                        <svg className="absolute inset-0 size-full -rotate-90" viewBox="0 0 100 100">
                                            <circle cx="50" cy="50" r="42" className="fill-none stroke-slate-800/80" strokeWidth="4" />
                                            <circle
                                                cx="50"
                                                cy="50"
                                                r="42"
                                                className="fill-none stroke-violet-500"
                                                strokeWidth="5"
                                                strokeLinecap="round"
                                                strokeDasharray="263.89"
                                                strokeDashoffset={Math.max(0, 263.89 - (Math.min(TOTAL_FACTS, 30) / 30) * 263.89)}
                                            />
                                            <circle cx="50" cy="50" r="47" className="fill-none stroke-violet-500/30" strokeWidth="1.5" strokeDasharray="4 6" />
                                        </svg>
                                        <div className="z-10 flex flex-col items-center justify-center text-center">
                                            <span className="block font-display text-lg leading-none font-extrabold tracking-tight text-white">{TOTAL_FACTS}</span>
                                            <span className="mt-0.5 block text-[6px] font-bold tracking-widest text-slate-400 uppercase">Facts saved</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Stats grid */}
                                <div aria-hidden className="mb-2.5 grid grid-cols-3 gap-1">
                                    {[
                                        { label: 'Identity', count: STATS.identity },
                                        { label: 'Career', count: STATS.career },
                                        { label: 'Answers', count: STATS.answers },
                                    ].map((stat) => (
                                        <div key={stat.label} className="rounded-lg border border-slate-800/80 bg-slate-900/40 p-1.5 text-center">
                                            <span className="block text-[8px] leading-none font-semibold text-slate-400">{stat.label}</span>
                                            <span className="mt-0.5 block font-display text-xs font-bold text-white">{stat.count}</span>
                                        </div>
                                    ))}
                                </div>

                                <p className="mb-2.5 flex items-center justify-center gap-1 text-[9px] text-slate-400">
                                    <span aria-hidden className="size-1 rounded-full bg-amber-500" />
                                    You are in <span className="-ml-0.5 font-medium text-violet-400">Guest Mode</span>
                                </p>

                                {/* Futuristic scanner — the popup's real trigger */}
                                <div className="flex justify-center">
                                    <button
                                        ref={scannerRef}
                                        type="button"
                                        onClick={() => {
                                            if (running) return
                                            if (phase === 'idle') void runScan()
                                            else reset()
                                        }}
                                        disabled={running}
                                        aria-label={phase === 'idle' ? 'Scan the page and fill the form' : running ? 'Scan in progress' : 'Replay the demo'}
                                        className={cn(
                                            'group relative flex size-28 flex-col items-center justify-center overflow-hidden rounded-2xl border bg-slate-950/40 transition-all duration-500 outline-none select-none focus-visible:ring-2 focus-visible:ring-violet-400',
                                            running
                                                ? 'cursor-wait border-violet-500/30 shadow-[0_0_35px_rgba(124,58,237,0.25)]'
                                                : 'border-violet-500/15 shadow-[0_0_20px_rgba(124,58,237,0.06)] hover:border-violet-500/30 hover:shadow-[0_0_35px_rgba(124,58,237,0.25)]',
                                        )}
                                    >
                                        {/* Vignette + grid pattern, as in the extension's scanner */}
                                        <span aria-hidden className="pointer-events-none absolute inset-0 rounded-2xl shadow-[inset_0_0_24px_rgba(4,7,14,0.95)]" />
                                        <span
                                            aria-hidden
                                            className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.05)_1px,transparent_1px)] bg-size-[10px_10px] opacity-50 transition-opacity duration-300 group-hover:opacity-90"
                                        />

                                        {/* Corner brackets */}
                                        <span aria-hidden className="absolute top-2 left-2 size-2.5 border-t-[1.5px] border-l-[1.5px] border-violet-400/50 transition-all duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:border-violet-400" />
                                        <span aria-hidden className="absolute top-2 right-2 size-2.5 border-t-[1.5px] border-r-[1.5px] border-violet-400/50 transition-all duration-300 group-hover:-translate-x-0.5 group-hover:translate-y-0.5 group-hover:border-violet-400" />
                                        <span aria-hidden className="absolute bottom-2 left-2 size-2.5 border-b-[1.5px] border-l-[1.5px] border-violet-400/50 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:border-violet-400" />
                                        <span aria-hidden className="absolute right-2 bottom-2 size-2.5 border-b-[1.5px] border-r-[1.5px] border-violet-400/50 transition-all duration-300 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 group-hover:border-violet-400" />

                                        {/* Laser sweep — visible while scanning, on hover otherwise */}
                                        <span
                                            aria-hidden
                                            className={cn(
                                                'absolute right-2 left-2 h-[1.5px] rounded-full bg-violet-400 shadow-[0_0_8px_rgba(139,92,246,0.9)] blur-[0.5px]',
                                                running ? 'animate-scan-laser' : 'opacity-0 group-hover:animate-scan-laser',
                                            )}
                                        />

                                        {/* Target reticle */}
                                        <span aria-hidden className="pointer-events-none relative flex size-15 items-center justify-center">
                                            <span className="absolute inset-0 animate-scan-spin-slow rounded-full border border-dashed border-violet-400/25 group-hover:border-violet-400/40" />
                                            <span className="absolute size-12 animate-scan-spin-reverse rounded-full border border-dashed border-violet-500/15 group-hover:border-violet-500/30" />
                                            <span className="flex size-8 items-center justify-center rounded-full border border-violet-500/20 bg-slate-950/40 shadow-inner group-hover:border-violet-500/40">
                                                {fillDone ? (
                                                    <RotateCcw className="size-3.5 text-violet-400/80 transition-all duration-300 group-hover:scale-110 group-hover:text-violet-300" />
                                                ) : (
                                                    <ScanSearch
                                                        className={cn('size-3.5 text-violet-400/80 transition-all duration-300 group-hover:scale-110 group-hover:text-violet-300', !running && 'animate-pulse')}
                                                    />
                                                )}
                                            </span>
                                        </span>

                                        <span className="z-10 mt-1.5 font-mono text-[7px] font-semibold tracking-[0.2em] text-slate-400 transition-colors duration-300 group-hover:text-violet-300">
                                            {phase === 'idle' && 'SCAN THE PAGE'}
                                            {phase === 'detecting' && 'SCANNING PAGE'}
                                            {phase === 'generating' && 'MATCHING MEMORY'}
                                            {phase === 'filling' && 'FILLING FORM'}
                                            {fillDone && 'REPLAY DEMO'}
                                        </span>
                                    </button>
                                </div>

                                {/* Footer */}
                                <div className="mt-3 flex items-center justify-center border-t border-slate-800/80 pt-2 text-[9px] text-slate-500">
                                    <span className="flex items-center gap-1 font-medium">
                                        <Settings aria-hidden className="size-2.5" />
                                        Settings
                                    </span>
                                </div>
                                <p className="pt-0.5 pb-0.5 text-center text-[6px] font-semibold tracking-[0.28em] text-slate-600 uppercase">Never repeat yourself</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Status toast — staged exactly like the extension's StatusToast. */}
                <AnimatePresence>
                    {(running || (phase === 'done' && !showBadge)) && (
                        <motion.div
                            key="toast"
                            role="status"
                            initial={reducedMotion ? false : { opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 16 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute right-4 bottom-4 z-20 flex w-64 flex-col gap-2.5 rounded-2xl border border-slate-800/80 bg-slate-950/90 p-3.5 text-xs font-medium text-slate-100 shadow-[0_12px_40px_rgba(0,0,0,0.5)] backdrop-blur-md"
                        >
                            <div className="flex items-start gap-2.5">
                                <div className="mt-0.5 shrink-0">
                                    {running ? (
                                        <div className="flex size-6 items-center justify-center rounded-lg border border-violet-500/20 bg-violet-500/10 text-violet-400">
                                            <Loader2 aria-hidden className="size-3.5 animate-spin" />
                                        </div>
                                    ) : (
                                        <div className="flex size-6 items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
                                            <CheckCircle2 aria-hidden className="size-3.5" />
                                        </div>
                                    )}
                                </div>
                                <div className="min-w-0 flex-1">
                                    <span className="mb-0.5 block text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                                        {phase === 'detecting' && 'Scanning page'}
                                        {phase === 'generating' && 'Matching memory'}
                                        {phase === 'filling' && 'Filling form'}
                                        {phase === 'done' && 'Fill complete'}
                                    </span>
                                    <span className="text-xs leading-normal text-slate-200">
                                        {phase === 'detecting' && 'Searching the page for input fields…'}
                                        {phase === 'generating' && (
                                            <>
                                                Found <span className="font-semibold text-violet-400">5</span> fields — preparing answers…
                                            </>
                                        )}
                                        {phase === 'filling' && (
                                            <>
                                                Writing facts to inputs… <span className="font-semibold text-violet-400">{percent}%</span>
                                            </>
                                        )}
                                        {phase === 'done' && (
                                            <>
                                                Entered <span className="font-semibold text-emerald-400">5</span> of <span className="font-semibold text-slate-300">5</span> facts.
                                            </>
                                        )}
                                    </span>
                                </div>
                            </div>
                            {phase === 'filling' && (
                                <div className="h-1.5 w-full overflow-hidden rounded-full border border-slate-800/40 bg-slate-900">
                                    <div className="h-full rounded-full bg-violet-500 transition-[width] duration-300 ease-out" style={{ width: `${percent}%` }} />
                                </div>
                            )}
                            {phase === 'done' && <p className="border-t border-slate-900 pt-2 pl-8 text-[11px] leading-relaxed text-slate-400">The open answer is an AI draft — review it before you submit.</p>}
                        </motion.div>
                    )}

                    {/* Watching badge — replaces the toast, as in the extension. */}
                    {phase === 'done' && showBadge && (
                        <motion.div
                            key="badge"
                            initial={reducedMotion ? false : { opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 16 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute right-4 bottom-4 z-20 flex items-center gap-2.5 rounded-full border border-slate-800/80 bg-slate-950/90 py-2 pr-2 pl-3 text-xs font-medium text-slate-100 shadow-[0_12px_40px_rgba(0,0,0,0.5)] backdrop-blur-md"
                        >
                            <span aria-hidden className="flex size-2 shrink-0 animate-pulse rounded-full bg-violet-400" />
                            <span className="text-slate-300">Remembering this form</span>
                            <button
                                type="button"
                                onClick={() => setShowBadge(false)}
                                aria-label="Dismiss the watching badge"
                                className="flex size-5 shrink-0 items-center justify-center rounded-full text-slate-500 transition-colors outline-none hover:bg-slate-800 hover:text-slate-200 focus-visible:ring-2 focus-visible:ring-violet-400"
                            >
                                <X aria-hidden className="size-3" />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Submitted state — the one step Remem never performs. */}
                <AnimatePresence>
                    {phase === 'submitted' && (
                        <motion.div
                            key="submitted"
                            initial={reducedMotion ? false : { opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 z-40 flex items-center justify-center bg-background/85 p-6 backdrop-blur-md"
                        >
                            <motion.div
                                initial={reducedMotion ? false : { opacity: 0, y: 16, scale: 0.97 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                                className="flex max-w-sm flex-col items-center gap-3 text-center"
                            >
                                <span className="flex size-14 items-center justify-center rounded-full bg-primary/10">
                                    <CheckCircle2 aria-hidden className="size-7 text-primary" />
                                </span>
                                <p className="font-display text-xl font-bold tracking-tight uppercase">Submitted — by you.</p>
                                <p className="text-sm leading-relaxed text-muted-foreground">
                                    Remem {filledCount > 0 ? `filled ${filledCount} fields and ` : ''}never touched the submit button. It never will.
                                </p>
                                <button
                                    type="button"
                                    onClick={reset}
                                    className="mt-2 flex items-center gap-2 rounded-md border border-border px-5 py-2 font-mono text-xs font-medium tracking-[0.1em] uppercase transition-colors outline-none hover:bg-secondary/60 focus-visible:ring-2 focus-visible:ring-ring"
                                >
                                    <RotateCcw aria-hidden className="size-4" />
                                    Replay demo
                                </button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-muted-foreground">
                <span aria-hidden className="inline-flex size-1.5 rounded-full bg-primary" />
                Interactive demo — click the <span className="font-medium text-foreground">Remem icon</span> in the toolbar to try it. No extension needed.
            </p>
        </div>
    )
}
