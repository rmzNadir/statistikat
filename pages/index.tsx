import type { GetServerSideProps, NextPage } from 'next';
import { getInfiniteTopArtists } from '@hooks/queries/useTopArtists';
import { getInfiniteTopTracks } from '@hooks/queries/useTopTracks';
import { createSSPInfiniteQueryPrefetch } from '@utils/createSSPInfiniteQueryPrefetch';
import { HomePage } from '@views/HomePage';

const Home: NextPage = () => <HomePage />;

export default Home;

export const getServerSideProps: GetServerSideProps =
  createSSPInfiniteQueryPrefetch(
    ['topTracks', 'topArtists'],
    [getInfiniteTopTracks, getInfiniteTopArtists],
  );
