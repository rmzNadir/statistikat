import styled from '@emotion/styled';

export const AppFooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space[5]};
  width: 100%;

  padding: ${({ theme }) =>
    `${theme.space[7]} ${theme.space[5]} ${theme.space[5]}`};
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) =>
      `${theme.space[10]} ${theme.space[8]} ${theme.space[8]}`};
  }
`;
