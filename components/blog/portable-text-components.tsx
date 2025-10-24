import Image from 'next/image';
import Link from 'next/link';
import { PortableTextComponents } from '@portabletext/react';
import { urlFor } from '@/lib/sanity/client';

export const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      
      return (
        <figure className="my-8">
          <div className="relative aspect-video overflow-hidden rounded-lg">
            <Image
              src={urlFor(value).width(1200).height(675).url()}
              alt={value.alt || ' '}
              fill
              className="object-cover"
            />
          </div>
          {value.caption && (
            <figcaption className="mt-2 text-center text-sm text-slate-600 dark:text-slate-400">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    code: ({ value }) => {
      return (
        <pre className="my-6 overflow-x-auto rounded-lg bg-slate-900 p-4">
          <code className="text-sm text-slate-100">{value.code}</code>
        </pre>
      );
    },
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith('/') ? 'noopener noreferrer' : undefined;
      const target = !value.href.startsWith('/') ? '_blank' : undefined;
      
      return (
        <a
          href={value.href}
          rel={rel}
          target={target}
          className="text-blue-600 hover:text-blue-700 underline"
        >
          {children}
        </a>
      );
    },
    strong: ({ children }) => (
      <strong className="font-bold">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic">{children}</em>
    ),
    code: ({ children }) => (
      <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ),
  },
  block: {
    h2: ({ children }) => (
      <h2 className="mt-12 mb-4 text-3xl font-bold text-slate-900 dark:text-white">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 mb-3 text-2xl font-bold text-slate-900 dark:text-white">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-6 mb-2 text-xl font-semibold text-slate-900 dark:text-white">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-4 border-blue-600 pl-6 italic text-slate-700 dark:text-slate-300">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="mb-4 text-slate-700 dark:text-slate-300 leading-relaxed">
        {children}
      </p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="my-6 ml-6 list-disc space-y-2 text-slate-700 dark:text-slate-300">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="my-6 ml-6 list-decimal space-y-2 text-slate-700 dark:text-slate-300">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="leading-relaxed">{children}</li>
    ),
    number: ({ children }) => (
      <li className="leading-relaxed">{children}</li>
    ),
  },
};

