import { IconButton } from '@chakra-ui/react';
import type { Variants } from 'framer-motion';
import { motion, useAnimation } from 'framer-motion';
import type { ImageProps } from 'next/image';
import type { FC } from 'react';
import { BaseCard, BaseCardContent, BaseCardImage } from './styles';

const animationVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

interface CardImageProps extends ImageProps {
  disableAnimation: boolean;
}

const CardImage: FC<CardImageProps> = ({ disableAnimation, ...props }) => {
  const animationControls = useAnimation();

  return (
    <motion.div
      initial={disableAnimation ? 'visible' : 'hidden'}
      animate={animationControls}
      variants={animationVariants}
      transition={{ duration: 0.15 }}
    >
      <BaseCardImage
        {...props}
        onLoad={() => animationControls.start('visible')}
      />
    </motion.div>
  );
};

interface ChildElements {
  Image: typeof CardImage;
  Action: typeof IconButton;
  Content: typeof BaseCardContent;
}

// Hmm...
const Card = BaseCard as typeof BaseCard & ChildElements;

Card.Image = CardImage;
Card.Action = IconButton;
Card.Content = BaseCardContent;

export { Card };
