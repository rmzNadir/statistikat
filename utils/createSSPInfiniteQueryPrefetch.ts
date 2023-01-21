import { dehydrate, QueryClient } from '@tanstack/react-query';
import type { Session } from 'next-auth';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import type { CreateSSPPrefetch, FetchCB } from 'types/fetchUtils';

const prefetchInfiniteQuery = <FRV>(
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

export const createSSPInfiniteQueryPrefetch: CreateSSPPrefetch =
  (queryName, fetchCB) => async (ctx) => {
    const session = await unstable_getServerSession(
      ctx.req,
      ctx.res,
      authOptions,
    );

    if (!session) {
      return {
        redirect: {
          destination: `/login?redirect=${ctx.resolvedUrl}`,
          permanent: false,
        },
      };
    }

    const queryClient = new QueryClient();

    if (!Array.isArray(queryName) && !Array.isArray(fetchCB)) {
      await prefetchInfiniteQuery(queryName, fetchCB, queryClient, session);
    } else if (Array.isArray(queryName) && Array.isArray(fetchCB)) {
      await Promise.all(
        queryName.map((name, i) =>
          prefetchInfiniteQuery(name, fetchCB[i], queryClient, session),
        ),
      );
    } else {
      throw new Error(
        'queryName and fetchCB must either arrays or not, they cannot have mixed types.',
      );
    }

    return {
      props: {
        session,
        dehydratedState: dehydrate(queryClient),
      },
    };
  };
