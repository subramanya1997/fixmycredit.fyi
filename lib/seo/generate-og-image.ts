/**
 * Utility to generate Open Graph images dynamically
 * This can be used with Next.js's ImageResponse API or external services
 */

export interface OGImageOptions {
  title: string;
  subtitle?: string;
  category?: string;
  authorName?: string;
}

export function generateOGImageUrl(options: OGImageOptions): string {
  const params = new URLSearchParams({
    title: options.title,
    ...(options.subtitle && { subtitle: options.subtitle }),
    ...(options.category && { category: options.category }),
    ...(options.authorName && { author: options.authorName }),
  });

  // This endpoint would need to be created separately using @vercel/og
  // or similar OG image generation service
  return `/api/og?${params.toString()}`;
}

/**
 * Template for creating OG images with ImageResponse
 * Add this to app/api/og/route.tsx
 */
export const ogImageTemplate = `
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || 'FixMyCredit.fyi';
  const category = searchParams.get('category');

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          backgroundImage: 'linear-gradient(to bottom, #0ea5e9, #0284c7)',
          padding: '80px',
        }}
      >
        {category && (
          <div
            style={{
              fontSize: 24,
              color: 'rgba(255,255,255,0.8)',
              marginBottom: 20,
            }}
          >
            {category}
          </div>
        )}
        <div
          style={{
            fontSize: 72,
            fontWeight: 'bold',
            color: 'white',
            lineHeight: 1.2,
            marginBottom: 40,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 32,
            color: 'rgba(255,255,255,0.9)',
          }}
        >
          fixmycredit.fyi
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
`;

