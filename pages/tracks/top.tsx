import type { GetServerSideProps, NextPage } from 'next';

import { getTopTracks } from '@api/useTopTracks';
import { createSSPQueryFetch } from '@utils/createSSPQueryFetch';
import { withShallowNavigation } from '@utils/withShallowNavigation';
import { TopTracks } from '@views/tracks/top';

const Top: NextPage = () => <TopTracks />;

export default Top;

export const getServerSideProps: GetServerSideProps = withShallowNavigation(
  createSSPQueryFetch('topTracks', getTopTracks),
);
