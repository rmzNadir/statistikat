import type { FC } from 'react';
import React from 'react';
import { Card } from '@components/card';
import { TruncatedText } from '@components/TruncatedText';
import type { Artist } from 'types/spotify';

interface Props {
  artist: Required<Artist>;
  rank: number;
}

export const ArtistCard: FC<Props> = ({ artist, rank }) => {
  const { name, images } = artist;

  const artistProfilePicture = images[0];

  return (
    <Card>
      <Card.Image
        src={artistProfilePicture.url}
        alt={`${name}} album art`}
        width={640}
        height={640}
      />
      <TruncatedText as="b" noOfLines={1}>
        {rank}. {name}
      </TruncatedText>
    </Card>
  );
};
