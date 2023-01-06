// emotion.d.ts
import '@emotion/react';
import type { Theme as CustomTheme } from '@config/theme';

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends CustomTheme {}
}
