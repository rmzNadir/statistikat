import { useQuery } from '@tanstack/react-query';
import type { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import type { FetchCB } from 'types/fetchUtils';

export const createQueryHook =
  <FetchReturnValue>(queryName: string, fetchCB: FetchCB<FetchReturnValue>) =>
  () => {
    // Session will always be present client-side as we already
    // redirect un-auth'd users when server-side-rendering as part
    // of the initial data fetch to populate the cache
    const { data: session } = useSession();

    return useQuery([queryName], () => fetchCB(session as Session), {
      enabled: Boolean(session),
      // Prevent double fetch after initial page load while
      // also having a sane default (30s) that (hopefully) won't
      // mess with user flows as 30s is the min listen time for
      // a song playback to be registered by spotify
      staleTime: 1000 * 30,
    });
  };
