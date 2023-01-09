import {
  type Theme as baseTheme,
  extendTheme,
  withDefaultColorScheme,
} from '@chakra-ui/react';
import { css } from '@emotion/react';
import { Inter } from '@next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const GlobalStyles = css`
  /*
    This will hide the focus indicator if the element receives focus via the mouse,
    but it will still show up on keyboard focus.
  */
  .js-focus-visible :focus:not([data-focus-visible-added]) {
    outline: none;
    box-shadow: none;
  }
`;

export const theme = extendTheme(
  {
    initialColorMode: 'dark',
    useSystemColorMode: false,
    fonts: {
      heading: inter.style.fontFamily,
      body: inter.style.fontFamily,
    },
  },
  withDefaultColorScheme({
    colorScheme: 'purple',
  }),
) as baseTheme;

type Theme = typeof theme;

export type { Theme };
