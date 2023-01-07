import type { FC } from 'react';
import { Grid } from '@components/Common';
import { useTopArtists } from '@hooks/queries/useTopArtists';
import { ArtistCard } from './ArtistCard';

export const TopArtists: FC = () => {
  const { data: artists = [] } = useTopArtists();

  return (
    <Grid>
      {artists.map((artist, i) => (
        <ArtistCard key={artist.uri} artist={artist} rank={i + 1} />
      ))}
    </Grid>
  );
};
