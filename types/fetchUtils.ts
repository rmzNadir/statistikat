import type { Session } from 'next-auth';

export type FetchCB<RV> = (session: Session) => Promise<RV>;
