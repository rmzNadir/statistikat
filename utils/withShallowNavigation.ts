import type { GetServerSideProps } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from 'pages/api/auth/[...nextauth]';

interface Options {
  /**
   * @default false */
  requireAuth?: boolean;
}

/** Allows tan-stack query's cache to persist between internal routes */
export const withShallowNavigation =
  (
    next: GetServerSideProps,
    options: Options = { requireAuth: false },
  ): GetServerSideProps =>
  async (ctx) => {
    const { requireAuth } = options;

    if (requireAuth) {
      const session = await unstable_getServerSession(
        ctx.req,
        ctx.res,
        authOptions,
      );

      if (!session) {
        return {
          redirect: {
            destination: `/login?redirect=${ctx.resolvedUrl}`,
            permanent: false,
          },
        };
      }
    }

    const isCSN = ctx.req.url?.startsWith('/_next');

    if (isCSN) {
      return {
        props: {},
      };
    }

    return next(ctx);
  };
