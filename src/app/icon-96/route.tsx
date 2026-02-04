import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
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
          borderRadius: '16px',
          border: '4px solid #10b981',
        }}
      >
        <span
          style={{
            fontSize: '44px',
            fontWeight: 900,
            color: '#EAEAEA',
            letterSpacing: '-2px',
          }}
        >
          AX
        </span>
      </div>
    ),
    {
      width: 96,
      height: 96,
    }
  );
}
