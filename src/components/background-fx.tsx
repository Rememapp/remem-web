'use client'

import { useEffect, useRef } from 'react'

/**
 * "Memory constellation" — the site-wide ambient background. Soft motes drift and
 * twinkle on a fixed canvas, forming faint links when they pass near each other
 * (scattered facts, quietly connecting). Two large blurred glows add color depth.
 *
 * Fixed to the viewport: content scrolls, the constellation keeps its own time.
 * Theme-aware (palette follows the `dark` class), pauses when the tab is hidden,
 * and renders a single static frame for users who prefer reduced motion.
 */

interface Mote {
    x: number
    y: number
    vx: number
    vy: number
    radius: number
    /** Phase offset for the twinkle cycle. */
    phase: number
}

const LINK_DISTANCE = 130
const MAX_MOTES = 90

function palette(dark: boolean) {
    return dark
        ? { mote: [196, 181, 253] as const, link: [167, 139, 250] as const, moteAlpha: 0.55, linkAlpha: 0.14 }
        : { mote: [91, 33, 182] as const, link: [109, 40, 217] as const, moteAlpha: 0.4, linkAlpha: 0.1 }
}

export function BackgroundFx() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const context = canvas.getContext('2d')
        if (!context) return

        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        let colors = palette(document.documentElement.classList.contains('dark'))
        let motes: Mote[] = []
        let width = 0
        let height = 0
        let frame = 0
        let lastTime = 0

        const seed = () => {
            const count = Math.min(MAX_MOTES, Math.round((width * height) / 22000))
            motes = Array.from({ length: count }, () => ({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 16,
                vy: (Math.random() - 0.5) * 16,
                radius: 0.8 + Math.random() * 1.2,
                phase: Math.random() * Math.PI * 2,
            }))
        }

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2)
            width = window.innerWidth
            height = window.innerHeight
            canvas.width = Math.round(width * dpr)
            canvas.height = Math.round(height * dpr)
            context.setTransform(dpr, 0, 0, dpr, 0, 0)
            seed()
            if (reducedMotion) draw(0)
        }

        const draw = (time: number) => {
            context.clearRect(0, 0, width, height)

            const [lr, lg, lb] = colors.link
            for (let i = 0; i < motes.length; i++) {
                for (let j = i + 1; j < motes.length; j++) {
                    const a = motes[i]!
                    const b = motes[j]!
                    const dx = a.x - b.x
                    const dy = a.y - b.y
                    const distance = Math.hypot(dx, dy)
                    if (distance < LINK_DISTANCE) {
                        const alpha = (1 - distance / LINK_DISTANCE) * colors.linkAlpha
                        context.strokeStyle = `rgba(${lr},${lg},${lb},${alpha})`
                        context.lineWidth = 1
                        context.beginPath()
                        context.moveTo(a.x, a.y)
                        context.lineTo(b.x, b.y)
                        context.stroke()
                    }
                }
            }

            const [mr, mg, mb] = colors.mote
            for (const mote of motes) {
                const twinkle = 0.65 + 0.35 * Math.sin(mote.phase + time / 1400)
                context.fillStyle = `rgba(${mr},${mg},${mb},${colors.moteAlpha * twinkle})`
                context.beginPath()
                context.arc(mote.x, mote.y, mote.radius, 0, Math.PI * 2)
                context.fill()
            }
        }

        const tick = (time: number) => {
            const delta = lastTime ? Math.min((time - lastTime) / 1000, 0.05) : 0
            lastTime = time

            for (const mote of motes) {
                mote.x += mote.vx * delta
                mote.y += mote.vy * delta
                // Wrap around the edges so the field never empties out.
                if (mote.x < -10) mote.x = width + 10
                if (mote.x > width + 10) mote.x = -10
                if (mote.y < -10) mote.y = height + 10
                if (mote.y > height + 10) mote.y = -10
            }

            draw(time)
            frame = requestAnimationFrame(tick)
        }

        const start = () => {
            if (reducedMotion || frame) return
            lastTime = 0
            frame = requestAnimationFrame(tick)
        }

        const stop = () => {
            cancelAnimationFrame(frame)
            frame = 0
        }

        const onVisibility = () => {
            if (document.hidden) stop()
            else start()
        }

        // Follow theme switches — next-themes toggles the `dark` class on <html>.
        const themeObserver = new MutationObserver(() => {
            colors = palette(document.documentElement.classList.contains('dark'))
            if (reducedMotion) draw(0)
        })
        themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

        resize()
        start()
        window.addEventListener('resize', resize)
        document.addEventListener('visibilitychange', onVisibility)

        return () => {
            stop()
            themeObserver.disconnect()
            window.removeEventListener('resize', resize)
            document.removeEventListener('visibilitychange', onVisibility)
        }
    }, [])

    return (
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
            {/* Ambient color glows, drifting on their own slow clocks */}
            <div className="absolute -top-56 -left-56 size-[38rem] animate-drift-a rounded-full bg-violet-500/10 blur-[140px] dark:bg-violet-500/15" />
            <div className="absolute -right-56 -bottom-64 size-[42rem] animate-drift-b rounded-full bg-cyan-500/10 blur-[150px] dark:bg-cyan-400/10" />
            {/* The constellation */}
            <canvas ref={canvasRef} className="absolute inset-0" />
        </div>
    )
}
