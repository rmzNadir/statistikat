import type { IconButtonProps } from '@chakra-ui/react';
import { IconButton } from '@chakra-ui/react';
import type { FC } from 'react';
import { BaseCard, CardImage } from './styles';

type CardActionProps = IconButtonProps;

const CardAction: FC<CardActionProps> = (props) => <IconButton {...props} />;

interface ChildElements {
  Image: typeof CardImage;
  Action: typeof CardAction;
}

// Hmm...
const Card = BaseCard as typeof BaseCard & ChildElements;

Card.Image = CardImage;
Card.Action = CardAction;

export { Card };
