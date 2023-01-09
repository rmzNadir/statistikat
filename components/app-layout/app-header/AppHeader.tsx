import { Heading, useColorModeValue } from '@chakra-ui/react';
import { useAnimation } from 'framer-motion';
import { Link } from '@components/link';
import { Media } from '@components/Media';
import { theme } from '@config/theme';
import { HeaderActions } from './header-actions';
import { HeaderDrawer } from './header-drawer';
import { Header, HeaderContent } from './styles';

const animationVariants = {
  drawerOpen: { paddingRight: 0 },
  drawerClosed: { paddingRight: theme.space[5] },
};

export const AppHeader = () => {
  const animationControls = useAnimation();
  const backgroundColor = useColorModeValue(
    theme.colors.white,
    theme.colors.gray[800],
  );

  const onDrawerToggle = (isOpen: boolean) => {
    const isScrollbarPresent =
      document.body.scrollHeight > document.body.clientHeight;

    if (!isScrollbarPresent) {
      return;
    }

    if (isOpen) {
      animationControls.start('drawerOpen');
      return;
    }

    animationControls.start('drawerClosed');
  };

  return (
    <Header id="app-header" style={{ backgroundColor }}>
      <HeaderContent
        initial="drawerClosed"
        animate={animationControls}
        variants={animationVariants}
        transition={{ duration: 0.25 }}
      >
        <Link href="/" noUnderline>
          <Heading as="h1">StatistiKat</Heading>
        </Link>
        <Media lessThan="md">
          <HeaderDrawer onDrawerToggle={onDrawerToggle} />
        </Media>
        <Media greaterThanOrEqual="md">
          <HeaderActions />
        </Media>
      </HeaderContent>
    </Header>
  );
};
