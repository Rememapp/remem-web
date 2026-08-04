import { Check, Sparkles } from 'lucide-react'
import Image from 'next/image'

interface MockField {
    label: string
    value: string
    ai?: boolean
}

const fields: MockField[] = [
    { label: 'Full legal name', value: 'Alex Rivera' },
    { label: 'Email address', value: 'alex@rivera.dev' },
    { label: 'Most recent employer', value: 'Northwind Labs' },
    { label: 'Years of experience', value: '7' },
    { label: 'Why do you want this role?', value: 'Drafted from your history — review before filling', ai: true },
]

/**
 * Stylized browser window showing Remem reviewing a job application.
 * Pure markup — decorative, hidden from screen readers.
 */
export function BrowserMockup() {
    return (
        <div aria-hidden className="relative mx-auto w-full max-w-3xl select-none">
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[0_24px_80px_rgba(0,0,0,0.25)]">
                {/* Window chrome */}
                <div className="flex items-center gap-3 border-b border-border px-4 py-3">
                    <div className="flex gap-1.5">
                        <span className="size-3 rounded-full bg-rose-400/80" />
                        <span className="size-3 rounded-full bg-amber-400/80" />
                        <span className="size-3 rounded-full bg-emerald-400/80" />
                    </div>
                    <div className="mx-auto flex h-7 w-full max-w-sm items-center justify-center rounded-full bg-secondary text-xs text-muted-foreground">jobs.example.com/apply/senior-engineer</div>
                    <Image src="/logo.svg" alt="" width={18} height={18} />
                </div>

                {/* Form body */}
                <div className="grid gap-0 p-6 sm:grid-cols-[1fr_240px] sm:gap-6">
                    <div className="space-y-4">
                        <div className="space-y-1">
                            <div className="h-4 w-44 rounded bg-secondary" />
                            <div className="h-3 w-64 rounded bg-secondary/60" />
                        </div>
                        {fields.map((field) => (
                            <div key={field.label} className="space-y-1.5">
                                <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">{field.label}</p>
                                <div className="flex items-center justify-between gap-2 rounded-xl border border-primary/25 bg-primary/[0.04] px-3.5 py-2.5 text-sm">
                                    <span className={field.ai ? 'text-muted-foreground italic' : 'text-foreground'}>{field.value}</span>
                                    {field.ai ? <Sparkles className="size-3.5 shrink-0 text-violet-500" /> : <Check className="size-3.5 shrink-0 text-emerald-500" />}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Remem review panel */}
                    <div className="mt-6 h-fit rounded-xl border border-border bg-background p-4 sm:mt-0">
                        <div className="flex items-center gap-2">
                            <Image src="/logo.svg" alt="" width={16} height={16} />
                            <p className="text-sm font-semibold">Remem</p>
                            <span className="ml-auto inline-flex size-2 rounded-full bg-emerald-500" />
                        </div>
                        <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                            12 fields matched from your profile.
                            <br />1 open question drafted for review.
                        </p>
                        <div className="mt-4 space-y-2">
                            <div className="rounded-full bg-primary px-4 py-2 text-center text-xs font-medium text-primary-foreground">Review &amp; fill</div>
                            <div className="rounded-full border border-border px-4 py-2 text-center text-xs font-medium text-muted-foreground">Dismiss</div>
                        </div>
                        <p className="mt-4 border-t border-border pt-3 text-[11px] leading-snug text-muted-foreground">Nothing is submitted. That button is still yours.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
