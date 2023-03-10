// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

const buildCommand = (command, filenames) =>
  `${command} ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`;

module.exports = {
  // Type check TypeScript files
  '**/*.(ts|tsx)': () => 'pnpm tsc --noEmit',

  // Lint & Prettify TS and JS files
  '**/*.(ts|tsx|js)': (filenames) => [
    buildCommand('next lint --fix --file', filenames),
    buildCommand('pnpm prettier --write', filenames),
  ],

  // Prettify only Markdown and JSON files
  '**/*.(md|json)': (filenames) =>
    `pnpm prettier --write ${filenames.join(' ')}`,
};
