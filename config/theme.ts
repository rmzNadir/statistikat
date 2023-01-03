import {
  extendTheme,
  withDefaultColorScheme,
  type Theme,
} from '@chakra-ui/react';

const customTheme: Partial<Theme> = {
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
};

export const theme = extendTheme(
  withDefaultColorScheme({
    colorScheme: 'purple',
  }),
  customTheme,
) as Theme;
