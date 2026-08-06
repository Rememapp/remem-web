import type { Metadata } from 'next'

import { AiClarity } from '@/components/sections/ai-clarity'
import { Browsers } from '@/components/sections/browsers'
import { Features } from '@/components/sections/features'
import { FinalCta } from '@/components/sections/final-cta'
import { Hero } from '@/components/sections/hero'
import { Privacy } from '@/components/sections/privacy'
import { SocialProof } from '@/components/sections/social-proof'
import { pageMetadata } from '@/lib/metadata'
import { siteConfig } from '@/lib/site'

export const metadata: Metadata = pageMetadata({
    description: siteConfig.description,
    path: '/',
})

export default function HomePage() {
    return (
        <>
            <Hero />
            <SocialProof />
            <Features />
            <Privacy />
            <AiClarity />
            <Browsers />
            <FinalCta />
        </>
    )
}
