'use client'

import { motion, useReducedMotion } from 'motion/react'
import type { CSSProperties } from 'react'

import { cn } from '@/lib/utils'

/**
 * The hero's held event: one page scan frozen mid-bloom. Fact tracks spray out
 * of the scan vertex — both ways, as a real collision does — classified by
 * ink: violet identity, cyan career, amber for the one AI-drafted answer.
 * Low-momentum tracks curl; dotted secondaries shadow the main lines; ghost
 * tracks show the synonym hypotheses the matcher resolved. At the right edge
 * the calorimeter clusters stack against the red dashed wall: the submit
 * boundary no track ever crosses. One violet track dives off the bottom edge
 * toward the live demo below — the event's source.
 *
 * Pure geometry (SVG paths + positioned readout chips); decorative twin of the
 * interactive demo, so it stays aria-hidden.
 */

const EASE = [0.16, 1, 0.3, 1] as const

interface Track {
    d: string
    stroke: string
    /** Dash pattern for ghost/AI/secondary tracks. */
    dash?: string
    width?: number
    delay: number
    opacity?: number
    /** Skip the phosphor glow (secondaries, ghosts, backsplash). */
    plain?: boolean
}

const TRACKS: Track[] = [
    // Identity — violet, tight energetic curves
    { d: 'M140,290 Q260,175 468,86', stroke: 'var(--primary)', delay: 0.1 },
    { d: 'M140,290 Q320,140 552,158', stroke: 'var(--primary)', delay: 0.2 },
    { d: 'M140,290 Q360,200 596,196', stroke: 'var(--primary)', delay: 0.3, opacity: 0.7 },
    // The dive toward the live demo below — the event's source
    { d: 'M140,290 Q240,430 330,558', stroke: 'var(--primary)', delay: 0.35, opacity: 0.8 },
    // Low-momentum curls
    { d: 'M140,290 c30,-50 80,-60 100,-30 c18,26 -8,54 -34,44 c-22,-8 -18,-38 4,-44', stroke: 'var(--primary)', delay: 0.3, opacity: 0.6, width: 1.5, plain: true },
    { d: 'M140,290 c20,42 62,56 80,30 c14,-20 -6,-42 -26,-34 c-16,7 -12,30 8,30', stroke: 'var(--track-career)', delay: 0.4, opacity: 0.55, width: 1.5, plain: true },
    // Career — cyan, stiffer, longer
    { d: 'M140,290 Q330,252 502,242', stroke: 'var(--track-career)', delay: 0.15 },
    { d: 'M140,290 Q292,362 450,416', stroke: 'var(--track-career)', delay: 0.25 },
    { d: 'M140,290 Q380,318 596,308', stroke: 'var(--track-career)', delay: 0.35, opacity: 0.7 },
    // Dotted secondaries
    { d: 'M140,290 Q300,96 520,58', stroke: 'var(--primary)', dash: '1.5 7', width: 1.25, delay: 0.4, opacity: 0.6, plain: true },
    { d: 'M140,290 Q346,420 560,432', stroke: 'var(--track-career)', dash: '1.5 7', width: 1.25, delay: 0.45, opacity: 0.6, plain: true },
    { d: 'M140,290 Q420,260 596,252', stroke: 'var(--track-career)', dash: '1.5 7', width: 1.25, delay: 0.5, opacity: 0.5, plain: true },
    // AI answer — amber, dashed: a draft, not a fact
    { d: 'M140,290 Q232,424 376,498', stroke: 'var(--track-answer)', dash: '7 7', delay: 0.35 },
    { d: 'M140,290 Q272,468 430,528', stroke: 'var(--track-answer)', dash: '1.5 6', width: 1.25, delay: 0.5, opacity: 0.55, plain: true },
    // Backsplash — a collision sprays both ways
    { d: 'M140,290 Q104,204 66,152', stroke: 'var(--primary)', width: 1.5, delay: 0.45, opacity: 0.5, plain: true },
    { d: 'M140,290 Q96,342 44,378', stroke: 'var(--track-career)', width: 1.5, delay: 0.5, opacity: 0.45, plain: true },
    { d: 'M140,290 Q112,262 58,238', stroke: 'var(--steel)', width: 1, delay: 0.55, opacity: 0.5, plain: true },
    // Ghost hypotheses — the synonym labels the matcher collapsed into one fact
    { d: 'M140,290 Q282,148 468,78', stroke: 'var(--steel)', dash: '3 7', width: 1, delay: 0.5, opacity: 0.55, plain: true },
    { d: 'M140,290 Q246,214 466,96', stroke: 'var(--steel)', dash: '3 7', width: 1, delay: 0.55, opacity: 0.55, plain: true },
]

/** Calorimeter clusters — energy stacked against the boundary, never through it. */
const CALORIMETER_BARS: Array<{ y: number; w: number }> = [
    { y: 96, w: 26 },
    { y: 104, w: 38 },
    { y: 112, w: 18 },
    { y: 120, w: 30 },
    { y: 210, w: 34 },
    { y: 218, w: 20 },
    { y: 226, w: 40 },
    { y: 234, w: 14 },
    { y: 242, w: 26 },
    { y: 318, w: 22 },
    { y: 326, w: 34 },
    { y: 334, w: 16 },
    { y: 400, w: 28 },
    { y: 408, w: 18 },
]

interface Chip {
    label: string
    value: string
    tone: 'identity' | 'career' | 'answer' | 'boundary'
    style: CSSProperties
    delay: number
}

