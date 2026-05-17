import { PortableTextBlock } from '@portabletext/react';

type TextChild = {
  text?: string;
};

type TextBlock = PortableTextBlock & {
  children?: TextChild[];
};

function extractPlainText(content: PortableTextBlock[]): string {
  return content
    .filter((block): block is TextBlock => block._type === 'block')
    .map((block) =>
      block.children?.map((child) => child.text || '').join(' ') || ''
    )
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function calculateReadingTime(content: PortableTextBlock[]): number {
  if (!content || !Array.isArray(content)) return 5;
  
  const text = extractPlainText(content);
  
  const wordsPerMinute = 200;
  const wordCount = text.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  
  return readingTime || 5;
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

export function generateExcerpt(content: PortableTextBlock[], maxLength = 160): string {
  if (!content || !Array.isArray(content)) return '';
  
  const text = extractPlainText(content);
  
  return truncateText(text, maxLength);
}
