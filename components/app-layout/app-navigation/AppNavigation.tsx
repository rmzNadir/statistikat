import { Heading, TabList, Tabs } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Tab } from './styles';

const indices: Record<string, number> = {
  '/tracks/top': 0,
  '/artists/top': 1,
};

export const AppNavigation = () => {
  const { route } = useRouter();

  return (
    <Tabs align="center" index={indices[route] ?? Infinity}>
      <TabList>
        <Tab as={Link} href="/tracks/top">
          <Heading size="sm" as="h2">
            Top Tracks
          </Heading>
        </Tab>
        <Tab as={Link} href="/artists/top">
          <Heading size="sm" as="h2">
            Top Artists
          </Heading>
        </Tab>
      </TabList>
    </Tabs>
  );
};
