import '@config/axios';
import '@config/baseCSS.css';
import { ChakraProvider, cookieStorageManagerSSR } from '@chakra-ui/react';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import type { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import type { AppProps as NextAppProps } from 'next/app';
import type { AppContextType } from 'next/dist/shared/lib/utils';
import { useState } from 'react';
import { AppLayout } from '@components/app-layout';
import { MediaContextProvider } from '@components/Media';
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
            <MediaContextProvider disableDynamicMediaQueries>
              <AppLayout>
                <Component {...pageProps} />
              </AppLayout>
            </MediaContextProvider>
          </Hydrate>
        </QueryClientProvider>
      </SessionProvider>
    </ChakraProvider>
  );
};

export default MyApp;

// TODO: look into v8 error preventing us from fetching session here
MyApp.getInitialProps = (appCTX: AppContextType) => {
  const {
    ctx: { req },
  } = appCTX;

  return {
    cookies: req?.headers.cookie ?? '',
    // Required as otherwise we'll run into 'cant read properties of undefined' errors
    // when cold-loading pages that don't pre-fetch any data
    pageProps: {},
  };
};
