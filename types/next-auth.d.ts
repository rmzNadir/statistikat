import type {
  DefaultSession,
  Account as NextAuthAccount,
  Profile as NextAuthProfile,
} from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Profile {
    country: string;
    display_name: string;
    email: string;
    explicit_content: { filter_enabled: boolean; filter_locked: boolean };
    external_urls: {
      spotify: string;
    };
    followers: { href: string | null; total: number };
    href: string;
    id: string;
    images: {
      height: number | null;
      url: string;
      width: number | null;
    }[];
    product: string;
    type: string;
    uri: string;
    accessToken: string;
    refreshToken: string;
  }
  interface Session {
    user: NextAuthProfile;
    expires: DefaultSession['expires'];
    error: 'RefreshAccessTokenError' | null;
  }
  /**
   * Usually contains information about the provider being used
   * and also extends `TokenSet`, which is different tokens returned by OAuth Providers.
   */
  interface Account {
    access_token: string;
    refresh_token: string;
    expires_at: number;
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    user: NextAuthProfile;
    accessToken: NextAuthAccount['access_token'];
    refreshToken: NextAuthAccount['refresh_token'];
    accessTokenExpires: number;
    error?: 'RefreshAccessTokenError';
  }
}
