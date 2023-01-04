import { Heading, Tab, Tabs } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { TabList } from './styles';

const indices: Record<string, number> = {
  '/tracks/top': 0,
  '/artists/top': 1,
};

export const AppNavigation = () => {
  const { route } = useRouter();

  return (
    <Tabs align="center" index={indices[route] ?? Infinity}>
      <TabList>
        <Link href="/tracks/top" shallow passHref>
          <Tab as="a" tabIndex={0}>
            <Heading size="sm" as="h2">
              Top Tracks
            </Heading>
          </Tab>
        </Link>
        <Link href="/artists/top" shallow passHref>
          <Tab as="a" tabIndex={0}>
            <Heading size="sm" as="h2">
              Top Artists
            </Heading>
          </Tab>
        </Link>
      </TabList>
    </Tabs>
  );
};
