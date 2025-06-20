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
      const shareableLink = `${window.location.origin}/job/${jobId}`;

      // Copy to clipboard
      await navigator.clipboard.writeText(shareableLink);

      // Show copied notification
      setCopied(true);

      // Hide notification after 8 seconds
      setTimeout(() => setCopied(false), 8000);
    } catch (error) {
      console.error('Error sharing job:', error);
    }
  };

  return (
    <div className='relative'>
      <button
        onClick={handleShareClick}
        className='rounded-full border border-[#62BECB] p-1'
      >
        <Share2 className='text-[#62BECB]' />
      </button>

      {copied && (
        <div className='absolute -top-20 right-0 bg-[#F2F7FB] text-[#0F4A7B] text-xs px-6 py-1 rounded-md'>
          Link copied!
        </div>
      )}
    </div>
  );
}
