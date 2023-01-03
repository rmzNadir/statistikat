import '@config/axios';
import { ChakraProvider } from '@chakra-ui/react';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import type { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import type { AppProps as NextAppProps } from 'next/app';
import { useState } from 'react';
import { theme } from '@config/theme';

interface AppProps extends NextAppProps {
  pageProps: { dehydratedState: unknown; session: Session };
}

const MyApp = ({
  Component,
  pageProps: { session, dehydratedState, ...pageProps },
}: AppProps) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ChakraProvider theme={theme}>
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={dehydratedState}>
            <Component {...pageProps} />
          </Hydrate>
        </QueryClientProvider>
      </SessionProvider>
    </ChakraProvider>
  );
};

export default MyApp;
