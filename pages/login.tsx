import type { NextPage } from 'next';
import { signIn } from 'next-auth/react';
import { useLayoutEffect } from 'react';

const Login: NextPage = () => {
  useLayoutEffect(() => {
    signIn('spotify', {
      callbackUrl: process.env.NEXT_PUBLIC_REDIRECT_URI ?? '',
    });
  }, []);

  return null;
};

export default Login;
