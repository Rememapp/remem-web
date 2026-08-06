import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
    'inline-flex w-fit shrink-0 items-center justify-center gap-1.5 rounded-sm border px-2.5 py-1 font-mono text-[10px] font-semibold tracking-[0.16em] uppercase whitespace-nowrap [&>svg]:size-3',
    {
        variants: {
            variant: {
                default: 'border-transparent bg-primary text-primary-foreground',
                secondary: 'border-transparent bg-secondary text-secondary-foreground',
                outline: 'border-border text-muted-foreground',
                accent: 'border-primary/30 bg-accent text-accent-foreground',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    },
)

function Badge({ className, variant, ...props }: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants>) {
    return <span data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
