import { useColorModeValue } from '@chakra-ui/react';
import { signIn, useSession } from 'next-auth/react';
import Head from 'next/head';
import type { FC, ReactNode } from 'react';
import { useCallback, useEffect } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import type { Engine } from 'tsparticles-engine';
import { AppNavigation } from '@components/app-layout/app-navigation';
import { getParticlesConfig } from '@config/particles';
import { theme } from '@config/theme';
import { AppFooter } from './app-footer';
import { AppHeader } from './app-header';
import {
  ChildrenContainer,
  LayoutContainer,
  LayoutMain,
  LayoutMainContainer,
} from './styles';

export interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  const { data: session } = useSession();
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  useEffect(() => {
    if (session?.error === 'RefreshAccessTokenError') {
      // Force sign in to hopefully resolve error
      signIn('spotify', { callbackUrl: '/' });
    }
  }, [session]);

  const backgroundColor = useColorModeValue(
    theme.colors.gray[100],
    theme.colors.gray[700],
  );
  const dotColor = useColorModeValue(
    theme.colors.purple[500],
    theme.colors.white,
  );

  return (
    <LayoutContainer>
      <Head>
        <title>StatistiKat</title>
        <meta
          name="description"
          content="Get the details on all your Spotify listening habits."
        />
        <link
          rel="shortcut icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🐈‍⬛</text></svg>"
        />
      </Head>
      <AppHeader />
      <LayoutMainContainer>
        <LayoutMain style={{ backgroundColor }}>
          <AppNavigation />
          <ChildrenContainer>
            <Particles
              init={particlesInit}
              options={getParticlesConfig({ dotColor })}
            />
            {children}
          </ChildrenContainer>
        </LayoutMain>
      </LayoutMainContainer>
      <AppFooter />
    </LayoutContainer>
  );
};
