import { Center } from '@chakra-ui/react';
import type { FC } from 'react';
import React from 'react';
import { Card } from '@components/card';
import { ItemGrid } from '@components/Common';
import { Media } from '@components/Media';
import { MobileRank } from '@components/mobile-rank';
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
    <ItemGrid>
      <Media lessThan="md">
        <MobileRank rank={rank} />
      </Media>
      <Card>
        <Card.Image
          src={artistProfilePicture.url}
          alt={`${name}} album art`}
          width={320}
          height={320}
          // Preload first 10 images
          priority={rank < 11}
        />
        <Center gap="1">
          <Media greaterThanOrEqual="md">
            <b>{rank}.</b>
          </Media>
          <TruncatedText as="b" noOfLines={1}>
            {name}
          </TruncatedText>
        </Center>
      </Card>
    </ItemGrid>
  );
};
