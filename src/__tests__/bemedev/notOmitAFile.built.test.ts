import { IS_EXTENSION } from '../constants';
import { path, useBuild, useRebuild, useTests } from '../fixtures';

useBuild();

describe.skipIf(IS_EXTENSION)('bemedev options', () => {
  const { testCjs, testEsm } = useRebuild({ sourcemap: true });

  test('#1 Write esm', ...testEsm());

  describe(
    '#2 => Check files',
    useTests({
      '.d.ts': {
        config: true,
        constants: true,
        index: true,
        input: true,
        types: true,
        utils: true,
        [path]: true,
      },
      '.js': {
        config: true,
        constants: true,
        index: true,
        input: true,
        types: false,
        utils: true,
        [path]: true,
      },
      '.cjs': {
        config: false,
        constants: false,
        index: false,
        input: false,
        types: false,
        utils: false,
        [path]: false,
      },
      '.d.ts.map': {
        config: false,
        constants: false,
        index: false,
        input: false,
        types: false,
        utils: false,
        [path]: false,
      },
      '.js.map': {
        config: true,
        constants: true,
        input: true,
        types: false,
        utils: true,
        [path]: true,
      },
      '.cjs.map': {
        config: false,
        constants: false,
        input: false,
        types: false,
        utils: false,
        [path]: false,
      },
    }),
  );

  test('#3 Write commonjs', ...testCjs());

  describe(
    '#4 => Checks files',
    useTests({
      '.d.ts': {
        config: true,
        constants: true,
        index: true,
        input: true,
        types: true,
        utils: true,
        [path]: true,
      },
      '.js': {
        config: true,
        constants: true,
        index: true,
        input: true,
        types: false,
        utils: true,
        [path]: true,
      },
      '.cjs': {
        config: true,
        constants: true,
        index: true,
        input: true,
        types: false,
        utils: true,
        [path]: true,
      },
      '.d.ts.map': {
        config: false,
        constants: false,
        index: false,
        input: false,
        types: false,
        utils: false,
        [path]: false,
      },
      '.js.map': {
        config: true,
        constants: true,
        input: true,
        types: false,
        utils: true,
        [path]: true,
      },
      '.cjs.map': {
        config: true,
        constants: true,
        input: true,
        types: false,
        utils: true,
        [path]: true,
      },
    }),
  );
});
