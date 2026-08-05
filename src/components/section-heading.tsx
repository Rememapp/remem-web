import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

/** The world's signature full stop: a small square of signal ink. */
export function SquareDot({ className }: { className?: string }) {
    return <span aria-hidden className={cn('ml-[0.12em] inline-block size-[0.13em] bg-primary align-baseline', className)} />
}

interface SectionHeadingProps {
    title: string
    description?: ReactNode
    align?: 'center' | 'left'
    className?: string
}

export function SectionHeading({ title, description, align = 'center', className }: SectionHeadingProps) {
    return (
        <div className={cn('flex max-w-2xl flex-col gap-4', align === 'center' ? 'mx-auto items-center text-center' : 'items-start text-left', className)}>
            <h2 className="font-display text-3xl font-bold tracking-tight text-balance uppercase md:text-4xl">
                {title}
                <SquareDot />
            </h2>
            {description ? <p className="text-base leading-relaxed text-muted-foreground text-pretty md:text-lg">{description}</p> : null}
        </div>
    )
}
