import type { GetServerSideProps } from 'next';

/** Allows tan-stack query's cache to persist between internal routes */
export const withCSN =
  (next: GetServerSideProps): GetServerSideProps =>
  async (ctx) => {
    const isCSN = ctx.req.url?.startsWith('/_next');

    if (isCSN) {
      return {
        props: {},
      };
    }

    return next(ctx);
  };
