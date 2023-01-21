import styled from '@emotion/styled';

export const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[4]};
`;

export const SectionTitle = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;
