import type { QueryClient } from '@tanstack/react-query';
import type { Session } from 'next-auth';
import type { FetchCB } from 'types/fetchUtils';

export const prefetchInfiniteQuery = <FRV>(
  queryName: string,
  fetchCB: FetchCB<FRV>,
  queryClient: QueryClient,
  session: Session,
): Promise<void> =>
  new Promise((resolve) => {
    queryClient
      .prefetchInfiniteQuery([queryName], (queryCTX) =>
        fetchCB(session, queryCTX),
      )
      .then(() => {
        // Workaround for https://github.com/TanStack/query/issues/1458
        queryClient.setQueryData<Awaited<ReturnType<typeof fetchCB>>>(
          [queryName],
          (data) => {
            if (!data) {
              return undefined;
            }
            return {
              ...data,
              pageParams: [null],
            };
          },
        );

        resolve();
      });
  });
