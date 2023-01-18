import type { GetServerSideProps, NextPage } from 'next';
import { getInfiniteTopArtists } from '@hooks/queries/useTopArtists';
import { createSSPInfiniteQueryPrefetch } from '@utils/createSSPInfiniteQueryPrefetch';
import { withShallowNavigation } from '@utils/withShallowNavigation';
import { TopArtists } from '@views/artists/top/TopArtists';

const Top: NextPage = () => <TopArtists />;

export default Top;

export const getServerSideProps: GetServerSideProps = withShallowNavigation(
  createSSPInfiniteQueryPrefetch('topArtists', getInfiniteTopArtists),
  { requireAuth: true },
);
