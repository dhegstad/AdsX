import { ImageResponse } from 'next/og';

// Fixed artwork is generated once at build time.
export const dynamic = 'force-static';

export const size = {
  width: 48,
  height: 48,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#080808',
          borderRadius: '8px',
          border: '3px solid #10b981',
        }}
      >
        <span
          style={{
            fontSize: '22px',
            fontWeight: 900,
            color: '#EAEAEA',
            letterSpacing: '-1px',
          }}
        >
          AX
        </span>
      </div>
    ),
    {
      ...size,
    }
  );
}
