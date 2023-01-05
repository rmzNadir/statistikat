import type { NextPage } from 'next';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useLayoutEffect } from 'react';

const useSafeLayoutEffect =
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  typeof window === 'undefined' ? () => {} : useLayoutEffect;

const Login: NextPage = () => {
  const { query } = useRouter();

  useSafeLayoutEffect(() => {
    signIn('spotify', {
      callbackUrl: (query?.redirect as string) ?? '/',
    });
  }, [query?.redirect]);

  return null;
};

export default Login;
