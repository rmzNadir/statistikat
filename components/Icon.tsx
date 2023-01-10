import type { ComponentWithAs, IconProps } from '@chakra-ui/react';
import { Icon as BaseIcon } from '@chakra-ui/react';

export const Icon: ComponentWithAs<
  'svg',
  Omit<IconProps, 'boxSize' | 'verticalAlign' | 'fill' | 'fillOpacity'>
> = (props) => {
  const mergedProps: IconProps = {
    ...props,
    boxSize: 5,
    verticalAlign: '-4px',
    fillOpacity: '0.25',
    fill: 'currentcolor',
  };

  return <BaseIcon {...mergedProps} />;
};
