import { useScroll } from 'framer-motion';
import type { FC, ReactNode } from 'react';
import React, { useEffect, useRef } from 'react';

interface Props {
  fetchMore: () => void;
  disabled: boolean;
  children: ReactNode;
}

export const InfiniteScroll: FC<Props> = ({
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
    const unsubScrollYProgress = scrollYProgress.on(
      'change',
      (scrollProgress) => {
        const shouldFetchMore = !disabled && scrollProgress > 0.6;

        if (shouldFetchMore) {
          fetchMore();
        }
      },
    );

    return () => {
      unsubScrollYProgress();
    };
  }, [scrollYProgress, disabled, fetchMore]);

  return <div ref={ref}>{children}</div>;
};
