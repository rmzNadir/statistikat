import { Flex, IconButton, useColorModeValue } from '@chakra-ui/react';
import type { Variants } from 'framer-motion';
import { motion, useAnimation } from 'framer-motion';
import type { FC } from 'react';
import { Explicit, PlayerPlay } from 'tabler-icons-react';
import { Card } from '@components/card';
import { ItemGrid } from '@components/Common';
import { Icon } from '@components/Icon';
import { Link } from '@components/link';
import { Media } from '@components/Media';
import { MobileRank } from '@components/mobile-rank';
import { TruncatedText } from '@components/TruncatedText';
import { PREFETCHED_ITEM_COUNT } from '@hooks/queries/useTopTracks';
import type { Track } from 'types/spotify';

const animationVariants: Variants = {
  playButtonHidden: {
    opacity: 0,
    position: 'absolute',
    right: 10,
    bottom: 0,
  },
  playButtonVisible: {
    opacity: 1,
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
};

interface Props {
  track: Track;
  rank: number;
}

export const TrackCard: FC<Props> = ({ track, rank }) => {
  const { name, album, uri, explicit } = track;

  const { images, name: albumName } = album;

  const albumArt = images[1];

  const shouldHavePriority = rank <= PREFETCHED_ITEM_COUNT;

  const secondaryTextColor = useColorModeValue('gray.900', 'gray.300');
  const animationControls = useAnimation();

  const handleMouseHover = (type: 'enter' | 'exit') => {
    animationControls.start(
      type === 'enter' ? 'playButtonVisible' : 'playButtonHidden',
    );
  };
  return (
    <ItemGrid
      onMouseOver={() => handleMouseHover('enter')}
      onMouseOut={() => handleMouseHover('exit')}
    >
      <Media lessThan="md">
        <MobileRank rank={rank} />
      </Media>
      <Card bgColor={useColorModeValue('black', 'white')}>
        <div style={{ position: 'relative' }}>
          <Card.Image
            src={albumArt.url}
            alt={`${albumName} album art`}
            width={albumArt.width / 1.25}
            height={albumArt.height / 1.25}
            priority={shouldHavePriority}
            disableAnimation={shouldHavePriority}
          />
          <Media greaterThanOrEqual="md">
            <motion.div
              initial="playButtonHidden"
              animate={animationControls}
              variants={animationVariants}
              transition={{ duration: 0.25 }}
            >
              <IconButton
                rounded="full"
                aria-label="play on spotify"
                icon={<Icon as={PlayerPlay} />}
                as={Link}
                href={uri}
              />
            </motion.div>
          </Media>
        </div>
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
            {explicit && <Icon as={Explicit} ml="-2px" />} {albumName}
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
          />
        </Media>
      </Card>
    </ItemGrid>
  );
};
