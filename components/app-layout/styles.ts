import styled from '@emotion/styled';

export const LayoutContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 0;

  & > * {
    width: 100%;
    max-width: ${({ theme }) => theme.breakpoints.xl};
  }
`;

export const LayoutMainContainer = styled.div`
  height: 100%;

  padding: 0 ${({ theme }) => theme.space[5]};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    gap: ${({ theme }) => theme.space[4]};
    padding: 0 ${({ theme }) => theme.space[8]};
  }
`;

export const LayoutMain = styled.main`
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: ${({ theme }) => theme.radii.md};
`;

export const ChildrenContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: ${({ theme }) => theme.space[5]};
  border-radius: ${({ theme }) => theme.radii.md};
  position: relative;
`;
