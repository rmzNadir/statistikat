/* eslint-disable react/no-unescaped-entities */
/* eslint-disable prettier/prettier */
import type { NextPage } from 'next';

import { AppLayout } from '@components/app-layout';

const Home: NextPage = () => {
  const art = String.raw` 
 /\_/\
( o.o )
 > ^ <`;

  return (
    <AppLayout>
      <div
        style={{
          width: '100%',
          height: '60%',
          display: 'grid',
          placeItems: 'center',
        }}
      >
        <pre>{art}</pre>
      </div>
    </AppLayout>
  );
};

export default Home;
