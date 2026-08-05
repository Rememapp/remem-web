import { Brain, Cloud, Download, FileSearch, MousePointerClick, PenLine, ScanSearch, Search, UserRound, Eye, type LucideIcon } from 'lucide-react'

/**
 * Features are classified by channel, matching the site's track inks:
 * memory (violet), match (cyan), ai (amber), control (red boundary).
 */
export type FeatureChannel = 'memory' | 'match' | 'ai' | 'control'

export interface Feature {
    icon: LucideIcon
    id: string
    title: string
    description: string
    channel: FeatureChannel
    /** Synthetic readout lines for the feature explorer's live preview panel. */
    visual: string[]
}

export interface FeatureGroup {
    channel: FeatureChannel
    label: string
    caption: string
    features: Feature[]
}

export const features: Feature[] = [
    {
        icon: UserRound,
        id: 'memory.profile',
        title: 'Profile memory',
        description: 'Your employment history, education, and addresses live in structured profiles you can read, edit, and delete.',
        channel: 'memory',
        visual: ['Full legal name · Alex Rivera', 'Most recent employer · Northwind Labs', 'Notice period · 30 days'],
    },
    {
        icon: Brain,
        id: 'memory.recall',
        title: 'Browser memory',
        description: 'A memory layer that follows you across sites, so the answer you gave on one form is ready on the next.',
        channel: 'memory',
        visual: ['jobs.greenhouse.io → synced', 'jobs.lever.co → synced', 'Same facts, every site'],
    },
    {
        icon: Cloud,
        id: 'memory.backup',
        title: 'Google Drive backup',
        description: 'Off by default. Encrypted on your device, then uploaded to your own Google Drive — never to our servers.',
        channel: 'memory',
        visual: ['Encrypting on device…', 'Upload → your Google Drive', 'Remem servers · no route'],
    },
    {
        icon: Download,
        id: 'memory.exit',
        title: 'Export anytime',
        description: 'Your memory is yours — export all of it in a readable format, or delete everything in one action.',
        channel: 'memory',
        visual: ['Export → remem-memory.json', 'All facts included', 'Delete everything · one click'],
    },
    {
        icon: ScanSearch,
        id: 'match.detect',
        title: 'Smart form detection',
        description: 'Remem reads a form the way you do — it maps every field of an application before touching any of them.',
        channel: 'match',
        visual: ['Scanning application…', '42 fields mapped', '0 fields touched yet'],
    },
    {
        icon: FileSearch,
        id: 'match.synonyms',
        title: 'Cross-site context',
        description: 'Remem understands that “Given name”, “First name”, and “Legal first name” are the same question asked three ways.',
        channel: 'match',
        visual: ['“Given name” → Alex', '“Legal first name” → Alex', 'Same question, one answer'],
    },
    {
        icon: Search,
        id: 'match.search',
        title: 'Fast search',
        description: 'Every fact you have stored, one keystroke away. Find and copy anything without leaving the page.',
        channel: 'match',
        visual: ['⌘K → search memory', '“visa” · 3 results', 'Copied to clipboard'],
    },
    {
        icon: PenLine,
        id: 'ai.write',
        title: 'AI writing assistant',
        description: 'Cover letters, motivation answers, and essays drafted from your real history — only when a question is genuinely open-ended.',
        channel: 'ai',
        visual: ['Prompt · “Why us?”', 'Drafting from your history…', 'Draft ready — edit before use'],
    },
    {
        icon: Eye,
        id: 'control.review',
        title: 'Manual review',
        description: 'Every suggestion is shown before a single field changes. Nothing is filled — and nothing is ever submitted — without you.',
        channel: 'control',
        visual: ['12 matches ready', '1 draft to review', 'Nothing filled yet'],
    },
    {
        icon: MousePointerClick,
        id: 'control.fill',
        title: 'One-click fill',
        description: 'Review the suggestions, click once, and a forty-field application is done. You still press submit.',
        channel: 'control',
        visual: ['Filling 13 fields…', 'Done in 1.2s', 'Submit button · untouched'],
    },
]

export const featureGroups: FeatureGroup[] = [
    {
        channel: 'memory',
        label: 'Memory',
        caption: 'Facts, stored on your device and owned by you.',
        features: features.filter((feature) => feature.channel === 'memory'),
    },
    {
        channel: 'match',
        label: 'Matching',
        caption: 'Deterministic field understanding — no model guesses a fact.',
        features: features.filter((feature) => feature.channel === 'match'),
    },
    {
        channel: 'ai',
        label: 'AI writing',
        caption: 'Drafts for open-ended questions. Never decisions.',
        features: features.filter((feature) => feature.channel === 'ai'),
    },
    {
        channel: 'control',
        label: 'Control',
        caption: 'Review before fill, and the submit stays yours.',
        features: features.filter((feature) => feature.channel === 'control'),
    },
]
