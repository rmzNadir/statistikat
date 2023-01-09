import type { TextProps } from '@chakra-ui/react';
import { Text, Tooltip } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { isOverflown } from '@hooks/useIsOverflown';
import { useOnPressedOutside } from '@hooks/useOnPressedOutside';

export const TruncatedText = ({ children, ...textProps }: TextProps) => {
  const textElementRef = useRef<HTMLParagraphElement>(null);

  const [isPressingTooltip, setIsPressingTooltip] = useState(false);
  const [isHoveringTooltip, setIsHoveringTooltip] = useState(false);

  useOnPressedOutside(textElementRef, () => setIsPressingTooltip(false));

  const isMobile =
    typeof window === 'object' &&
    window.matchMedia('(pointer: coarse)').matches;

  const shouldShowTooltip = () => {
    if (!textElementRef.current || !isOverflown(textElementRef.current)) {
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
