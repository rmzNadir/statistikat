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
  gap: ${({ theme }) => theme.space[4]};
  padding: 0 ${({ theme }) => theme.space[6]};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0 ${({ theme }) => theme.space[3]};
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
  padding: ${({ theme }) => theme.space[6]};
  border-radius: ${({ theme }) => theme.radii.md};
  position: relative;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.space[3]};
  }
`;
