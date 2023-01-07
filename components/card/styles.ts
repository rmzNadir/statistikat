import styled from '@emotion/styled';

import NextImage from 'next/image';
import { hexToRgb } from '@utils/hexToRGB';

export const BaseCard = styled.div`
  background: rgba(
    ${({ theme }) => hexToRgb(theme.colors.white).toString()},
    0.05
  );
  border-radius: ${({ theme }) => theme.radii.md};
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(1px);
  -webkit-backdrop-filter: blur(1px);
  padding: ${({ theme }) =>
    `${theme.space[4]} ${theme.space[4]} ${theme.space[3]}`};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[2]};
`;

export const CardImage = styled(NextImage)`
  aspect-ratio: 1;
  border-radius: ${({ theme }) => theme.radii.md};
  object-fit: cover;
`;
