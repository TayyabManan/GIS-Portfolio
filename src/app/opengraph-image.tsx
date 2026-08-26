import { ImageResponse } from 'next/og'

// Branded 1200x630 social share card used for OpenGraph and Twitter across the
// site (except blog/project detail pages, which supply their own cover image).
// Replaces the old square headshot that was mis-declared as 1200x630 and cropped
// by LinkedIn/Twitter.

export const alt = 'Tayyab Manan - AI/ML Engineer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '90px',
          background: '#1c1917',
          color: '#edebe8',
        }}
      >
        <div
          style={{
            fontSize: 32,
            fontWeight: 600,
            letterSpacing: 6,
            textTransform: 'uppercase',
            color: '#d9f21e',
          }}
        >
          AI/ML Engineer
        </div>
        <div style={{ fontSize: 104, fontWeight: 700, marginTop: 20, lineHeight: 1.05 }}>
          Tayyab Manan
        </div>
        <div style={{ fontSize: 36, color: '#a8a29e', marginTop: 28, maxWidth: 940 }}>
          Computer Vision · NLP · Geospatial AI · Production ML
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginTop: 'auto',
            fontSize: 28,
            color: '#78716c',
          }}
        >
          tayyabmanan.com
        </div>
      </div>
    ),
    size
  )
}
