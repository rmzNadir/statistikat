/* eslint-disable react/no-unescaped-entities */
/* eslint-disable prettier/prettier */
import type { NextPage } from 'next';

const Home: NextPage = () => {
  const art = String.raw` 
 /\_/\
( o.o )
 > ^ <`;

  return (
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
  );
};

export default Home;
