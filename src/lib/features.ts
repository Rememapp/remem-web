import { Brain, Cloud, FileSearch, Lock, MousePointerClick, PenLine, ScanSearch, Search, UserRound, Eye, type LucideIcon } from 'lucide-react'

export interface Feature {
    icon: LucideIcon
    title: string
    description: string
    /** Tailwind classes tinting the icon chip — one hue per feature, no gradients. */
    tint: string
}

export const features: Feature[] = [
    {
        icon: ScanSearch,
        title: 'Smart form detection',
        description: 'Remem reads a form the way you do — it knows an ATS from a checkout and maps every field before touching any of them.',
        tint: 'bg-sky-500/10 text-sky-600 dark:text-sky-400',
    },
    {
        icon: PenLine,
        title: 'AI writing assistant',
        description: 'Cover letters, motivation answers, and essays drafted from your real history — only when a question is genuinely open-ended.',
        tint: 'bg-violet-500/10 text-violet-600 dark:text-violet-400',
    },
    {
        icon: UserRound,
        title: 'Profile memory',
        description: 'Your employment history, education, and addresses live in structured profiles you can read, edit, and delete.',
        tint: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    },
    {
        icon: Brain,
        title: 'Browser memory',
        description: 'A memory layer that follows you across sites, so the answer you gave on one form is ready on the next.',
        tint: 'bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400',
    },
    {
        icon: Cloud,
        title: 'Optional cloud backup',
        description: 'Off by default. Turn it on and your data is encrypted before it leaves your device — we can never read it.',
        tint: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400',
    },
    {
        icon: Lock,
        title: 'Encrypted storage',
        description: 'Everything at rest is encrypted on your device. Your passport number is not a plaintext string in a database.',
        tint: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    },
    {
        icon: Eye,
        title: 'Manual review',
        description: 'Every suggestion is shown before a single field changes. Nothing is filled — and nothing is ever submitted — without you.',
        tint: 'bg-rose-500/10 text-rose-600 dark:text-rose-400',
    },
    {
        icon: FileSearch,
        title: 'Cross-site context',
        description: 'Remem understands that “Given name”, “First name”, and “Legal first name” are the same question asked three ways.',
        tint: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
    },
    {
        icon: Search,
        title: 'Fast search',
        description: 'Every fact you have stored, one keystroke away. Find and copy anything without leaving the page.',
        tint: 'bg-teal-500/10 text-teal-600 dark:text-teal-400',
    },
    {
        icon: MousePointerClick,
        title: 'One-click fill',
        description: 'Review the suggestions, click once, and a forty-field application is done. You still press submit.',
        tint: 'bg-orange-500/10 text-orange-600 dark:text-orange-400',
    },
]
