import { OG_SIZE, renderOgImage } from '@/lib/og'
import { siteConfig } from '@/lib/site'

export const alt = `About — ${siteConfig.name}`
export const size = OG_SIZE
export const contentType = 'image/png'

export default function OgImage() {
    return renderOgImage({
        title: 'About',
        subtitle: 'Why we are building Remem: a browser memory that remembers for you, without your data ever leaving your hands.',
    })
}
