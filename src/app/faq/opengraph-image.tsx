import { OG_SIZE, renderOgImage } from '@/lib/og'
import { siteConfig } from '@/lib/site'

export const alt = `FAQ — ${siteConfig.name}`
export const size = OG_SIZE
export const contentType = 'image/png'

export default function OgImage() {
    return renderOgImage({
        title: 'FAQ',
        subtitle: 'How Remem differs from browser autofill, where your data is stored, and what the AI does and does not do.',
    })
}
