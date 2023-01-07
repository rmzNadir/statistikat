import '@config/axios';
import '@config/baseCSS.css';
import { ChakraProvider, cookieStorageManagerSSR } from '@chakra-ui/react';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import type { NextPageContext } from 'next';
import type { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import type { AppProps as NextAppProps } from 'next/app';
import { useState } from 'react';
import { AppLayout } from '@components/app-layout';
import { theme } from '@config/theme';

interface AppProps extends NextAppProps {
  cookies: string;
  pageProps: { dehydratedState: unknown; session: Session };
}

const MyApp = ({
  Component,
  cookies = '',
  pageProps: { session, dehydratedState, ...pageProps },
}: AppProps) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ChakraProvider
      theme={theme}
      colorModeManager={cookieStorageManagerSSR(cookies)}
    >
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={dehydratedState}>
            <AppLayout>
              <Component {...pageProps} />
            </AppLayout>
          </Hydrate>
        </QueryClientProvider>
      </SessionProvider>
    </ChakraProvider>
  );
};

export default MyApp;

MyApp.getInitialProps = ({ ctx: { req } }: { ctx: NextPageContext }) => ({
  cookies: req?.headers.cookie ?? '',
  // Required as otherwise we'll run into 'cant read properties of undefined' errors
  // when cold-loading pages that don't pre-fetch any data
  pageProps: {},
});
