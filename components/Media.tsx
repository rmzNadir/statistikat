import { createMedia } from '@artsy/fresnel';
import { theme } from '@config/theme';

const breakpointsInPixels = Object.fromEntries(
  Object.entries(theme.breakpoints).map(([key, val]) => {
    const emValue = parseInt(val.replace('em', ''), 10);
    // 16 is base rem value
    return [key, emValue * 16];
  }),
);

const ExampleAppMedia = createMedia({
  breakpoints: breakpointsInPixels,
});

export const mediaStyle = ExampleAppMedia.createMediaStyle();
export const { Media, MediaContextProvider } = ExampleAppMedia;
