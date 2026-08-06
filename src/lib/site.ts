export const siteConfig = {
    name: 'Remem',
    tagline: 'Never repeat yourself.',
    description: 'Remem is a privacy-first browser memory. Fill your information once, review before it fills any form, and keep every byte of your data under your control.',
    url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://remem.itssvk.dev',
    email: 'hello@remem.itssvk.dev',
    links: {
        twitter: 'https://x.com/ShouvikMohanta',
        github: 'https://github.com/ItsSVK/remem-web',
        roadmap: '/changelog',
    },
    keywords: [
        'browser autofill alternative',
        'browser memory',
        'AI form assistant',
        'job application helper',
        'form filling extension',
        'browser productivity',
        'privacy-first browser extension',
        'local-first productivity tool',
    ],
} as const

export type SiteConfig = typeof siteConfig
