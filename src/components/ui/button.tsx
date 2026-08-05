import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

/* Controls speak the instrument's readout voice: mono caps, machined corners. */
const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-mono font-semibold tracking-[0.12em] uppercase transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98]",
    {
        variants: {
            variant: {
                default: 'bg-primary text-primary-foreground hover:shadow-[0_4px_24px_-4px_color-mix(in_oklch,var(--primary)_55%,transparent)] hover:brightness-110',
                secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/70',
                outline: 'border border-border bg-transparent hover:border-primary/50 hover:text-foreground',
                ghost: 'hover:bg-secondary/60',
                link: 'text-primary underline-offset-4 hover:underline',
            },
            size: {
                default: 'h-10 px-5 text-xs',
                sm: 'h-8 px-3.5 text-[11px]',
                lg: 'h-12 px-7 text-sm',
                icon: 'size-10',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
)

function Button({ className, variant, size, asChild = false, ...props }: React.ComponentProps<'button'> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
    const Comp = asChild ? Slot : 'button'
    return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />
}

export { Button, buttonVariants }
