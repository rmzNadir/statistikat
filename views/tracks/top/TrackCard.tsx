import { useColorModeValue } from '@chakra-ui/react';
import type { FC } from 'react';
import React from 'react';
import { Card } from '@components/card';
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
    <Card>
      <Card.Image
        src={albumArt.url}
        alt={`${albumName} album art`}
        width={300}
        height={300}
      />
      <div>
        <TruncatedText as="b" noOfLines={1}>
          {rank}. {name}
        </TruncatedText>
        <TruncatedText
          fontWeight="medium"
          textColor={secondaryTextColor}
          noOfLines={1}
        >
          {albumName}
        </TruncatedText>
      </div>
    </Card>
  );
};
