import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { Session } from 'next-auth';
import { useSession } from 'next-auth/react';

export interface ExternalUrls {
  spotify: string;
}

export interface Artist {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

export interface Image {
  height: number;
  url: string;
  width: number;
}

export interface Album {
  album_type: string;
  artists: Artist[];
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
}

export interface ExternalIds {
  isrc: string;
}

export interface Track {
  album: Album;
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: ExternalIds;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
}

interface TopTracksReponse {
  items: Track[];
}

export const getTopTracks = async (session: Session) => {
  const { data } = await axios.get<TopTracksReponse>(
    '/top/tracks?limit=25&time_range=long_term',
    {
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
      },
    },
  );

  return data.items;
};

export const useGetTopTracks = () => {
  // Session will always be present client-side as we already
  // redirect un-auth'd users when server-side-rendering as part
  // of the initial data fetch to populate the cache
  const { data: session } = useSession();

  return useQuery(['topTracks'], () => getTopTracks(session as Session), {
    enabled: Boolean(session),
  });
};
