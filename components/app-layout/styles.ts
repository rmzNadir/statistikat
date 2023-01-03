import styled from '@emotion/styled';

import { theme } from '@config/theme';

export const LayoutContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 0;

  & > * {
    width: 100%;
    max-width: ${theme.breakpoints.xl};
  }
`;

export const LayoutMainContainer = styled.div`
  height: 100%;

  padding: 0 ${theme.space[5]};

  @media (min-width: ${theme.breakpoints.md}) {
    gap: ${theme.space[4]};
    padding: 0 ${theme.space[8]};
  }
`;

export const LayoutMain = styled.main`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: ${theme.space[5]};
  border-radius: ${theme.radii.md};
  padding: 0 ${theme.space[5]} ${theme.space[5]};
`;

export const ChildrenContainer = styled.div`
  width: 100%;
  height: 100%;
`;
