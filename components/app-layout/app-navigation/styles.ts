import { Tab as ChakraTab } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const Tab = styled(ChakraTab)`
  padding: ${({ theme }) => theme.space[4]};
`;
