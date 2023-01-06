import {
  type Theme as baseTheme,
  extendTheme,
  withDefaultColorScheme,
} from '@chakra-ui/react';

export const theme = extendTheme(
  {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  withDefaultColorScheme({
    colorScheme: 'purple',
  }),
) as baseTheme;

type Theme = typeof theme;

export type { Theme };
