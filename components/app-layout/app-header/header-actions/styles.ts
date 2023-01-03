import styled from '@emotion/styled';

import { theme } from '@config/theme';

export const HeaderActionsContainer = styled.div`
  display: flex;
  gap: ${theme.space[3]};

  @media (max-width: ${theme.breakpoints.md}) {
    flex-direction: column;

    & > * {
      width: 100%;
    }
  }
`;
