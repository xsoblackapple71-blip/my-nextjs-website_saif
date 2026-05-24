/**
 * Minimal helper to derive a channel/logo placeholder for a YouTube video URL.
 * Keeps logic simple and avoids requiring API keys.
 */

export interface YouTubeChannelInfo {
  channelLogo: string;
  channelName: string;
  channelId?: string;
}

export function extractYouTubeVideoId(url: string): string | null {
  if (!url) return null;
  const m = url.match(/(?:v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]{6,})/);
  return m ? m[1] : null;
}

function uiAvatar(name = 'Creator') {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=6366f1&color=ffffff&size=256&bold=true&rounded=true`;
}

export async function fetchYouTubeChannelLogo(videoUrl: string): Promise<YouTubeChannelInfo> {
  try {
    const videoId = extractYouTubeVideoId(videoUrl);
    if (!videoId) return { channelLogo: uiAvatar('Creator'), channelName: 'Creator' };

    // Use oEmbed to get author name when possible (no API key)
    const oembed = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
    const res = await fetch(oembed);
    if (!res.ok) return { channelLogo: uiAvatar('Creator'), channelName: 'Creator' };
    const data = await res.json();
    const name = data.author_name || 'Creator';

    return { channelLogo: uiAvatar(name), channelName: name };
  } catch (err) {
    return { channelLogo: uiAvatar('Creator'), channelName: 'Creator' };
  }
}

export async function getChannelLogoWithCache(videoUrl: string): Promise<string> {
  if (typeof window !== 'undefined') {
    const key = `yt-logo-${videoUrl}`;
    const cached = sessionStorage.getItem(key);
    if (cached) return cached;
    const info = await fetchYouTubeChannelLogo(videoUrl);
    sessionStorage.setItem(key, info.channelLogo);
    return info.channelLogo;
  }
  const info = await fetchYouTubeChannelLogo(videoUrl);
  return info.channelLogo;
}
