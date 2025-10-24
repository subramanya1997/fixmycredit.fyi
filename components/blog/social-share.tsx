'use client';

import { useState, useEffect } from 'react';
import { Share2, Twitter, Facebook, Linkedin } from 'lucide-react';
import { trackShare } from '@/lib/analytics/gtag';

interface SocialShareProps {
  url: string;
  title: string;
  description?: string;
}

export function SocialShare({ url, title, description }: SocialShareProps) {
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    setCanShare(typeof navigator !== 'undefined' && 'share' in navigator);
  }, []);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = description ? encodeURIComponent(description) : '';

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    reddit: `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url,
        });
        trackShare('native_share', url);
      } catch (error) {
        // User cancelled share or error occurred
        console.log('Share cancelled');
      }
    }
  };

  const handleShareClick = (platform: string) => {
    trackShare(platform, url);
  };

  return (
    <div className="border-t border-b border-slate-200 dark:border-slate-800 py-6">
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-slate-900 dark:text-white">
          Share this article:
        </span>
        <div className="flex gap-3">
          <a
            href={shareLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleShareClick('twitter')}
            className="flex items-center gap-2 rounded-lg bg-slate-100 dark:bg-slate-800 px-4 py-2 text-sm font-medium text-slate-900 dark:text-white hover:bg-blue-600 hover:text-white transition-colors"
            aria-label="Share on Twitter"
          >
            <Twitter className="h-4 w-4" />
            Twitter
          </a>
          <a
            href={shareLinks.reddit}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleShareClick('reddit')}
            className="flex items-center gap-2 rounded-lg bg-slate-100 dark:bg-slate-800 px-4 py-2 text-sm font-medium text-slate-900 dark:text-white hover:bg-orange-600 hover:text-white transition-colors"
            aria-label="Share on Reddit"
          >
            <Share2 className="h-4 w-4" />
            Reddit
          </a>
          <a
            href={shareLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleShareClick('facebook')}
            className="hidden sm:flex items-center gap-2 rounded-lg bg-slate-100 dark:bg-slate-800 px-4 py-2 text-sm font-medium text-slate-900 dark:text-white hover:bg-blue-700 hover:text-white transition-colors"
            aria-label="Share on Facebook"
          >
            <Facebook className="h-4 w-4" />
            Facebook
          </a>
          <a
            href={shareLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleShareClick('linkedin')}
            className="hidden sm:flex items-center gap-2 rounded-lg bg-slate-100 dark:bg-slate-800 px-4 py-2 text-sm font-medium text-slate-900 dark:text-white hover:bg-blue-800 hover:text-white transition-colors"
            aria-label="Share on LinkedIn"
          >
            <Linkedin className="h-4 w-4" />
            LinkedIn
          </a>
          {canShare && (
            <button
              onClick={handleNativeShare}
              className="flex items-center gap-2 rounded-lg bg-slate-100 dark:bg-slate-800 px-4 py-2 text-sm font-medium text-slate-900 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
              aria-label="Share via device"
            >
              <Share2 className="h-4 w-4" />
              Share
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

