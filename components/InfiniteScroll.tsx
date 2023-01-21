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
  disableLoadingOnMountFetch?: boolean;
  fetchMoreOnMount?: boolean;
}

const BaseInfiniteScroll: FC<Props> = ({
  fetchMore,
  disabled,
  children,
  loading,
  fetchMoreOnMount = false,
  disableLoadingOnMountFetch = false,
}) => {
  const fetchCount = useRef(0);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end end'],
  });

  const isLoadingIndicatorDisabled =
    fetchMoreOnMount && disableLoadingOnMountFetch && fetchCount.current < 2;

  useEffect(() => {
    if (disabled || loading) {
      return undefined;
    }

    return scrollYProgress.on('change', (scrollProgress) => {
      if (scrollProgress > 0.7 && (fetchMoreOnMount || scrollProgress < 1)) {
        fetchMore();
        fetchCount.current += 1;
      }
    });
  }, [scrollYProgress, disabled, fetchMore, loading, fetchMoreOnMount]);

  return (
    <div>
      <div ref={ref}>{children}</div>
      {loading && !isLoadingIndicatorDisabled && (
        <Center
          w="full"
          mt="6"
          color="purple.500"
          _dark={{ color: 'purple.300' }}
        >
          <Spinner size="lg" />
        </Center>
      )}
    </div>
  );
};

export const InfiniteScroll = memo(BaseInfiniteScroll, isEqual);
