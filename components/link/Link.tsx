import { Link as ChakraLink } from '@chakra-ui/react';
import NextLink, { type LinkProps as NextLinkProps } from 'next/link';
import type { FC, ReactNode } from 'react';

export interface LinkProps extends NextLinkProps {
  children: ReactNode;
  noUnderline?: boolean;
}

export const Link: FC<LinkProps> = ({ children, noUnderline, ...props }) => (
  <NextLink {...props} passHref>
    <ChakraLink style={{ textDecoration: noUnderline ? 'none' : undefined }}>
      {children}
    </ChakraLink>
  </NextLink>
);
