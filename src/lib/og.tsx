import { ImageResponse } from 'next/og'

export const OG_SIZE = { width: 1200, height: 630 }

/** Shared dynamic Open Graph card — dark brand surface, violet accent, no gradients. */
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
                backgroundColor: '#0b0f19',
                color: '#f1f5f9',
                fontFamily: 'sans-serif',
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div
                    style={{
                        width: 28,
                        height: 28,
                        borderRadius: 8,
                        backgroundColor: '#863bff',
                        display: 'flex',
                    }}
                />
                <div style={{ fontSize: 36, fontWeight: 700 }}>Remem</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em', maxWidth: 1000 }}>{title}</div>
                <div style={{ fontSize: 30, color: '#94a3b8', maxWidth: 900, lineHeight: 1.4 }}>{subtitle}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 24, color: '#a78bfa' }}>
                <div style={{ width: 10, height: 10, borderRadius: 999, backgroundColor: '#a78bfa', display: 'flex' }} />
                Privacy-first browser memory
            </div>
        </div>,
        OG_SIZE,
    )
}
