import type { ReactNode } from 'react'

import { Reveal } from '@/components/motion/reveal'

interface PageHeaderProps {
    title: string
    description?: ReactNode
}

export function PageHeader({ title, description }: PageHeaderProps) {
    return (
        <Reveal immediate from="down" className="container-page flex flex-col items-center pt-36 pb-16 text-center md:pt-40">
            <h1 className="max-w-2xl font-display text-4xl font-bold tracking-tight text-balance uppercase md:text-5xl">{title}</h1>
            {description ? <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">{description}</p> : null}
        </Reveal>
    )
}
