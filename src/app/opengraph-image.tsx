import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'AdsX - Advertising for the AI Search Era';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000000',
          backgroundImage: 'linear-gradient(to bottom right, #000000, #0a0a0a, #000000)',
          position: 'relative',
        }}
      >
        {/* Grid pattern overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Gradient orb */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
          }}
        >
          {/* Logo */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '40px',
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '16px',
                backgroundColor: 'rgba(16, 185, 129, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ color: '#10b981', fontSize: '32px', fontWeight: 'bold' }}>X</span>
            </div>
            <span style={{ color: 'white', fontSize: '48px', fontWeight: 'bold' }}>AdsX</span>
          </div>

          {/* Headline */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span
              style={{
                fontSize: '64px',
                fontWeight: 'bold',
                color: 'white',
                textAlign: 'center',
              }}
            >
              Advertising for the
            </span>
            <span
              style={{
                fontSize: '64px',
                fontWeight: 'bold',
                background: 'linear-gradient(to right, #34d399, #6ee7b7, #10b981)',
                backgroundClip: 'text',
                color: 'transparent',
                textAlign: 'center',
              }}
            >
              AI Search Era
            </span>
          </div>

          {/* Subheadline */}
          <span
            style={{
              marginTop: '32px',
              fontSize: '24px',
              color: 'rgba(255,255,255,0.6)',
              textAlign: 'center',
              maxWidth: '800px',
            }}
          >
            Get your brand recommended by ChatGPT, Claude, Perplexity & more
          </span>

          {/* Platform badges */}
          <div
            style={{
              display: 'flex',
              gap: '24px',
              marginTop: '48px',
            }}
          >
            {['ChatGPT', 'Claude', 'Perplexity', 'Gemini', 'Grok'].map((platform) => (
              <div
                key={platform}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <span style={{ color: '#10b981', fontSize: '16px' }}>●</span>
                <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px' }}>{platform}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
