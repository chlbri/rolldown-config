import type { BuildInput_F } from './types';
import { globSync } from 'glob';
import { extname, relative } from 'node:path';
import { DEFAULT_EXCLUDE } from './constants';

export const buildInput: BuildInput_F = (...ignores) =>
  Object.fromEntries(
    globSync('src/**/*.ts', {
      ignore: DEFAULT_EXCLUDE.concat(ignores),
    }).map(file => {
      const key = relative(
        'src',
        file.slice(0, file.length - extname(file).length),
      );
      const value = `${process.cwd()}/${file}`;

      return [key, value];
    }),
  );
