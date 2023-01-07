import styled from '@emotion/styled';

export const LayoutContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > * {
    width: 100%;
    max-width: ${({ theme }) => theme.breakpoints.xl};
  }

  & > div {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
  }
`;

export const LayoutMainContainer = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  padding: 0 ${({ theme }) => theme.space[5]};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    gap: ${({ theme }) => theme.space[4]};
    padding: 0 ${({ theme }) => theme.space[8]};
  }
`;

export const LayoutMain = styled.main`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  border-radius: ${({ theme }) => theme.radii.md};
`;

export const ChildrenContainer = styled.div`
  flex: 1 1 auto;
  padding: ${({ theme }) => theme.space[5]};
  border-radius: ${({ theme }) => theme.radii.md};
  position: relative;
`;
