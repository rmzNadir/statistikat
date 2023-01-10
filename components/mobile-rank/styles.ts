import styled from '@emotion/styled';

export const Container = styled.div`
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  // Had to replace responsive styles due to mobile safari bug, since the
  // card size is a constant in mobile due to word wrap this is fine.
  // Card height is 4 rem - 0.5rem from ItemGrid's gap - 0.75rem from ChildrenContainer's padding
  width: 2.75rem;
  // Correct extra 0.5rem from 0.5rem - 0.75rem
  padding-right: 0.25rem;
`;
