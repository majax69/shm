import { ImageResponse } from 'next/og'
import { BUSINESS } from '@/lib/content'

export const alt = 'SHM Cils & Ongles à Villeurbanne près de Lyon'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #12070a 0%, #241018 45%, #050505 100%)',
          color: 'white',
          padding: 72,
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 24,
            letterSpacing: 8,
            textTransform: 'uppercase',
            color: '#fda4af',
          }}
        >
          Villeurbanne · Lyon
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              maxWidth: 900,
              fontSize: 82,
              lineHeight: 0.95,
              fontWeight: 600,
            }}
          >
            Extension de cils & ongles
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: 30,
              fontSize: 32,
              color: 'rgba(255,255,255,0.76)',
            }}
          >
            {`${BUSINESS.name} · Réservation en ligne`}
          </div>
        </div>
      </div>
    ),
    size,
  )
}
