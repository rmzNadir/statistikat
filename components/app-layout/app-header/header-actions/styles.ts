import styled from '@emotion/styled';

export const HeaderActionsContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space[3]};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;

    & > * {
      width: 100%;
    }
  }
`;
