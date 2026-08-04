import { AiClarity } from '@/components/sections/ai-clarity'
import { Browsers } from '@/components/sections/browsers'
import { FaqPreview } from '@/components/sections/faq-preview'
import { Features } from '@/components/sections/features'
import { FinalCta } from '@/components/sections/final-cta'
import { Hero } from '@/components/sections/hero'
import { Privacy } from '@/components/sections/privacy'
import { Problem } from '@/components/sections/problem'
import { SocialProof } from '@/components/sections/social-proof'
import { Solution } from '@/components/sections/solution'
import { Workflow } from '@/components/sections/workflow'

export default function HomePage() {
    return (
        <>
            <Hero />
            <SocialProof />
            <Problem />
            <Solution />
            <Features />
            <Workflow />
            <Privacy />
            <AiClarity />
            <Browsers />
            <FaqPreview />
            <FinalCta />
        </>
    )
}
