import { Flex, useColorModeValue } from '@chakra-ui/react';
import type { FC } from 'react';
import { PlayerPlay } from 'tabler-icons-react';
import { Card } from '@components/card';
import { ItemGrid } from '@components/Common';
import { Icon } from '@components/Icon';
import { Link } from '@components/link';
import { Media } from '@components/Media';
import { MobileRank } from '@components/mobile-rank';
import { TruncatedText } from '@components/TruncatedText';
import { PREFETCHED_ITEM_COUNT } from '@hooks/queries/useTopTracks';
import type { Track } from 'types/spotify';

interface Props {
  track: Track;
  rank: number;
}

export const TrackCard: FC<Props> = ({ track, rank }) => {
  const { name, album, uri } = track;

  const { images, name: albumName } = album;

  const albumArt = images[1];

  const secondaryTextColor = useColorModeValue('gray.900', 'gray.300');

  const shouldHavePriority = rank <= PREFETCHED_ITEM_COUNT;

  return (
    <ItemGrid>
      <Media lessThan="md">
        <MobileRank rank={rank} />
      </Media>
      <Card bgColor={useColorModeValue('black', 'white')}>
        <Card.Image
          src={albumArt.url}
          alt={`${albumName} album art`}
          width={albumArt.width / 1.25}
          height={albumArt.height / 1.25}
          priority={shouldHavePriority}
          disableAnimation={shouldHavePriority}
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
        <Media lessThan="md" className="card-actions">
          <Card.Action
            icon={<Icon as={PlayerPlay} />}
            aria-label="play on spotify"
            as={Link}
            href={uri}
            size="sm"
            variant="ghost"
            isExternal={rank === 100}
          />
        </Media>
      </Card>
    </ItemGrid>
  );
};
