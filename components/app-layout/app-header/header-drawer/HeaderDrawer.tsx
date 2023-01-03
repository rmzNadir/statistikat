import { HamburgerIcon } from '@chakra-ui/icons';
import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  IconButton,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { useRef } from 'react';

import { HeaderActions } from '@components/app-layout/app-header/header-actions';
import { theme } from '@config/theme';
import { DrawerContent, HeaderDrawerContainer } from './styles';
import { ThemeToggleButton } from '../theme-toggle-button';

export const HeaderDrawer = () => {
  const { isOpen, onClose, onToggle } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);
  const backgroundColor = useColorModeValue(
    theme.colors.white,
    theme.colors.gray[800],
  );

  const appHeaderHeight =
    typeof window === 'undefined'
      ? 0
      : document.getElementById('app-header')?.clientHeight;

  return (
    <HeaderDrawerContainer>
      <ThemeToggleButton />
      <IconButton
        aria-label="open menu"
        icon={<HamburgerIcon />}
        onClick={onToggle}
        ref={btnRef}
      />
      <Drawer
        placement="top"
        onClose={onClose}
        isOpen={isOpen}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent
          style={{ top: appHeaderHeight, backgroundColor }}
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
