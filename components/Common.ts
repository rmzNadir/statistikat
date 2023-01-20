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
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space[2]};
  justify-content: center;
  width: 100%;

  & > * {
    min-height: 100%;
    max-width: ${({ theme }) => `calc((100% - ${theme.space[2]} * 5) / 6)`};
    flex: ${({ theme }) => `1 1 calc((100% - ${theme.space[2]} * 5) / 6)`};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.xl}) {
    & > * {
      max-width: ${({ theme }) => `calc((100% - ${theme.space[2]} * 5) / 5)`};
      flex: ${({ theme }) => `1 1 calc((100% - ${theme.space[2]} * 5) / 5)`};
    }
  }

  @media (max-width: 70rem) {
    & > * {
      max-width: ${({ theme }) => `calc((100% - ${theme.space[2]} * 5) / 4)`};
      flex: ${({ theme }) => `1 1 calc((100% - ${theme.space[2]} * 5) / 4)`};
    }
  }

  @media (max-width: 60rem) {
    & > * {
      max-width: ${({ theme }) => `calc((100% - ${theme.space[2]} * 5) / 3)`};
      flex: ${({ theme }) => `1 1 calc((100% - ${theme.space[2]} * 5) / 3)`};
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: grid;
    grid-template-columns: 1fr;

    & > * {
      max-width: unset;
      flex: unset;
    }
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
