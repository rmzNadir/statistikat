import type { GetServerSideProps, NextPage } from 'next';

import { getTopArtists } from '@api/useTopArtists';
import { createSSPQueryFetch } from '@utils/createSSPQueryFetch';
import { withCSN } from '@utils/withCSN';
import { TopArtists } from '@views/artists/top/TopArtists';

const Top: NextPage = () => <TopArtists />;

export default Top;

export const getServerSideProps: GetServerSideProps = withCSN(
  createSSPQueryFetch('topArtists', getTopArtists),
);
