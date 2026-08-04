import { OG_SIZE, renderOgImage } from '@/lib/og'
import { siteConfig } from '@/lib/site'

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`
export const size = OG_SIZE
export const contentType = 'image/png'

export default function OgImage() {
    return renderOgImage({
        title: 'Never repeat yourself.',
        subtitle: 'Fill your information once. Reuse it on every form — privately, on your device.',
    })
}
