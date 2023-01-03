import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react';

export const ThemeToggleButton = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const Icon = useColorModeValue(MoonIcon, SunIcon);

  return (
    <IconButton
      aria-label={`switch to ${colorMode === 'light' ? 'dark' : 'light'} theme`}
      icon={<Icon />}
      onClick={toggleColorMode}
    />
  );
};
