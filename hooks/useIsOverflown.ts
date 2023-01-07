import type { RefObject } from 'react';
import { useState } from 'react';
import { useSafeLayoutEffect } from './useSafeLayoutEffect';

export const useIsOverflown = <R extends HTMLElement>(ref: RefObject<R>) => {
  const [isOverflow, setIsOverflow] = useState(false);

  useSafeLayoutEffect(() => {
    const { current } = ref;

    if (current) {
      const hasOverflow = current.scrollHeight > current.clientHeight;

      setIsOverflow(hasOverflow);
    }
  }, [ref]);

  return isOverflow;
};
