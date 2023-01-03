import { Heading, Tab, Tabs } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { Link } from '@components/link';
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
        <Link href="/tracks/top" shallow passHref noUnderline>
          <Tab>
            <Heading size="sm" as="h2">
              Top Tracks
            </Heading>
          </Tab>
        </Link>
        <Link href="/artists/top" shallow passHref noUnderline>
          <Tab>
            <Heading size="sm" as="h2">
              Top Artists
            </Heading>
          </Tab>
        </Link>
      </TabList>
    </Tabs>
  );
};
