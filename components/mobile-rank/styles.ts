import styled from '@emotion/styled';

export const Container = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  & > div {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    // 2 space from ChildrenContainer's left-padding, 2 space from item ItemGrid gap
    max-height: ${({ theme }) => `calc(100% - ${theme.space[6]})`};
    aspect-ratio: 1;
  }
`;
