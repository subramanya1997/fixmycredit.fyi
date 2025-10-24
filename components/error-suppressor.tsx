'use client';

import { useEffect } from 'react';

export function ErrorSuppressor() {
  useEffect(() => {
    // Suppress known React 19 + Sanity Studio compatibility warnings
    const originalError = console.error;
    
    console.error = function(...args) {
      const errorString = args[0]?.toString() || '';
      
      // Filter out known Sanity/React 19 compatibility warnings
      const suppressedWarnings = [
        'disableTransition',
        'Cannot update a component',
        'PortableTextInput',
      ];
      
      if (suppressedWarnings.some(warning => errorString.includes(warning))) {
        return;
      }
      
      // Call the original console.error for all other errors
      originalError.apply(console, args);
    };

    // Cleanup on unmount
    return () => {
      console.error = originalError;
    };
  }, []);

  return null;
}

