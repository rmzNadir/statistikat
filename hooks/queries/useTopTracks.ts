import type { QueryFunctionContext } from '@tanstack/react-query';
import axios from 'axios';
import type { Session } from 'next-auth';
import { createInfiniteQueryHook } from '@utils/createInfiniteQueryHook';
import { createQueryHook } from '@utils/createQueryHook';
import { setup } from '@utils/pageParamOptimizer';
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

const pageParamOptimizer = setup({
  initialItems: 12,
  path: '/top/tracks',
});

export const getInfiniteTopTracks = async (
  session: Session,
  ctx: QueryFunctionContext,
) => {
  const { pageParam: url } = ctx;

  const { data } = await axios.get<TopTracksReponse>(
    pageParamOptimizer.getSafeURL(url),
    {
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
      },
    },
  );

  return data;
};

export const useInfiniteTopTracks = createInfiniteQueryHook({
  queryKey: ['topTracks'],
  queryFn: getInfiniteTopTracks,
  getPreviousPageParam: ({ next }) => next ?? undefined,
  getNextPageParam: pageParamOptimizer.getOptimizedNextPageParam,
});
