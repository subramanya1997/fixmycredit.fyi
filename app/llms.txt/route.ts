import { generateLlmsTxt } from '@/lib/seo/llms';

export const revalidate = 3600;

export async function GET() {
  return new Response(await generateLlmsTxt(), {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
    },
  });
}
