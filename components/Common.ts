import type { Theme } from '@emotion/react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { hexToRgb } from '@utils/hexToRGB';

export const getGlassmorphism = (theme: Theme) => css`
  background: rgba(${hexToRgb(theme.colors.white).toString()}, 0.05);
  border-radius: ${theme.radii.md};
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(1px);
  -webkit-backdrop-filter: blur(1px);
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: ${({ theme }) => theme.space[2]};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

export const ItemGrid = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: ${({ theme }) => theme.space[2]};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    display: block;
  }
`;
