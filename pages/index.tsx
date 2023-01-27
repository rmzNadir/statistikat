import { dehydrate, QueryClient } from '@tanstack/react-query';
import type { GetServerSideProps, NextPage } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { getInfiniteTopArtists } from '@hooks/queries/useTopArtists';
import { getTopGenres } from '@hooks/queries/useTopGenres';
import { getInfiniteTopTracks } from '@hooks/queries/useTopTracks';
import { prefetchInfiniteQuery } from '@utils/prefetchInfiniteQuery';
import { HomePage } from '@views/HomePage';
import { authOptions } from './api/auth/[...nextauth]';

const Home: NextPage = () => <HomePage />;

export default Home;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
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

  const infiniteTopTracksPromise = prefetchInfiniteQuery(
    'topTracks',
    getInfiniteTopTracks,
    queryClient,
    session,
  );

  const infiniteTopArtistsPromise = prefetchInfiniteQuery(
    'topArtists',
    getInfiniteTopArtists,
    queryClient,
    session,
  );

  const topGenresPromise = queryClient.prefetchQuery(['topGenres'], () =>
    getTopGenres(session),
  );

  // no error handling for infinite queries as queryClient.prefetch*
  // doesn't throw
  await Promise.all([
    infiniteTopArtistsPromise,
    infiniteTopTracksPromise,
    topGenresPromise,
  ]);

  return {
    props: {
      session,
      dehydratedState: dehydrate(queryClient),
    },
  };
};
