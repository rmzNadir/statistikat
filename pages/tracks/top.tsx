import type { GetServerSideProps, NextPage } from 'next';
import { getInfiniteTopTracks } from '@hooks/queries/useTopTracks';
import { createSSPInfiniteQueryPrefetch } from '@utils/createSSPInfiniteQueryPrefetch';
import { withShallowNavigation } from '@utils/withShallowNavigation';
import { TopTracks } from '@views/tracks/top';

const Top: NextPage = () => <TopTracks />;

export default Top;

export const getServerSideProps: GetServerSideProps = withShallowNavigation(
  createSSPInfiniteQueryPrefetch('topTracks', getInfiniteTopTracks),
  { requireAuth: true },
);
