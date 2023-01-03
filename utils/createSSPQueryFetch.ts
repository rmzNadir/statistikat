import { dehydrate, QueryClient } from '@tanstack/react-query';
import type { GetServerSideProps } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from 'pages/api/auth/[...nextauth]';
import type { FetchCB } from 'types/fetchUtils';

type CreateSSPQueryFetch = <FetchReturnValue>(
  queryName: string,
  fetchCB: FetchCB<FetchReturnValue>,
) => GetServerSideProps;

export const createSSPQueryFetch: CreateSSPQueryFetch =
  (queryName, fetchCB) => async (ctx) => {
    const session = await unstable_getServerSession(
      ctx.req,
      ctx.res,
      authOptions,
    );

    if (!session) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery([queryName], () => fetchCB(session));

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  };
