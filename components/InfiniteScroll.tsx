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
