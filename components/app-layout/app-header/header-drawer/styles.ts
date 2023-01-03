import { DrawerContent as ChakraDrawerContent } from '@chakra-ui/react';
import styled from '@emotion/styled';

import { theme } from '@config/theme';

export const HeaderDrawerContainer = styled.div`
  display: flex;
  gap: ${theme.space[3]};
`;

export const DrawerContent = styled(ChakraDrawerContent)`
  padding: 0;

  & > div {
    padding: 0 ${theme.space[4]} ${theme.space[5]};
  }
`;
