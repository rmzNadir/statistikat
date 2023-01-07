import type { NextPage } from 'next';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useSafeLayoutEffect } from '@hooks/useSafeLayoutEffect';

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
