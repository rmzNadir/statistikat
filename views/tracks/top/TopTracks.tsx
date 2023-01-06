import type { FC } from 'react';
import { AppLayout } from '@components/app-layout';
import { useTopTracks } from '@hooks/queries/useTopTracks';
import { Card, Grid } from './styles';

export const TopTracks: FC = () => {
  const { data: tracks = [] } = useTopTracks();

  return (
    <AppLayout>
      <Grid>
        {tracks.map((track) => {
          const { name, uri } = track;

          return <Card key={uri}>{name}</Card>;
        })}
      </Grid>
    </AppLayout>
  );
};
