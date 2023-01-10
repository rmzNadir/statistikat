import type { As, LinkProps as ChakraLinkProps } from '@chakra-ui/react';
import { Link as ChakraLink, forwardRef } from '@chakra-ui/react';
import NextLink from 'next/link';
import type { ReactNode } from 'react';

export interface LinkProps extends ChakraLinkProps {
  children: ReactNode;
  noUnderline?: boolean;
  href: string;
}

export const Link = forwardRef<LinkProps, As<unknown>>(
  ({ href, noUnderline, children, ...props }, ref) => (
    <ChakraLink
      ref={ref}
      href={href}
      as={NextLink}
      style={{ textDecoration: noUnderline ? 'none' : undefined }}
      {...props}
    >
      {children}
    </ChakraLink>
  ),
);
