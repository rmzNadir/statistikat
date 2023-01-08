import { ColorModeScript } from '@chakra-ui/react';
import { Head, Html, Main, NextScript } from 'next/document';
import { mediaStyle } from '@components/Media';
import { theme } from '@config/theme';

const Document = () => (
  <Html lang="en">
    <Head>
      <style
        type="text/css"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: mediaStyle }}
      />
    </Head>
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
