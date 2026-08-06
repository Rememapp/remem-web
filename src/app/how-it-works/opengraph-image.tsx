import { OG_SIZE, renderOgImage } from '@/lib/og'
import { siteConfig } from '@/lib/site'

export const alt = `How it works — ${siteConfig.name}`
export const size = OG_SIZE
export const contentType = 'image/png'

export default function OgImage() {
    return renderOgImage({
        title: 'How it works',
        subtitle: 'From creating your local profile to submitting a form yourself — the six-step loop behind Remem.',
    })
}
