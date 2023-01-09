import { Flex, useColorModeValue } from '@chakra-ui/react';
import type { FC } from 'react';
import React from 'react';
import { Card } from '@components/card';
import { ItemGrid } from '@components/Common';
import { Media } from '@components/Media';
import { MobileRank } from '@components/mobile-rank';
import { TruncatedText } from '@components/TruncatedText';
import type { Track } from 'types/spotify';

interface Props {
  track: Track;
  rank: number;
}

export const TrackCard: FC<Props> = ({ track, rank }) => {
  const { name, album } = track;

  const { images, name: albumName } = album;

  const albumArt = images[1];

  const secondaryTextColor = useColorModeValue('gray.900', 'gray.300');

  return (
    <ItemGrid>
      <Media lessThan="md">
        <MobileRank rank={rank} />
      </Media>
      <Card>
        <Card.Image
          src={albumArt.url}
          alt={`${albumName} album art`}
          width={300}
          height={300}
          // Preload first 10 images
          priority={rank < 11}
        />
        <Card.Content>
          <Flex gap="1">
            <Media greaterThanOrEqual="md">
              <b>{rank}.</b>
            </Media>
            <TruncatedText as="b" noOfLines={1}>
              {name}
            </TruncatedText>
          </Flex>
          <TruncatedText
            fontWeight="medium"
            textColor={secondaryTextColor}
            noOfLines={1}
          >
            {albumName}
          </TruncatedText>
        </Card.Content>
      </Card>
    </ItemGrid>
  );
};
