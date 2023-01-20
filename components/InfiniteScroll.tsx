import { useScroll } from 'framer-motion';
import type { FC, ReactNode } from 'react';
import { memo, useEffect, useRef } from 'react';
import isEqual from 'react-fast-compare';

interface Props {
  fetchMore: () => void;
  disabled: boolean;
  children: ReactNode;
}

export const RawInfiniteScroll: FC<Props> = ({
  fetchMore,
  disabled,
  children,
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

  return <div ref={ref}>{children}</div>;
};

export const InfiniteScroll = memo(RawInfiniteScroll, isEqual);
