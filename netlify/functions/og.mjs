import { ImageResponse } from '@vercel/og';

function sanitizeChampion(value) {
  const trimmed = (value ?? 'TBD').trim();
  if (!trimmed) return 'TBD';
  return trimmed.slice(0, 80);
}

export async function handler(event) {
  const champion = sanitizeChampion(event.queryStringParameters?.champion);

  const image = new ImageResponse(
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
        <div style={{ display: 'flex', fontSize: 96, marginBottom: 24 }}>🏆</div>
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
    { width: 1200, height: 630 },
  );

  const buffer = await image.arrayBuffer();

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
    },
    body: Buffer.from(buffer).toString('base64'),
    isBase64Encoded: true,
  };
}
