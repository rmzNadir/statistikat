import { Box } from '@chakra-ui/react';
import styled from '@emotion/styled';

import NextImage from 'next/image';
import { getGlassmorphism } from '@components/Common';

export const BaseCard = styled(Box)`
  ${({ theme }) => getGlassmorphism(theme)}
  padding: ${({ theme }) => theme.space[4]};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[2]};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: row;
    min-width: 0;
    padding: ${({ theme }) => theme.space[2]};

    & > .card-actions:last-child {
      margin-left: auto;
      align-self: center;
    }
  }
`;

export const BaseCardImage = styled(NextImage)`
  border-radius: ${({ theme }) => theme.radii.md};
  object-fit: cover;
  aspect-ratio: 1;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    max-width: ${({ theme }) => theme.sizes[12]};
  }
`;

export const BaseCardContent = styled(Box)`
  overflow: hidden;
`;
