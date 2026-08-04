import type { ReactNode } from 'react'

import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface SectionHeadingProps {
    eyebrow?: string
    title: string
    description?: ReactNode
    align?: 'center' | 'left'
    className?: string
}

export function SectionHeading({ eyebrow, title, description, align = 'center', className }: SectionHeadingProps) {
    return (
        <div className={cn('flex max-w-2xl flex-col gap-4', align === 'center' ? 'mx-auto items-center text-center' : 'items-start text-left', className)}>
            {eyebrow ? <Badge variant="accent">{eyebrow}</Badge> : null}
            <h2 className="font-display text-3xl font-bold tracking-tight text-balance md:text-4xl">{title}</h2>
            {description ? <p className="text-base leading-relaxed text-muted-foreground text-pretty md:text-lg">{description}</p> : null}
        </div>
    )
}
