import type { FC } from 'react';
import { useTopTracks } from '@api/useTopTracks';
import { AppLayout } from '@components/app-layout';

export const TopTracks: FC = () => {
  const { data: tracks = [] } = useTopTracks();

  return (
    <AppLayout>
      {tracks.map((track) => {
        const { name, uri } = track;

        return <div key={uri}>{name}</div>;
      })}
    </AppLayout>
  );
};
