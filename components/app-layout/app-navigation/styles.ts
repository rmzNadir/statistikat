import { TabList as ChakraTabList } from '@chakra-ui/react';
import styled from '@emotion/styled';

import { theme } from '@config/theme';

export const TabList = styled(ChakraTabList)`
  padding: ${theme.space[2]};
`;
