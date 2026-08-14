import Image from 'next/image'
import Link from 'next/link'

import { cn } from '@/lib/utils'

export function Logo({ className }: { className?: string }) {
    return (
        <Link href="/" aria-label="Remem home — in beta" className={cn('flex items-center gap-2.5 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring', className)}>
            <Image src="/logo.svg" alt="" width={26} height={26} priority />
            <span className="flex items-start gap-1.5">
                <span className="font-display text-xl font-bold tracking-tight">Remem</span>
                <span className="mt-0.5 rounded-sm border border-steel/35 px-1 py-px font-mono text-[9px] leading-[1.4] font-semibold tracking-[0.14em] text-steel uppercase">Beta</span>
            </span>
        </Link>
    )
}