const TONE = {
    identity: 'border-primary/40 text-primary',
    career: 'border-track-career/40 text-track-career',
    answer: 'border-track-answer/40 text-track-answer',
    boundary: 'border-boundary/40 text-boundary',
} as const

const CHIPS: Chip[] = [
    { label: 'identity.name', value: 'Alex Rivera', tone: 'identity', style: { left: '73%', top: '15%' }, delay: 0.4 },
    { label: 'identity.email', value: 'alex@rivera.dev', tone: 'identity', style: { left: '82%', top: '28%' }, delay: 0.5 },
    { label: 'career.employer', value: 'Northwind Labs', tone: 'career', style: { left: '78.5%', top: '43%' }, delay: 0.45 },
    { label: 'career.experience', value: '7 years', tone: 'career', style: { left: '70%', top: '74.5%' }, delay: 0.55 },
    { label: 'answers.why_role', value: 'AI draft — you review', tone: 'answer', style: { left: '59%', top: '89%' }, delay: 0.6 },
]

export function EventBloom({ className }: { className?: string }) {
    const reducedMotion = useReducedMotion()

    const draw = (delay: number) =>
        reducedMotion
            ? {}
            : {
                  initial: { pathLength: 0, opacity: 0 },
                  animate: { pathLength: 1, opacity: 1 },
                  transition: { pathLength: { duration: 1.1, delay, ease: EASE }, opacity: { duration: 0.2, delay } },
              }

    const appear = (delay: number) =>
        reducedMotion
            ? {}
            : {
                  initial: { opacity: 0, y: 6 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.5, delay, ease: EASE },
              }

    return (
        <div aria-hidden className={cn('relative aspect-8/7 w-full select-none', className)}>
            <svg viewBox="0 0 640 560" fill="none" className="absolute inset-0 size-full">
                {/* Detector layers around the vertex */}
                <g stroke="var(--steel)" opacity="0.85">
                    <circle cx="140" cy="290" r="56" strokeWidth="1" strokeDasharray="20 10" opacity="0.5" />
                    <circle cx="140" cy="290" r="96" strokeWidth="1" strokeDasharray="6 12" opacity="0.4" />
                    <circle cx="140" cy="290" r="140" strokeWidth="10" strokeDasharray="2 14" opacity="0.3" />
                    <circle cx="140" cy="290" r="176" strokeWidth="12" strokeDasharray="24 10" opacity="0.18" />
                    <circle cx="140" cy="290" r="210" strokeWidth="1" strokeDasharray="40 18" opacity="0.3" />
                </g>

                {/* Tracks — phosphor glow on the main lines only */}
                {TRACKS.map((track) => (
                    <motion.path
                        key={track.d}
                        d={track.d}
                        stroke={track.stroke}
                        strokeWidth={track.width ?? 2.25}
                        strokeDasharray={track.dash}
                        strokeLinecap="round"
                        opacity={track.opacity ?? 0.95}
                        style={track.plain ? undefined : { filter: `drop-shadow(0 0 6px ${track.stroke})` }}
                        {...draw(track.delay)}
                    />
                ))}

                {/* Scan vertex */}
                <g stroke="var(--foreground)" opacity="0.9">
                    <circle cx="140" cy="290" r="4" fill="var(--primary)" stroke="none" />
                    <line x1="126" y1="290" x2="116" y2="290" strokeWidth="1" />
                    <line x1="154" y1="290" x2="164" y2="290" strokeWidth="1" />
                    <line x1="140" y1="276" x2="140" y2="266" strokeWidth="1" />
                    <line x1="140" y1="304" x2="140" y2="314" strokeWidth="1" />
                </g>

                {/* The submit boundary — energy stacks against the wall, never through it */}
                <motion.g {...appear(0.6)}>
                    <line x1="608" y1="48" x2="608" y2="470" stroke="var(--boundary)" strokeWidth="2" strokeDasharray="8 6" />
                    {CALORIMETER_BARS.map((bar) => (
                        <rect key={bar.y} x={602 - bar.w} y={bar.y} width={bar.w} height="5" fill="var(--boundary)" opacity={0.4 + (bar.w / 40) * 0.45} />
                    ))}
                </motion.g>
            </svg>

            {/* Pinned readout labels — md+ only; the geometry carries the phones */}
            {CHIPS.map((chip) => (
                <motion.div key={chip.label} className="absolute hidden -translate-x-1/2 -translate-y-1/2 md:block" style={chip.style} {...appear(chip.delay)}>
                    <div className={cn('rounded-sm border bg-card/95 px-2.5 py-1.5 shadow-[0_6px_20px_-6px_rgba(0,0,0,0.4)]', TONE[chip.tone])}>
                        <p className="font-mono text-[10px] leading-none font-semibold tracking-widest">{chip.label}</p>
                        <p className="mt-1 text-xs leading-none text-foreground">{chip.value}</p>
                    </div>
                </motion.div>
            ))}

            {/* Boundary label */}
            <motion.div className="absolute right-0 bottom-[4%] hidden md:block" {...appear(0.7)}>
                <div className="rounded-sm border border-boundary/40 bg-card/95 px-2.5 py-1.5">
                    <p className="font-mono text-[10px] leading-none font-semibold tracking-widest text-boundary">form.submit</p>
                    <p className="mt-1 text-xs leading-none text-foreground">no route — always yours</p>
                </div>
            </motion.div>
        </div>
    )
}
