import { Heading, useColorModeValue, useMediaQuery } from '@chakra-ui/react';
import { Link } from '@components/link';
import { theme } from '@config/theme';
import { HeaderActions } from './header-actions';
import { HeaderDrawer } from './header-drawer';
import { Header, HeaderContent } from './styles';

export const AppHeader = () => {
  const [isMobile] = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);
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
        {isMobile ? <HeaderDrawer /> : <HeaderActions />}
      </HeaderContent>
    </Header>
  );
};
