import styled from '@emotion/styled';

import { theme } from '@config/theme';

export const Header = styled.header`
  width: 100%;
  display: flex;
  justify-content: center;
  min-width: 0;
  position: relative;
  z-index: ${theme.zIndices.modal + 1};
`;

export const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${theme.space[5]};
  width: 100%;
  min-height: ${theme.space[20]};
  min-width: 0;

  padding: ${theme.space[5]};

  @media (min-width: ${theme.breakpoints.md}) {
    padding: ${theme.space[8]};
  }

  & h1 {
    line-height: 1;
    position: relative;
    padding-left: ${theme.space[10]};

    @media (min-width: ${theme.breakpoints.md}) {
      padding-left: ${theme.space[12]};
    }

    &:before {
      content: '🐈‍⬛';
      position: absolute;
      left: -3%;
      bottom: 15%;
    }
  }
`;
