import type { NextPage } from 'next';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useLayoutEffect } from 'react';

const Login: NextPage = () => {
  const { query } = useRouter();

  useLayoutEffect(() => {
    signIn('spotify', {
      callbackUrl: (query?.redirect as string) ?? '/',
    });
  }, [query?.redirect]);

  return null;
};

export default Login;
