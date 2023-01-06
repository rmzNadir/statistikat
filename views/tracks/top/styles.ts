import styled from '@emotion/styled';

import { hexToRgb } from '@utils/hexToRGB';

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.space[2]};
`;

export const Card = styled.div`
  background: rgba(
    ${({ theme }) => hexToRgb(theme.colors.white).toString()},
    0.05
  );
  border-radius: ${({ theme }) => theme.radii.md};
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);

  padding: ${({ theme }) => theme.space[4]};
`;
