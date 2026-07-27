import { useEffect, useState } from "react";
import { SITE } from "./site";

export type YouTubeVideo = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
};

export type ChannelStats = {
  subscriberCount: string;
  viewCount: string;
  videoCount: string;
};

type State = {
  loading: boolean;
  error: string | null;
  videos: YouTubeVideo[];
  stats: ChannelStats | null;
  configured: boolean;
};

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY as string | undefined;
const CHANNEL_ID = (import.meta.env.VITE_YOUTUBE_CHANNEL_ID as string | undefined) || SITE.youtubeChannelId;

/**
 * Fetches live channel statistics and the latest uploads from the YouTube Data API v3.
 *
 * Requires a `VITE_YOUTUBE_API_KEY` environment variable (a free key from
 * https://console.cloud.google.com/apis/credentials with the "YouTube Data API v3" enabled).
 * Without a key, this hook returns `configured: false` and the page should show setup instructions
 * instead of erroring.
 */
export function useYouTube(maxResults = 6) {
  const [state, setState] = useState<State>({
    loading: true,
    error: null,
    videos: [],
    stats: null,
    configured: Boolean(API_KEY),
  });

  useEffect(() => {
    if (!API_KEY) {
      setState((s) => ({ ...s, loading: false, configured: false }));
      return;
    }

    let cancelled = false;

    async function load() {
      try {
        const statsRes = await fetch(
          `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${CHANNEL_ID}&key=${API_KEY}`
        );
        const statsJson = await statsRes.json();
        if (statsJson.error) throw new Error(statsJson.error.message);
        const stats = statsJson.items?.[0]?.statistics;

        const searchRes = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&order=date&maxResults=${maxResults}&type=video&key=${API_KEY}`
        );
        const searchJson = await searchRes.json();
        if (searchJson.error) throw new Error(searchJson.error.message);

        const videos: YouTubeVideo[] = (searchJson.items || []).map((item: any) => ({
          id: item.id.videoId,
          title: item.snippet.title,
          description: item.snippet.description,
          thumbnail: item.snippet.thumbnails?.medium?.url ?? item.snippet.thumbnails?.default?.url,
          publishedAt: item.snippet.publishedAt,
        }));

        if (!cancelled) {
          setState({
            loading: false,
            error: null,
            videos,
            configured: true,
            stats: stats
              ? {
                  subscriberCount: stats.subscriberCount,
                  viewCount: stats.viewCount,
                  videoCount: stats.videoCount,
                }
              : null,
          });
        }
      } catch (err: any) {
        if (!cancelled) {
          setState({
            loading: false,
            error: err.message || "Failed to load YouTube data.",
            videos: [],
            stats: null,
            configured: true,
          });
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [maxResults]);

  return state;
}
