import type { TextProps } from '@chakra-ui/react';
import { Text, Tooltip } from '@chakra-ui/react';
import type { ReactNode } from 'react';
import { useRef } from 'react';
import { useIsOverflown } from '@hooks/useIsOverflown';

interface Props extends TextProps {
  children: ReactNode;
  noOfLines: number;
}

export const TruncatedText = ({ children, noOfLines, ...textProps }: Props) => {
  const textElementRef = useRef<HTMLParagraphElement>(null);
  const isOverflown = useIsOverflown(textElementRef);

  return (
    <Tooltip label={children} isDisabled={!isOverflown} placement="top">
      <Text noOfLines={noOfLines} {...textProps} ref={textElementRef}>
        {children}
      </Text>
    </Tooltip>
  );
};
