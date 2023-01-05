import type { FC } from 'react';
import { AppLayout } from '@components/app-layout';
import { useTopArtists } from '@hooks/queries/useTopArtists';

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
