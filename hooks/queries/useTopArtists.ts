import type { QueryFunctionContext } from '@tanstack/react-query';
import axios from 'axios';
import type { Session } from 'next-auth';
import { createInfiniteQueryHook } from '@utils/createInfiniteQueryHook';
import { createQueryHook } from '@utils/createQueryHook';
import { setup } from '@utils/pageParamOptimizer';
import type { TopArtistsReponse } from 'types/spotify';

export const getAllTopArtists = async (session: Session) => {
  const { data } = await axios.get<TopArtistsReponse>(
    '/top/artists?limit=50&time_range=long_term',
    {
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
      },
    },
  );

  return data;
};

export const useTopArtists = createQueryHook({
  queryKey: ['topArtists'],
  queryFn: getAllTopArtists,
  select: (res) => res.items,
});

export const PREFETCHED_ITEM_COUNT = 12;

const pageParamOptimizer = setup({
  initialItems: PREFETCHED_ITEM_COUNT,
  path: '/top/artists',
});

export const getInfiniteTopArtists = async (
  session: Session,
  ctx: QueryFunctionContext,
) => {
  const { pageParam: url } = ctx;

  const { data } = await axios.get<TopArtistsReponse>(
    pageParamOptimizer.getSafeURL(url),
    {
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
      },
    },
  );

  return data;
};

export const useInfiniteTopArtists = createInfiniteQueryHook({
  queryKey: ['topArtists'],
  queryFn: getInfiniteTopArtists,
  getPreviousPageParam: ({ next }) => next ?? undefined,
  getNextPageParam: pageParamOptimizer.getOptimizedNextPageParam,
});
