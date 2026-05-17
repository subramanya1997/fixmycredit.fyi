import { ImageResponse } from 'next/og';
import { siteConfig } from '@/lib/config/site';

export const runtime = 'edge';

const imageSize = {
  width: 1200,
  height: 630,
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || siteConfig.seo.title.default;
  const category = searchParams.get('category');
  const author = searchParams.get('author');

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#f8fafc',
          color: '#0f172a',
          padding: 72,
          fontFamily: 'Arial, sans-serif',
          border: '1px solid #e2e8f0',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: 28,
            fontWeight: 700,
          }}
        >
          <span>{siteConfig.branding.name}</span>
          {category ? (
            <span
              style={{
                fontSize: 22,
                fontWeight: 600,
                color: '#047857',
              }}
            >
              {category}
            </span>
          ) : null}
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
          }}
        >
          <div
            style={{
              fontSize: title.length > 62 ? 56 : 68,
              fontWeight: 800,
              lineHeight: 1.08,
              maxWidth: 980,
              letterSpacing: 0,
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 30,
              color: '#475569',
              maxWidth: 900,
              lineHeight: 1.25,
            }}
          >
            {author ? `By ${author} • ` : null}
            Credit repair guidance, tools, and plain-English score education.
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 24,
            color: '#334155',
          }}
        >
          <span>fixmycredit.fyi</span>
          <span>Credit score repair platform</span>
        </div>
      </div>
    ),
    imageSize
  );
}
