import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
  width: 180,
  height: 180,
};
export const contentType = 'image/png';

export default function AppleIcon() {
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
          borderRadius: '40px',
          border: '6px solid #10b981',
        }}
      >
        <span
          style={{
            fontSize: '80px',
            fontWeight: 900,
            color: '#EAEAEA',
            letterSpacing: '-4px',
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
