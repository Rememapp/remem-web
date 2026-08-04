'use client'

import { motion, useReducedMotion, type Variants } from 'motion/react'
import type { ReactNode } from 'react'

const EASE = [0.16, 1, 0.3, 1] as const

interface RevealProps {
    children: ReactNode
    className?: string
    /** Seconds to wait before animating in. */
    delay?: number
    /** Slide direction; 'none' fades only. */
    from?: 'up' | 'down' | 'none'
    /** Animate immediately on mount instead of on scroll into view. */
    immediate?: boolean
}

/** Fade/slide-in wrapper. Renders content statically for users who prefer reduced motion. */
export function Reveal({ children, className, delay = 0, from = 'up', immediate = false }: RevealProps) {
    const reducedMotion = useReducedMotion()

    if (reducedMotion) {
        return <div className={className}>{children}</div>
    }

    const offset = from === 'none' ? 0 : from === 'up' ? 24 : -24

    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: offset }}
            {...(immediate ? { animate: { opacity: 1, y: 0 } } : { whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-80px' } })}
            transition={{ duration: 0.7, delay, ease: EASE }}
        >
            {children}
        </motion.div>
    )
}

interface StaggerProps {
    children: ReactNode
    className?: string
    /** Seconds between each child's entrance. */
    interval?: number
}

const staggerItem: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
}

/** Staggers direct <StaggerItem> children into view on scroll. */
export function Stagger({ children, className, interval = 0.08 }: StaggerProps) {
    const reducedMotion = useReducedMotion()

    if (reducedMotion) {
        return <div className={className}>{children}</div>
    }

    return (
        <motion.div className={className} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} transition={{ staggerChildren: interval }}>
            {children}
        </motion.div>
    )
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
    const reducedMotion = useReducedMotion()

    if (reducedMotion) {
        return <div className={className}>{children}</div>
    }

    return (
        <motion.div className={className} variants={staggerItem}>
            {children}
        </motion.div>
    )
}
