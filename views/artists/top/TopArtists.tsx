import type { FC } from 'react';
import { useTopArtists } from '@hooks/queries/useTopArtists';

export const TopArtists: FC = () => {
  const { data: artists = [] } = useTopArtists();

  return (
    <>
      {artists.map((artist) => {
        const { name, uri } = artist;

        return <div key={uri}>{name}</div>;
      })}
    </>
  );
};
