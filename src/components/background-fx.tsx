/**
 * "Detector field" — the site-wide ambient background of the Held Event world.
 * A cross-section of detector rings sits off the right edge of the viewport,
 * rotating imperceptibly slowly (opposing directions per layer); a faint
 * dot-grid lattice covers the ground. Pure SVG geometry rendered on the server:
 * no canvas, no JS, and the global reduced-motion rule freezes the rotation.
 *
 * Each rotating layer is its own <svg> so the animation is a composited
 * transform on an HTML element — rotating a <g> inside one SVG would repaint
 * the whole vector every frame.
 *
 * Fixed to the viewport: content scrolls, the instrument keeps its own time.
 * Colors ride the theme tokens, so light mode renders the printed-plot version.
 */

const SECTION_CLASS = 'absolute top-1/2 -right-[28rem] size-[75rem] max-w-none -translate-y-1/2 md:-right-[30rem]'

export function BackgroundFx() {
    return (
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
            {/* Dot-grid lattice over the whole ground */}
            <svg className="absolute inset-0 size-full opacity-[0.35] dark:opacity-25" role="presentation">
                <defs>
                    <pattern id="bg-dot-grid" width="28" height="28" patternUnits="userSpaceOnUse">
                        <circle cx="1" cy="1" r="1" fill="var(--steel)" opacity="0.35" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#bg-dot-grid)" />
            </svg>

            {/* Detector cross-section, anchored off the right edge.
                translate-y comes from the wrapper so the svg's own animated
                rotation composes cleanly. */}
            <div className={SECTION_CLASS}>
                {/* Inner tracker — slow clockwise */}
                <svg viewBox="0 0 1200 1200" className="absolute inset-0 size-full animate-ring-slow" role="presentation" fill="none" stroke="var(--steel)">
                    <circle cx="600" cy="600" r="120" strokeWidth="1" strokeDasharray="42 16" opacity="0.28" />
                    <circle cx="600" cy="600" r="156" strokeWidth="1" strokeDasharray="30 22" opacity="0.22" />
                    <circle cx="600" cy="600" r="196" strokeWidth="14" strokeDasharray="2 18" opacity="0.16" />
                </svg>
                {/* Mid layers — slower, counter-rotating */}
                <svg viewBox="0 0 1200 1200" className="absolute inset-0 size-full animate-ring-slower" role="presentation" fill="none" stroke="var(--steel)">
                    <circle cx="600" cy="600" r="268" strokeWidth="1" strokeDasharray="64 20" opacity="0.2" />
                    <circle cx="600" cy="600" r="330" strokeWidth="30" strokeDasharray="40 10" opacity="0.1" />
                    <circle cx="600" cy="600" r="384" strokeWidth="1" strokeDasharray="6 14" opacity="0.2" />
                </svg>
                {/* Calorimeter barrel + beamline crosshair — static */}
                <svg viewBox="0 0 1200 1200" className="absolute inset-0 size-full" role="presentation" fill="none" stroke="var(--steel)">
                    <circle cx="600" cy="600" r="470" strokeWidth="72" strokeDasharray="52 8" opacity="0.07" />
                    <circle cx="600" cy="600" r="540" strokeWidth="1" strokeDasharray="120 24" opacity="0.16" />
                    <g opacity="0.3">
                        <line x1="588" y1="600" x2="576" y2="600" strokeWidth="1" />
                        <line x1="612" y1="600" x2="624" y2="600" strokeWidth="1" />
                        <line x1="600" y1="588" x2="600" y2="576" strokeWidth="1" />
                        <line x1="600" y1="612" x2="600" y2="624" strokeWidth="1" />
                        <circle cx="600" cy="600" r="4" strokeWidth="1" />
                    </g>
                </svg>
            </div>

            {/* Small survey reticle, upper left — asymmetry against the big section */}
            <svg viewBox="0 0 120 120" className="absolute top-24 left-[6%] size-28 opacity-20 md:top-32" role="presentation" fill="none" stroke="var(--steel)">
                <circle cx="60" cy="60" r="44" strokeWidth="1" strokeDasharray="10 8" />
                <circle cx="60" cy="60" r="20" strokeWidth="1" opacity="0.7" />
                <line x1="60" y1="4" x2="60" y2="28" strokeWidth="1" />
                <line x1="60" y1="92" x2="60" y2="116" strokeWidth="1" />
                <line x1="4" y1="60" x2="28" y2="60" strokeWidth="1" />
                <line x1="92" y1="60" x2="116" y2="60" strokeWidth="1" />
            </svg>
        </div>
    )
}
