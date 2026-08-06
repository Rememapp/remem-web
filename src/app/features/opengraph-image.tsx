import { OG_SIZE, renderOgImage } from '@/lib/og'
import { siteConfig } from '@/lib/site'

export const alt = `Features — ${siteConfig.name}`
export const size = OG_SIZE
export const contentType = 'image/png'

export default function OgImage() {
    return renderOgImage({
        title: 'Features',
        subtitle: 'Smart form detection, profile memory, AI writing for open-ended questions, local-first storage, and one-click fill.',
    })
}
