import styled from '@emotion/styled';

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(225px, 1fr));
  gap: ${({ theme }) => theme.space[2]};
`;
