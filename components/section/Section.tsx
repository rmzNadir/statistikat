import { Center, Heading } from '@chakra-ui/react';
import { motion, useAnimation } from 'framer-motion';
import type { FC, ReactNode } from 'react';
import { useState } from 'react';
import useMeasure from 'react-use-measure';
import { LinkButton } from '@components/LinkButton';
import { Media } from '@components/Media';
import { useSafeLayoutEffect } from '@hooks/useSafeLayoutEffect';
import { SectionContainer, SectionTitle } from './styles';

const getSafeHeight = (height: number) => {
  if (height === 0) {
    return 'auto';
  }

  return height;
};

interface Props {
  title: string;
  children: ReactNode;
  gridId?: string;
  mainItemCount?: number;
}

export const Section: FC<Props> = ({
  children,
  title,
  gridId,
  mainItemCount,
}) => {
  const animationControls = useAnimation();
  const [isOpen, setIsOpen] = useState(false);
  const [setContainerRef, containerBounds] = useMeasure();
  const [setFirstMainItemRef, firstMainItemBounds] = useMeasure();
  const [setLastMainItemRef, lastMainItemBounds] = useMeasure();
  const [isAnimatingUserAction, setIsAnimatingUserAction] = useState(false);

  const safeMaxHeight = getSafeHeight(containerBounds.height);

  const safeMinHeight = getSafeHeight(
    lastMainItemBounds.bottom - firstMainItemBounds.top,
  );

  const isVerticalResizeDisabled = !gridId || !mainItemCount;

  useSafeLayoutEffect(() => {
    if (isAnimatingUserAction || isVerticalResizeDisabled) {
      return;
    }

    animationControls.start({
      height: isOpen ? safeMaxHeight : safeMinHeight,
      transition: { duration: 0 },
    });
  }, [
    isAnimatingUserAction,
    isVerticalResizeDisabled,
    animationControls,
    isOpen,
    safeMaxHeight,
    safeMinHeight,
  ]);

  const handleToggleIsOpen = () => {
    const isOpening = !isOpen;

    setIsAnimatingUserAction(true);
    setIsOpen(isOpening);

    animationControls
      .start({
        height: isOpening ? safeMaxHeight : safeMinHeight,
      })
      .finally(() => setIsAnimatingUserAction(false));
  };

  return (
    <SectionContainer>
      <SectionTitle>
        <Heading size="lg">{title}</Heading>
        {mainItemCount && gridId && (
          <Media greaterThanOrEqual="md">
            <LinkButton onClick={handleToggleIsOpen}>
              {isOpen ? 'collapse' : 'show all'}
            </LinkButton>
          </Media>
        )}
      </SectionTitle>
      <motion.div
        animate={animationControls}
        transition={{ duration: 0.25 }}
        style={{ overflow: 'hidden' }}
      >
        <div
          ref={(ref) => {
            if (!gridId || !mainItemCount) return;

            setContainerRef(ref);

            // Lord forgive me for what I'm about to do
            const grid = document.getElementById(gridId);
            if (grid?.children[0]) {
              setFirstMainItemRef(grid.children[0] as HTMLElement);
            }
            if (grid?.children[mainItemCount - 1]) {
              setLastMainItemRef(
                grid.children[mainItemCount - 1] as HTMLElement,
              );
            }
          }}
        >
          {children}
        </div>
      </motion.div>
      <Media lessThan="md">
        {mainItemCount && gridId && (
          <Center pb="1">
            <LinkButton onClick={handleToggleIsOpen}>
              {isOpen ? 'collapse' : 'show all'}
            </LinkButton>
          </Center>
        )}
      </Media>
    </SectionContainer>
  );
};
