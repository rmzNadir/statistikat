import {
  Drawer,
  DrawerBody,
  IconButton,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import type { FC } from 'react';
import { useRef } from 'react';

import { Menu } from 'tabler-icons-react';
import { HeaderActions } from '@components/app-layout/app-header/header-actions';
import { Icon } from '@components/Icon';
import { theme } from '@config/theme';
import { DrawerContent, DrawerOverlay, HeaderDrawerContainer } from './styles';
import { ThemeToggleButton } from '../theme-toggle-button';

interface Props {
  onDrawerToggle(isDrawerOpen: boolean): void;
}

export const HeaderDrawer: FC<Props> = ({ onDrawerToggle }) => {
  const { isOpen, onClose, onToggle } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);
  const backgroundColor = useColorModeValue(
    theme.colors.white,
    theme.colors.gray[800],
  );

  const handleToggleDrawer = () => {
    onToggle();
    onDrawerToggle(!isOpen);
  };

  const appHeaderHeight =
    typeof window === 'undefined'
      ? 0
      : document.getElementById('app-header')?.clientHeight ?? 0;

  return (
    <HeaderDrawerContainer>
      <ThemeToggleButton />
      <IconButton
        aria-label="open menu"
        icon={<Icon as={Menu} />}
        onClick={handleToggleDrawer}
        ref={btnRef}
      />
      <Drawer
        placement="top"
        onClose={onClose}
        onOverlayClick={() => onDrawerToggle(false)}
        isOpen={isOpen}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay appHeaderHeight={appHeaderHeight} />
        <DrawerContent
          appHeaderHeight={appHeaderHeight}
          backgroundColor={backgroundColor}
          transition="ease-in"
        >
          <DrawerBody>
            <HeaderActions />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </HeaderDrawerContainer>
  );
};
