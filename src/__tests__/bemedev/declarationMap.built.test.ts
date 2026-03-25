import { IS_EXTENSION } from '../constants';
import { useBuild, useRebuild, useTests } from '../fixtures';

useBuild();

describe.skipIf(IS_EXTENSION)(
  'bemedev options - with declarationMap',
  () => {
    const { testCjs, testEsm } = useRebuild({
      declarationMap: true,
      sourcemap: true,
    });

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
        },
        '.js': {
          config: true,
          constants: true,
          index: true,
          input: true,
          types: false,
          utils: true,
        },
        '.cjs': {
          config: false,
          constants: false,
          index: false,
          input: false,
          types: false,
          utils: false,
        },
        '.d.ts.map': {
          config: true,
          constants: true,
          index: true,
          input: true,
          types: true,
          utils: true,
        },
        '.js.map': {
          config: true,
          constants: true,
          input: true,
          types: false,
          utils: true,
        },
        '.cjs.map': {
          config: false,
          constants: false,
          input: false,
          types: false,
          utils: false,
        },
      }),
    );

    test('#1 Write commonjs', ...testCjs());

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
        },
        '.js': {
          config: true,
          constants: true,
          index: true,
          input: true,
          types: false,
          utils: true,
        },
        '.cjs': {
          config: true,
          constants: true,
          index: true,
          input: true,
          types: false,
          utils: true,
        },
        '.d.ts.map': {
          config: true,
          constants: true,
          index: true,
          input: true,
          types: true,
          utils: true,
        },
        '.js.map': {
          config: true,
          constants: true,
          input: true,
          types: false,
          utils: true,
        },
        '.cjs.map': {
          config: true,
          constants: true,
          input: true,
          types: false,
          utils: true,
        },
      }),
    );
  },
);
