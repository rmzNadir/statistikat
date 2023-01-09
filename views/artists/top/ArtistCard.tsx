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

  const artistProfilePicture = images[1];

  return (
    <Card>
      <Card.Image
        src={artistProfilePicture.url}
        alt={`${name}} album art`}
        width={320}
        height={320}
        // Preload first 10 images
        priority={rank < 11}
      />
      <TruncatedText as="b" noOfLines={1}>
        {rank}. {name}
      </TruncatedText>
    </Card>
  );
};
