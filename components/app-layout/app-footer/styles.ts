import styled from '@emotion/styled';

import { theme } from '@config/theme';

export const AppFooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${theme.space[5]};
  width: 100%;

  padding: ${theme.space[7]} ${theme.space[5]} ${theme.space[5]};

  @media (min-width: ${theme.breakpoints.md}) {
    padding: ${theme.space[10]} ${theme.space[8]} ${theme.space[8]};
  }
`;
