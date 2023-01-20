import { Center, Spinner } from '@chakra-ui/react';
import { useScroll } from 'framer-motion';
import type { FC, ReactNode } from 'react';
import { memo, useEffect, useRef } from 'react';
import isEqual from 'react-fast-compare';

interface Props {
  fetchMore: () => void;
  disabled: boolean;
  children: ReactNode;
  loading: boolean;
}

export const RawInfiniteScroll: FC<Props> = ({
  fetchMore,
  disabled,
  children,
  loading,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end end'],
  });

  useEffect(() => {
    if (disabled) {
      return undefined;
    }

    return scrollYProgress.on('change', (scrollProgress) => {
      if (scrollProgress > 0.7) {
        fetchMore();
      }
    });
  }, [scrollYProgress, disabled, fetchMore]);

  return (
    <>
      <div ref={ref}>{children}</div>
      {loading && (
        <Center
          w="full"
          mt="6"
          color="purple.500"
          _dark={{ color: 'purple.300' }}
        >
          <Spinner size="lg" />
        </Center>
      )}
    </>
  );
};

export const InfiniteScroll = memo(RawInfiniteScroll, isEqual);
