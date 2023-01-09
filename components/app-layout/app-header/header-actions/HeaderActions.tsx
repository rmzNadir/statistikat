import { Button } from '@chakra-ui/react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Media } from '@components/Media';
import { HeaderActionsContainer } from './styles';
import { ThemeToggleButton } from '../theme-toggle-button';

export const HeaderActions = () => {
  const { data: session } = useSession();
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
      <Media greaterThanOrEqual="md">
        <ThemeToggleButton />
      </Media>
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
