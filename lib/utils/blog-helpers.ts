import { PortableTextBlock } from '@portabletext/react';

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
  
  const text = content
    .filter((block) => block._type === 'block')
    .map((block: any) => 
      block.children?.map((child: any) => child.text).join(' ') || ''
    )
    .join(' ');
  
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
  
  const text = content
    .filter((block) => block._type === 'block')
    .map((block: any) => 
      block.children?.map((child: any) => child.text).join(' ') || ''
    )
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
  
  return truncateText(text, maxLength);
}

