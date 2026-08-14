import { Rocket } from 'lucide-react'

import { Badge } from '@/components/ui/badge'

export function EarlyAccessBanner() {
    return (
        <div className="relative mb-10 overflow-hidden rounded-xl border border-primary/20 bg-card/60 p-5 backdrop-blur-sm sm:p-6">
            <div className="flex items-start gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary">
                    <Rocket className="size-5" />
                </div>
                <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                        <Badge variant="accent" className="gap-1.5">
                            <span aria-hidden className="size-1.5 bg-primary" />
                            Early Access
                        </Badge>
                        <span className="font-mono text-xs text-muted-foreground tnum">Active Beta</span>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                        Remem is live on the Chrome Web Store and still in active beta, focused on job applications — Greenhouse, Lever, Workday, and Ashby. You may occasionally hit rough edges as
                        we keep refining it.
                    </p>
                </div>
            </div>
        </div>
    )
}
