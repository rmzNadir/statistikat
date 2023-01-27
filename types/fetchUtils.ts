import type { QueryFunctionContext } from '@tanstack/react-query';
import type { Session } from 'next-auth';

export type FetchCB<RV> = (
  session: Session,
  ctx: QueryFunctionContext,
) => Promise<RV>;
