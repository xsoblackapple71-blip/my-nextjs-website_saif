"use client";

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { fetchYouTubeChannelLogo } from '@/lib/youtube-channel-helper';

interface YouTubeChannelLogoProps {
  videoUrl: string;
  clientName?: string;
  className?: string;
  fallbackImage?: string;
}

export default function YouTubeChannelLogo({
  videoUrl,
  clientName,
  className = 'w-16 h-16',
  fallbackImage,
}: YouTubeChannelLogoProps) {
  const [logoUrl, setLogoUrl] = useState<string>(fallbackImage || '/placeholder.svg');
  const [isLoading, setIsLoading] = useState(true);

  // Use local asset logos when they are stored in the app's public folder (e.g. /companies/... or /Nova Logo.png)
  const useLocalLogo = Boolean(
    fallbackImage && (fallbackImage.startsWith('/companies/') || fallbackImage.startsWith('/'))
  );

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        setIsLoading(true);
        
        // Skip YouTube fetch if using local company logo
        if (useLocalLogo) {
          setLogoUrl(fallbackImage);
          setIsLoading(false);
          return;
        }

        const info = await fetchYouTubeChannelLogo(videoUrl);
        if (!mounted) return;
        setLogoUrl(info.channelLogo);
      } catch (e) {
        // keep fallback
      } finally {
        if (mounted) setIsLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, [videoUrl, useLocalLogo, fallbackImage]);

  return (
    <div className={`${className} rounded-2xl overflow-hidden bg-white/5 ${useLocalLogo ? 'p-0' : 'p-1'} flex items-center justify-center`}>
      <div className={`relative w-full h-full ${isLoading ? 'animate-pulse' : ''}`}>
        <Image src={logoUrl} alt={clientName ? `${clientName} logo` : 'Company logo'} fill sizes="48px" loading="lazy" className={useLocalLogo ? 'object-cover scale-110' : 'object-contain'} onError={() => {}} priority={false} />
      </div>
    </div>
  );
}
