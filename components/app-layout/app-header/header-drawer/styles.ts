import {
  DrawerContent as ChakraDrawerContent,
  DrawerOverlay as ChakraDrawerOverlay,
} from '@chakra-ui/react';
import styled from '@emotion/styled';

export const HeaderDrawerContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space[3]};
`;

interface DrawerContentProps {
  appHeaderHeight: number;
}
export const DrawerOverlay = styled(ChakraDrawerOverlay, {
  shouldForwardProp: (prop) => prop !== 'appHeaderHeight',
})<DrawerContentProps>`
  top: ${({ appHeaderHeight }) => appHeaderHeight}px !important;
`;

export const DrawerContent = styled(ChakraDrawerContent, {
  shouldForwardProp: (prop) => prop !== 'appHeaderHeight',
})<DrawerContentProps>`
  padding: 0;
  top: ${({ appHeaderHeight }) => appHeaderHeight}px !important;
  & > div {
    padding: ${({ theme }) => `0 ${theme.space[3]} ${theme.space[3]}`};
  }
`;
