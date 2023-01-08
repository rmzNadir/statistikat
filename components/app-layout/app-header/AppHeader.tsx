import { Heading, useColorModeValue } from '@chakra-ui/react';
import { Link } from '@components/link';
import { Media } from '@components/Media';
import { theme } from '@config/theme';
import { HeaderActions } from './header-actions';
import { HeaderDrawer } from './header-drawer';
import { Header, HeaderContent } from './styles';

export const AppHeader = () => {
  const backgroundColor = useColorModeValue(
    theme.colors.white,
    theme.colors.gray[800],
  );

  return (
    <Header id="app-header" style={{ backgroundColor }}>
      <HeaderContent>
        <Link href="/" noUnderline>
          <Heading as="h1">StatistiKat</Heading>
        </Link>
        <Media lessThan="md">
          <HeaderDrawer />
        </Media>
        <Media greaterThanOrEqual="md">
          <HeaderActions />
        </Media>
      </HeaderContent>
    </Header>
  );
};
