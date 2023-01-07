import axios from 'axios';
import type { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import SpotifyProvider from 'next-auth/providers/spotify';

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID ?? '';
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET ?? '';

const scope =
  'user-read-recently-played user-read-playback-state user-top-read user-modify-playback-state user-read-currently-playing user-follow-read playlist-read-private user-read-email user-read-private user-library-read playlist-read-collaborative';

interface RefreshResponse {
  access_token: string;
  token_type: string;
  scope: string;
  expires_in: number;
}

const refreshAccessToken = async (token: JWT): Promise<JWT> => {
  try {
    const res = await axios<RefreshResponse>({
      method: 'post',
      url: '/token',
      baseURL: 'https://accounts.spotify.com/api/',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        Authorization: `Basic ${Buffer.from(
          `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`,
        ).toString('base64')}`,
      },
      data: {
        grant_type: 'refresh_token',
        refresh_token: token.refreshToken,
      },
    });

    const { access_token, expires_in } = res.data;

    return {
      ...token,
      accessToken: access_token,
      accessTokenExpires: Date.now() + expires_in * 1000,
    };
  } catch (error) {
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
};

export const authOptions: NextAuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: SPOTIFY_CLIENT_ID,
      clientSecret: SPOTIFY_CLIENT_SECRET,
      authorization: {
        params: { scope },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt(res) {
      const { token, account, profile } = res;
      // Only the first response after login has these attributes
      if (account && profile) {
        const { access_token, refresh_token, expires_at } = account;

        return {
          user: profile,
          accessToken: access_token,
          refreshToken: refresh_token,
          accessTokenExpires: expires_at * 1000,
        };
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      // Access token has expired, try to update it
      return refreshAccessToken(token);
    },
    async session(res) {
      const { session, token } = res;

      session.user = token.user;

      session.user.accessToken = token.accessToken;

      session.user.refreshToken = token.refreshToken;

      session.error = token.error;

      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
};

export default NextAuth(authOptions);
