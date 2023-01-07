import type { FC } from 'react';
import { useTopTracks } from '@hooks/queries/useTopTracks';
import { Grid } from './styles';
import { TrackCard } from './TrackCard';

export const TopTracks: FC = () => {
  const { data: tracks = [] } = useTopTracks();

  return (
    <Grid>
      {tracks.map((track, i) => (
        <TrackCard key={track.uri} track={track} rank={i + 1} />
      ))}
    </Grid>
  );
};
