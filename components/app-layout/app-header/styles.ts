import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const Header = styled.header`
  position: relative;
  z-index: ${({ theme }) => theme.zIndices.modal + 1};
`;

export const HeaderContent = styled(motion.div)`
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
    min-height: 2rem;
    line-height: 1;
    position: relative;
    padding-left: ${({ theme }) => theme.space[10]};

    &:before {
      font-size: ${({ theme }) => theme.fontSizes['3xl']};
      content: '🐈‍⬛';
      position: absolute;
      right: 35%;
      left: -2%;
      bottom: 10%;
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      padding-left: ${({ theme }) => theme.space[12]};

      &:before {
        font-size: ${({ theme }) => theme.fontSizes['4xl']};
      }
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
      font-size: 0;

      &:before {
        left: -10%;
      }
    }
  }
`;
