import type { LinkProps as ChakraLinkProps } from '@chakra-ui/react';
import { Link as ChakraLink } from '@chakra-ui/react';
import NextLink from 'next/link';
import type { FC, ReactNode } from 'react';

export interface LinkProps extends ChakraLinkProps {
  children: ReactNode;
  noUnderline?: boolean;
  href: string;
}

export const Link: FC<LinkProps> = ({
  children,
  noUnderline,
  href,
  ...props
}) => (
  <ChakraLink
    href={href}
    as={NextLink}
    style={{ textDecoration: noUnderline ? 'none' : undefined }}
    {...props}
  >
    {children}
  </ChakraLink>
);
