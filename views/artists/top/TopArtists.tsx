import type { FC } from 'react';
import { useTopArtists } from '@api/useTopArtists';
import { AppLayout } from '@components/app-layout';

export const TopArtists: FC = () => {
  const { data: artists = [] } = useTopArtists();

  return (
    <AppLayout>
      {artists.map((artist) => {
        const { name, uri } = artist;

        return <div key={uri}>{name}</div>;
      })}
    </AppLayout>
  );
};
