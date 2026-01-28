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
          backgroundColor: '#10b981',
          borderRadius: '38px',
        }}
      >
        <span
          style={{
            fontSize: '110px',
            fontWeight: 'bold',
            color: '#000000',
          }}
        >
          X
        </span>
      </div>
    ),
    {
      width: 192,
      height: 192,
    }
  );
}
