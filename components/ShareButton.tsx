'use client';

import { useState } from 'react';
import { Share2 } from 'lucide-react';

type ShareButtonProps = {
  jobId: string;
};

export default function ShareButton({ jobId }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShareClick = async () => {
    try {
      // Construct the shareable URL directly
      const shareableLink = `${window.location.origin}/jobs/${jobId}`;

      // Copy to clipboard
      await navigator.clipboard.writeText(shareableLink);

      // Show copied notification
      setCopied(true);

      // Hide notification after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Error sharing job:', error);
    }
  };

  return (
    <div>
      <button
        onClick={handleShareClick}
        className='rounded-full border border-blue-200 p-2'
      >
        <Share2 className='text-[#62BECB]' />
      </button>

      {copied && (
        <div className='absolute -top-10 right-0 bg-black text-white text-xs px-2 py-1 rounded'>
          Link copied!
        </div>
      )}
    </div>
  );
}
