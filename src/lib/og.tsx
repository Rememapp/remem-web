import { ImageResponse } from 'next/og'

export const OG_SIZE = { width: 1200, height: 630 }

/** Shared dynamic Open Graph card — vacuum ground, violet signal ink, square full stop. No gradients. */
export function renderOgImage({ title, subtitle }: { title: string; subtitle: string }) {
    return new ImageResponse(
        <div
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: 80,
                backgroundColor: '#0b0e14',
                color: '#e8ebf1',
                fontFamily: 'sans-serif',
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div
                    style={{
                        width: 28,
                        height: 28,
                        borderRadius: 6,
                        backgroundColor: '#863bff',
                        display: 'flex',
                    }}
                />
                <div style={{ fontSize: 36, fontWeight: 700 }}>Remem</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', fontSize: 72, fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em', maxWidth: 1000 }}>
                    {title}
                    <div style={{ width: 14, height: 14, backgroundColor: '#a78bfa', marginLeft: 10, display: 'flex' }} />
                </div>
                <div style={{ fontSize: 30, color: '#9aa3b2', maxWidth: 900, lineHeight: 1.4 }}>{subtitle}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 22, color: '#a78bfa', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
                <div style={{ width: 10, height: 10, backgroundColor: '#a78bfa', display: 'flex' }} />
                Private memory for job applications
            </div>
        </div>,
        OG_SIZE,
    )
}
