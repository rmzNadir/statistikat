import styled from '@emotion/styled';

export const Header = styled.header`
  width: 100%;
  display: flex;
  justify-content: center;
  min-width: 0;
  position: relative;
  z-index: ${({ theme }) => theme.zIndices.modal + 1};
`;

export const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.space[5]};
  width: 100%;
  min-height: ${({ theme }) => theme.space[20]};
  min-width: 0;

  padding: ${({ theme }) => theme.space[5]};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.space[8]};
  }

  & h1 {
    line-height: 1;
    position: relative;
    padding-left: ${({ theme }) => theme.space[10]};

    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      padding-left: ${({ theme }) => theme.space[12]};
    }

    &:before {
      content: '🐈‍⬛';
      position: absolute;
      left: -3%;
      bottom: 15%;
    }
  }
`;
