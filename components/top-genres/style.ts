import styled from '@emotion/styled';

export const TopGenresContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space[2]};
  overflow-x: scroll;
  padding-bottom: ${({ theme }) => theme.space[1]};
`;
