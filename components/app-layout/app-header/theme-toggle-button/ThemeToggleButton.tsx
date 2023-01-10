import { IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { MoonStars, SunHigh } from 'tabler-icons-react';
import { Icon } from '@components/Icon';

export const ThemeToggleButton = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const ThemeIcon = useColorModeValue(MoonStars, SunHigh);

  return (
    <IconButton
      aria-label={`switch to ${colorMode === 'light' ? 'dark' : 'light'} theme`}
      icon={<Icon as={ThemeIcon} />}
      onClick={toggleColorMode}
    />
  );
};
