import type { ButtonProps } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import type { FC } from 'react';

type Props = Omit<
  ButtonProps,
  'variant' | 'fontSize' | '_hover' | 'textTransform'
>;

export const LinkButton: FC<Props> = ({ children, ...props }) => (
  <Button
    variant="link"
    fontSize="sm"
    _hover={{ textDecoration: 'none' }}
    textTransform="uppercase"
    {...props}
  >
    {children}
  </Button>
);
