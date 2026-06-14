import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

function sanitizeChampion(value: string | null): string {
  const trimmed = (value ?? 'TBD').trim();
  if (!trimmed) return 'TBD';
  return trimmed.slice(0, 80);
}

export default async function handler(request: Request) {
  const { searchParams } = new URL(request.url);
  const champion = sanitizeChampion(searchParams.get('champion'));

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(145deg, #020617 0%, #0b1a33 45%, #0f2744 100%)',
          color: '#f8fafc',
          fontFamily: 'system-ui, sans-serif',
          padding: '64px',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 96,
            marginBottom: 24,
          }}
        >
          🏆
        </div>
        <div
          style={{
            fontSize: 34,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#94a3b8',
            marginBottom: 18,
          }}
        >
          World Cup 2026 Simulator
        </div>
        <div
          style={{
            fontSize: 58,
            fontWeight: 800,
            textAlign: 'center',
            lineHeight: 1.1,
            color: '#34d399',
            maxWidth: '1000px',
          }}
        >
          {champion.toUpperCase()} PREDICTED CHAMPION
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}

