import type { Theme } from '@emotion/react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { hexToRgb } from '@utils/hexToRGB';

export const getGlassmorphism = (
  theme: Theme,
  bgColor: 'black' | 'white',
) => css`
  background: rgba(${hexToRgb(theme.colors[bgColor]).toString()}, 0.05);
  border-radius: ${theme.radii.md};
  backdrop-filter: blur(1px);
  -webkit-backdrop-filter: blur(1px);
`;

const getDynamicFlexWith = (theme: Theme, noOfItems: number) => css`
  max-width: calc((100% - ${theme.space[2]} * ${noOfItems - 1}) / ${noOfItems});
  flex: 1 1 calc((100% - ${theme.space[2]} * ${noOfItems - 1}) / ${noOfItems});
`;

export const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space[2]};
  justify-content: center;
  width: 100%;

  & > * {
    min-height: 100%;
    ${({ theme }) => getDynamicFlexWith(theme, 6)}
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.xl}) {
    & > * {
      ${({ theme }) => getDynamicFlexWith(theme, 4)}
    }
  }

  @media (max-width: 60rem) {
    & > * {
      ${({ theme }) => getDynamicFlexWith(theme, 3)}
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

export const SectionGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[6]};
`;
