import type { QueryFunctionContext } from '@tanstack/react-query';
import type { GetServerSideProps } from 'next';
import type { Session } from 'next-auth';

export type FetchCB<RV> = (
  session: Session,
  ctx: QueryFunctionContext,
) => Promise<RV>;

export type CreateSSPPrefetch = <FetchReturnValue>(
  queryName: string | string[],
  fetchCB: FetchCB<FetchReturnValue> | FetchCB<unknown>[],
) => GetServerSideProps;
