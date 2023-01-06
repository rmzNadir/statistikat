import { DrawerContent as ChakraDrawerContent } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const HeaderDrawerContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space[3]};
`;

export const DrawerContent = styled(ChakraDrawerContent)`
  padding: 0;

  & > div {
    padding: ${({ theme }) => `0 ${theme.space[4]} ${theme.space[5]}`};
  }
`;
