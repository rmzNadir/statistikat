import type { GetServerSideProps, NextPage } from 'next';

import { getTopArtists } from '@api/useTopArtists';
import { createSSPQueryFetch } from '@utils/createSSPQueryFetch';
import { withShallowNavigation } from '@utils/withShallowNavigation';
import { TopArtists } from '@views/artists/top/TopArtists';

const Top: NextPage = () => <TopArtists />;

export default Top;

export const getServerSideProps: GetServerSideProps = withShallowNavigation(
  createSSPQueryFetch('topArtists', getTopArtists),
);
