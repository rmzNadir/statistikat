import { dehydrate, QueryClient } from '@tanstack/react-query';
import type { GetServerSideProps, NextPage } from 'next';

import { unstable_getServerSession } from 'next-auth';
import { getTopTracks } from '@api/useGetTopTracks';
import { withCSN } from '@utils/withCSN';
import { TopTracks } from 'views/tracks/top';
import { authOptions } from '../api/auth/[...nextauth]';

const Top: NextPage = () => <TopTracks />;

export default Top;

export const getServerSideProps: GetServerSideProps = withCSN(async (ctx) => {
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

  await queryClient.prefetchQuery(['topTracks'], () => getTopTracks(session));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
});
