import { Button, Center, Divider, Text } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import { ExternalLink } from 'tabler-icons-react';
import { Card } from '@components/card';
import { Icon } from '@components/Icon';
import { Link } from '@components/link';
import { useSafeLayoutEffect } from '@hooks/useSafeLayoutEffect';

// Placeholder page, this'll go away soon.
const Login: NextPage = () => {
  const { query } = useRouter();
  const isLoginError = Boolean(query?.error);

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
        <Card style={{ flexDirection: 'column' }}>
          {isLoginError && (
            <p>
              We couldn&apos;t log you in as our Spotify App is running in
              development mode, if you still wish to try out StatistiKat while
              we request a quota extension please open an issue including your
              Spotify&apos;s account email{' '}
              <Link
                href="https://github.com/rmzNadir/statistikat/issues/new?title=[Access%20Request]&body=Spotify account email:"
                isExternal
                _dark={{ color: 'purple.200' }}
                _light={{ color: 'purple.500' }}
              >
                here <Icon as={ExternalLink} />
              </Link>{' '}
            </p>
          )}
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
