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

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        setIsLoading(true);
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
  }, [videoUrl]);

  return (
    <div className={`${className} rounded-2xl overflow-hidden bg-white/5 p-1 flex items-center justify-center`}>
      <div className={`relative w-full h-full ${isLoading ? 'animate-pulse' : ''}`}>
        <Image src={logoUrl} alt={clientName ? `${clientName} YouTube channel logo` : 'YouTube channel logo'} fill sizes="48px" loading="lazy" className="object-contain" onError={() => {}} priority={false} />
      </div>
    </div>
  );
}
