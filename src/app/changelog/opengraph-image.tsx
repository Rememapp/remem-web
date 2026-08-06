import { OG_SIZE, renderOgImage } from '@/lib/og'
import { siteConfig } from '@/lib/site'

export const alt = `Changelog — ${siteConfig.name}`
export const size = OG_SIZE
export const contentType = 'image/png'

export default function OgImage() {
    return renderOgImage({
        title: 'Changelog',
        subtitle: 'What we are building and shipping on the way to the Remem launch.',
    })
}
