import { TopArtists } from '@components/artists/top';
import { SectionGrid } from '@components/Common';
import { TopTracks } from '@components/tracks/top';

export const HomePage = () => (
  <SectionGrid>
    <TopTracks />
    <TopArtists />
  </SectionGrid>
);
