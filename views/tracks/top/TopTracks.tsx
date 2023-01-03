import type { FC } from 'react';
import { useGetTopTracks } from '@api/useGetTopTracks';
import { AppLayout } from '@components/app-layout';

export const TopTracks: FC = () => {
  const { data: tracks = [] } = useGetTopTracks();

  return (
    <AppLayout>
      {tracks.map((track) => {
        const { name, uri } = track;

        return <div key={uri}>{name}</div>;
      })}
    </AppLayout>
  );
};
