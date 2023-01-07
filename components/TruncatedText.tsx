import type { TextProps } from '@chakra-ui/react';
import { Text, Tooltip } from '@chakra-ui/react';
import type { ReactNode } from 'react';
import { useRef, useState } from 'react';
import { useIsOverflown } from '@hooks/useIsOverflown';
import { useOnPressedOutside } from '@hooks/useOnPressedOutside';

interface Props extends TextProps {
  children: ReactNode;
  noOfLines: number;
}

export const TruncatedText = ({ children, noOfLines, ...textProps }: Props) => {
  const textElementRef = useRef<HTMLParagraphElement>(null);
  const isOverflown = useIsOverflown(textElementRef);

  const [isPressingTooltip, setIsPressingTooltip] = useState(false);
  const [isHoveringTooltip, setIsHoveringTooltip] = useState(false);

  useOnPressedOutside(textElementRef, () => setIsPressingTooltip(false));

  const isMobile =
    typeof window === 'object' &&
    window.matchMedia('(pointer: coarse)').matches;

  const shouldShowTooltip = () => {
    if (!isOverflown) {
      return false;
    }

    const definingCondition = isMobile ? isPressingTooltip : isHoveringTooltip;

    return definingCondition || false;
  };

  const handlePress = () => {
    setIsPressingTooltip((isPT) => !isPT);
  };

  const handleMouseEnter = () => {
    setIsHoveringTooltip(true);
  };

  const handleMouseLeave = () => {
    setIsHoveringTooltip(false);
  };

  return (
    <Tooltip label={children} isOpen={shouldShowTooltip()} placement="top">
      <Text
        noOfLines={noOfLines}
        {...textProps}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handlePress}
        ref={textElementRef}
      >
        {children}
      </Text>
    </Tooltip>
  );
};
