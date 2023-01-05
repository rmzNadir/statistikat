import type { FC } from 'react';
import { AppLayout } from '@components/app-layout';
import { useTopTracks } from '@hooks/queries/useTopTracks';

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
