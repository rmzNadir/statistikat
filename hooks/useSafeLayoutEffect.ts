import { useLayoutEffect } from 'react';

export const useSafeLayoutEffect =
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  typeof window === 'undefined' ? () => {} : useLayoutEffect;
