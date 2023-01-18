import type {
  InfiniteData,
  UseInfiniteQueryOptions,
} from '@tanstack/react-query';
import { useInfiniteQuery } from '@tanstack/react-query';
import type { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import type { FetchCB } from 'types/fetchUtils';

type Options<FRV, SRV> = {
  queryFn: FetchCB<FRV>;
  select?(data: InfiniteData<FRV>): InfiniteData<SRV>;
} & Omit<
  UseInfiniteQueryOptions<FRV, unknown, SRV>,
  'queryFn' | 'enabled' | 'staleTime' | 'select'
>;

export const createInfiniteQueryHook =
  <FetchReturnValue, SelectReturnValue = FetchReturnValue>(
    options: Options<FetchReturnValue, SelectReturnValue>,
  ) =>
  () => {
    // Session will always be present client-side as we already
    // redirect un-auth'd users when server-side-rendering as part
    // of the initial data fetch to populate the cache
    const { data: session } = useSession();

    const { queryFn, ...otherOptions } = options;

    return useInfiniteQuery({
      queryFn: (ctx) => queryFn(session as Session, ctx),
      enabled: Boolean(session),
      // Prevent double fetch after initial page load while
      // also having a sane default (25s) that (hopefully) won't
      // mess with user flows as 30s is the min listen time for
      // a song playback to be registered by spotify
      staleTime: 1000 * 25,
      ...otherOptions,
    });
  };
