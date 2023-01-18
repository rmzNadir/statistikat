import type { QueryFunctionContext } from '@tanstack/react-query';
import axios from 'axios';
import type { Session } from 'next-auth';
import { createInfiniteQueryHook } from '@utils/createInfiniteQueryHook';
import { createQueryHook } from '@utils/createQueryHook';
import type { Track } from 'types/spotify';

interface TopTracksReponse {
  items: Track[];
  total: number;
  limit: number;
  offset: number;
  previous: string | null;
  href: string;
  next: string | null;
}

export const getAllTopTracks = async (session: Session) => {
  const { data } = await axios.get<TopTracksReponse>(
    '/top/tracks?limit=50&time_range=long_term',
    {
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
      },
    },
  );

  return data;
};

export const useTopTracks = createQueryHook({
  queryKey: ['topTracks'],
  queryFn: getAllTopTracks,
  select: (res) => res.items,
});

export const getInfiniteTopTracks = async (
  session: Session,
  ctx: QueryFunctionContext,
) => {
  const { pageParam: url } = ctx;

  // pageParam is null for the first page
  const safeURL = url ?? '/top/tracks?limit=49&time_range=long_term';

  const { data } = await axios.get<TopTracksReponse>(safeURL, {
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`,
    },
  });

  return data;
};

export const useInfiniteTopTracks = createInfiniteQueryHook({
  queryKey: ['topTracks'],
  queryFn: getInfiniteTopTracks,
  getPreviousPageParam: ({ next }) => next ?? undefined,
  getNextPageParam: ({ next }) => {
    if (!next) {
      return undefined;
    }

    const url = new URL(next);

    if (url.searchParams.has('offset')) {
      url.searchParams.set('limit', '50');
    }

    return url.toString();
  },
});
