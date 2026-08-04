import type { ReactNode } from 'react'

import { Reveal } from '@/components/motion/reveal'
import { Badge } from '@/components/ui/badge'

interface PageHeaderProps {
    eyebrow?: string
    title: string
    description?: ReactNode
}

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
    return (
        <Reveal immediate from="down" className="container-page flex flex-col items-center pt-36 pb-16 text-center md:pt-40">
            {eyebrow ? <Badge variant="accent">{eyebrow}</Badge> : null}
            <h1 className="mt-5 max-w-2xl font-display text-4xl font-bold tracking-tight text-balance md:text-5xl">{title}</h1>
            {description ? <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">{description}</p> : null}
        </Reveal>
    )
}
