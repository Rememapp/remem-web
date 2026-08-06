import { OG_SIZE, renderOgImage } from '@/lib/og'
import { siteConfig } from '@/lib/site'

export const alt = `Contact — ${siteConfig.name}`
export const size = OG_SIZE
export const contentType = 'image/png'

export default function OgImage() {
    return renderOgImage({
        title: 'Contact',
        subtitle: 'Questions, feedback, or press — get in touch with the Remem team. We read every message.',
    })
}
