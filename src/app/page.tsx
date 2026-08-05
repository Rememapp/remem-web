import { AiClarity } from '@/components/sections/ai-clarity'
import { Browsers } from '@/components/sections/browsers'
import { Features } from '@/components/sections/features'
import { FinalCta } from '@/components/sections/final-cta'
import { Hero } from '@/components/sections/hero'
import { Privacy } from '@/components/sections/privacy'
import { SocialProof } from '@/components/sections/social-proof'

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
