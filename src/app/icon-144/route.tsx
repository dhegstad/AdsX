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
          borderRadius: '24px',
          border: '6px solid #10b981',
        }}
      >
        <span
          style={{
            fontSize: '66px',
            fontWeight: 900,
            color: '#EAEAEA',
            letterSpacing: '-3px',
          }}
        >
          AX
        </span>
      </div>
    ),
    {
      width: 144,
      height: 144,
    }
  );
}
