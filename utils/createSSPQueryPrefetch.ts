import { dehydrate, QueryClient } from '@tanstack/react-query';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import type { CreateSSPPrefetch } from 'types/fetchUtils';

export const createSSPQueryPrefetch: CreateSSPPrefetch =
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
      await queryClient.prefetchQuery([queryName], (queryCTX) =>
        fetchCB(session, queryCTX),
      );
    } else if (Array.isArray(queryName) && Array.isArray(fetchCB)) {
      await Promise.all(
        queryName.map((name, i) =>
          queryClient.prefetchQuery([name], (queryCTX) =>
            fetchCB[i](session, queryCTX),
          ),
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
