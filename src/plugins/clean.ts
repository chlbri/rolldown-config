import { globSync } from 'glob';
import { relative } from 'node:path';
import type { RolldownPluginOption } from 'rolldown';
import { WARNING_CODES } from '../constants';
import { cleanupJS, withoutExtension } from '../helpers';
import { toArray } from '../utils';

export type EndPluginOptions = {
  ignoresJS?: string | string[];
  sourcemap?: boolean;
  dir?: string;
};

export const clean = (options: EndPluginOptions = {}) => {
  const { ignoresJS, sourcemap = false, dir = '' } = options;

  const _ignoresJS = toArray(ignoresJS);

  const out = {
    name: 'end-bemedev',

    onLog: {
      handler: (_, { code, names }) => {
        const EMPTY_CHUNKS = _ignoresJS
          .map(f => globSync(f, { nodir: true }))
          .flat()
          .map(withoutExtension)
          .map(file => relative('src', file));

        const check =
          code === WARNING_CODES.EMPTY_BUNDLE &&
          names?.every(name => EMPTY_CHUNKS.includes(name));

        if (check) {
          const STARS = '*'.repeat(20);
          console.log(STARS);
          console.log('[end-bemedev] Skipping empty chunk warnings for:');
          names?.forEach(name => console.log(`  -> 📄 ${name}`));
          console.log(STARS);
          return false;
        }

        return;
      },
    },

    closeBundle: {
      order: 'post',
      handler: () => {
        if (_ignoresJS.length > 0) {
          try {
            const files = new Set<string>();
            _ignoresJS.forEach(pat => {
              const globs = globSync(pat, { nodir: true });
              globs.forEach(file => files.add(file));
            });
            cleanupJS(files, dir, sourcemap);
            console.log('Build finished');
            /* v8 ignore next 3 */
          } catch (err) {
            console.error('[end-bemedev] cleanup failed:', err);
          }
        }
      },
    },
  } satisfies RolldownPluginOption;

  return out;
};
