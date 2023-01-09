import type { RefObject } from 'react';
import { useState } from 'react';
import { useSafeLayoutEffect } from './useSafeLayoutEffect';

export const isOverflown = <E extends HTMLElement>(element: E) =>
  element.offsetHeight < element.scrollHeight ||
  element.offsetWidth < element.scrollWidth;

export const useIsOverflown = <R extends HTMLElement>(ref: RefObject<R>) => {
  const [isOverflow, setIsOverflow] = useState(false);

  useSafeLayoutEffect(() => {
    const { current } = ref;

    if (current) {
      setIsOverflow(isOverflown(current));
    }
  }, [ref]);

  return isOverflow;
};
