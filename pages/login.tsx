import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Button, Center, Divider, Text } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Card } from '@components/card';
import { Link } from '@components/link';
import { useSafeLayoutEffect } from '@hooks/useSafeLayoutEffect';

const Login: NextPage = () => {
  const { query } = useRouter();
  const isLoginError = query?.error === 'OAuthCallback';

  const handleSignIn = () => {
    signIn('spotify', {
      callbackUrl: (query?.redirect as string) ?? '/',
    });
  };

  useSafeLayoutEffect(() => {
    if (isLoginError) {
      return;
    }

    handleSignIn();
  }, [isLoginError, handleSignIn]);

  if (isLoginError) {
    return (
      <Center m="auto" maxW={400}>
        <Card>
          <span>
            We couldn&apos;t log you in as our Spotify App is running in
            development mode, if you still wish to try out StatistiKat while we
            request a quota extension please open an issue including your
            Spotify&apos;s account email{' '}
            <Link
              href="https://github.com/rmzNadir/statistikat/issues/new?title=[Access%20Request]&body=Spotify account email:"
              isExternal
              _dark={{ color: 'purple.200' }}
              _light={{ color: 'purple.500' }}
            >
              here <ExternalLinkIcon mb="2px" />
            </Link>{' '}
          </span>
          <Center>
            <Divider />
            <Text px="2">Or</Text>
            <Divider />
          </Center>
          <Button onClick={() => handleSignIn()}>Try again</Button>
        </Card>
      </Center>
    );
  }

  return null;
};

export default Login;
