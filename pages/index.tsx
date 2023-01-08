/* eslint-disable react/no-unescaped-entities */
/* eslint-disable prettier/prettier */
import type { GetServerSideProps, NextPage } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';

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

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  return {
    props: { session },
  };
};
