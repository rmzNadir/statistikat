import type { QueryFunctionContext } from '@tanstack/react-query';
import axios from 'axios';
import type { Session } from 'next-auth';
import { createInfiniteQueryHook } from '@utils/createInfiniteQueryHook';
import { createQueryHook } from '@utils/createQueryHook';
import type { Artist } from 'types/spotify';

interface TopArtistsReponse {
  items: Required<Artist>[];
  total: number;
  limit: number;
  offset: number;
  previous: string | null;
  href: string;
  next: string | null;
}

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

export const getInfiniteTopArtists = async (
  session: Session,
  ctx: QueryFunctionContext,
) => {
  const { pageParam: url } = ctx;

  // pageParam is null for the first page
  const safeURL = url ?? '/top/artists?limit=49&time_range=long_term';

  const { data } = await axios.get<TopArtistsReponse>(safeURL, {
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`,
    },
  });

  return data;
};

export const useInfiniteTopArtists = createInfiniteQueryHook({
  queryKey: ['topArtists'],
  queryFn: getInfiniteTopArtists,
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
