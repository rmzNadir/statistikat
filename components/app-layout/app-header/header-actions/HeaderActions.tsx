import { Button, useMediaQuery } from '@chakra-ui/react';

import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { theme } from '@config/theme';
import { HeaderActionsContainer } from './styles';
import { ThemeToggleButton } from '../theme-toggle-button';

export const HeaderActions = () => {
  const { data: session } = useSession();
  const [isMobile] = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      const signOutData = await signOut({ redirect: false, callbackUrl: '/' });

      router.push(signOutData.url);
    } catch (err) {
      console.error('Unexpected error when signing out: ', err);
    }
  };

  return (
    <HeaderActionsContainer>
      {!isMobile && <ThemeToggleButton />}
      {session && <Button>Profile</Button>}
      {session && <Button onClick={handleSignOut}>Logout</Button>}
      {!session && (
        <Button onClick={() => signIn('spotify', { callbackUrl: '/' })}>
          Login
        </Button>
      )}
    </HeaderActionsContainer>
  );
};
