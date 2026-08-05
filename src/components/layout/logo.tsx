import Image from 'next/image'
import Link from 'next/link'

import { SquareDot } from '@/components/section-heading'
import { cn } from '@/lib/utils'

export function Logo({ className }: { className?: string }) {
    return (
        <Link href="/" aria-label="Remem home" className={cn('flex items-center gap-2.5 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring', className)}>
            <Image src="/logo.svg" alt="" width={26} height={26} priority />
            <span className="font-display text-xl font-bold tracking-tight">
                Remem
                <SquareDot className="size-[0.16em]" />
            </span>
        </Link>
    )
}
