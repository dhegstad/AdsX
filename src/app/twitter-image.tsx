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
          padding: '60px',
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
            width: '800px',
            height: '800px',
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, transparent 70%)',
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
              marginBottom: '32px',
            }}
          >
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '14px',
                backgroundColor: 'rgba(16, 185, 129, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ color: '#10b981', fontSize: '28px', fontWeight: 'bold' }}>X</span>
            </div>
            <span style={{ color: 'white', fontSize: '42px', fontWeight: 'bold' }}>AdsX</span>
          </div>

          {/* Headline - Single Line */}
          <span
            style={{
              fontSize: '72px',
              fontWeight: 'bold',
              color: 'white',
              textAlign: 'center',
              lineHeight: 1.1,
            }}
          >
            Advertising for the{' '}
            <span
              style={{
                background: 'linear-gradient(to right, #34d399, #6ee7b7, #10b981)',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              AI Search Era
            </span>
          </span>

          {/* Social Proof Stats */}
          <div
            style={{
              display: 'flex',
              gap: '48px',
              marginTop: '40px',
              marginBottom: '40px',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ fontSize: '48px', fontWeight: 'bold', color: '#10b981' }}>340%</span>
              <span style={{ fontSize: '18px', color: 'rgba(255,255,255,0.5)' }}>Avg. increase in AI mentions</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ fontSize: '48px', fontWeight: 'bold', color: '#10b981' }}>4.2x</span>
              <span style={{ fontSize: '18px', color: 'rgba(255,255,255,0.5)' }}>Average client ROI</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ fontSize: '48px', fontWeight: 'bold', color: '#10b981' }}>52+</span>
              <span style={{ fontSize: '18px', color: 'rgba(255,255,255,0.5)' }}>Brands launched</span>
            </div>
          </div>

          {/* CTA */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '16px 32px',
              borderRadius: '12px',
              backgroundColor: '#10b981',
              marginTop: '8px',
            }}
          >
            <span style={{ fontSize: '24px', fontWeight: '600', color: '#000000' }}>
              Get Your Free AI Visibility Audit
            </span>
            <span style={{ fontSize: '24px', color: '#000000' }}>→</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
