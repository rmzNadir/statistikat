import { ColorModeScript } from '@chakra-ui/react';
import { Head, Html, Main, NextScript } from 'next/document';
import { theme } from '@config/theme';

const Document = () => (
  <Html lang="en">
    <Head />
    <body>
      <ColorModeScript
        initialColorMode={theme.config.initialColorMode}
        type="cookie"
      />
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
