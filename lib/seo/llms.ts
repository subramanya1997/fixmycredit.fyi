import { siteConfig } from '@/lib/config/site';
import {
  getAllBlogPosts,
  getAllCategories,
  getFeaturedCreditTools,
} from '@/lib/sanity/queries';
import type { BlogPost, Category, CreditTool } from '@/lib/sanity/types';
import { stateGuides } from '@/lib/data/state-guides';

type PublicContent = {
  posts: Pick<BlogPost, 'title' | 'slug' | 'excerpt' | 'publishedAt'>[];
  categories: Pick<Category, 'title' | 'slug' | 'description'>[];
  tools: Pick<CreditTool, 'name' | 'slug' | 'description' | 'category'>[];
};

async function getPublicContent(): Promise<PublicContent> {
  try {
    const [posts, categories, tools] = await Promise.all([
      getAllBlogPosts(25),
      getAllCategories(),
      getFeaturedCreditTools(10),
    ]);

    return {
      posts,
      categories,
      tools,
    };
  } catch {
    return {
      posts: [],
      categories: [],
      tools: [],
    };
  }
}

function absoluteUrl(path: string): string {
  return `${siteConfig.domain.url}${path}`;
}

function listLine(label: string, url: string, description?: string): string {
  return `- ${label}: ${url}${description ? ` - ${description}` : ''}`;
}

export async function generateLlmsTxt(): Promise<string> {
  const { posts, categories, tools } = await getPublicContent();

  const lines = [
    `# ${siteConfig.branding.name}`,
    '',
    '> Credit repair education, score-factor explainers, and tools for people trying to understand and improve credit reports in the United States.',
    '',
    'Important policies:',
    '- Content is educational and is not legal, financial, or credit counseling advice.',
    '- The site does not currently publish official social profiles.',
    '- Public content may be crawled for search and answer retrieval unless a route is blocked in robots.txt.',
    '',
    'Core URLs:',
    listLine('Home', absoluteUrl('/')),
    listLine('Blog', absoluteUrl('/blog')),
    listLine('About', absoluteUrl('/about')),
    listLine('Editorial policy', absoluteUrl('/editorial-policy')),
    listLine('Disclaimer', absoluteUrl('/disclaimer')),
    listLine('Sitemap', absoluteUrl('/sitemap.xml')),
    '',
    'Blog categories:',
    ...(categories.length
      ? categories.map((category) =>
          listLine(
            category.title,
            absoluteUrl(`/blog/category/${category.slug.current}`),
            category.description
          )
        )
      : ['- No live categories found.']),
    '',
    'Featured tools:',
    listLine('Credit utilization calculator', absoluteUrl('/tools/credit-utilization-calculator')),
    listLine('Dispute letter generator', absoluteUrl('/tools/dispute-letter-generator')),
    listLine('Credit score factors explorer', absoluteUrl('/tools/credit-score-factors')),
    ...tools.map((tool) =>
      listLine(
        tool.name,
        absoluteUrl(`/tools/${tool.slug.current}`),
        tool.description || tool.category
      )
    ),
    '',
    'Recent articles:',
    ...(posts.length
      ? posts.map((post) =>
          listLine(post.title, absoluteUrl(`/blog/${post.slug.current}`), post.excerpt)
        )
      : ['- No live articles found.']),
    '',
    'State resource guides:',
    ...stateGuides.map((guide) =>
      listLine(`${guide.state} credit repair resources`, absoluteUrl(`/credit-repair/${guide.slug}`))
    ),
  ];

  return `${lines.join('\n')}\n`;
}

export async function generateLlmsFullTxt(): Promise<string> {
  const { posts, categories } = await getPublicContent();

  const lines = [
    `# ${siteConfig.branding.name} Full AI Context`,
    '',
    siteConfig.branding.description,
    '',
    'Audience:',
    '- Consumers in the United States learning how credit scores, disputes, utilization, collections, and credit reporting rules work.',
    '- Readers who need plain-English guidance before deciding whether to use a credit repair tool or consult a qualified professional.',
    '',
    'Trust and safety notes:',
    '- Credit repair outcomes vary by credit file, creditor behavior, bureau reporting, and legal requirements.',
    '- No article should be interpreted as legal, tax, financial, or credit counseling advice.',
    '- Users should verify credit report facts and consult qualified professionals for legal disputes or complex debt situations.',
    '',
    'Primary site sections:',
    listLine('Home', absoluteUrl('/'), 'Product overview and waitlist.'),
    listLine('Blog', absoluteUrl('/blog'), 'Credit repair guides and score education.'),
    listLine('Tools', absoluteUrl('/tools'), 'Free calculators and generators.'),
    listLine('About', absoluteUrl('/about'), 'Site purpose, ownership signals, and contact.'),
    listLine('Editorial policy', absoluteUrl('/editorial-policy'), 'How content is written, reviewed, sourced, and updated.'),
    '',
    'Topic hubs:',
    ...(categories.length
      ? categories.map((category) =>
          listLine(
            category.title,
            absoluteUrl(`/blog/category/${category.slug.current}`),
            category.description
          )
        )
      : ['- Topic hubs are still being built.']),
    '',
    'State resource pages:',
    ...stateGuides.map((guide) =>
      listLine(
        `${guide.state} credit repair resources`,
        absoluteUrl(`/credit-repair/${guide.slug}`),
        `Includes dispute planning steps and ${guide.attorneyGeneralName}.`
      )
    ),
    '',
    'Article summaries:',
    ...(posts.length
      ? posts.map((post) =>
          [
            `## ${post.title}`,
            `URL: ${absoluteUrl(`/blog/${post.slug.current}`)}`,
            `Published: ${post.publishedAt}`,
            `Summary: ${post.excerpt}`,
          ].join('\n')
        )
      : ['No live article summaries found.']),
  ];

  return `${lines.join('\n\n')}\n`;
}
