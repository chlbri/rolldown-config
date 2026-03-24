import { defineConfig } from '../../config';
import { path, useBuild, useBundle, useTests } from '../fixtures';

useBuild();

describe('bemedev omit "fileInt"', () => {
  const { writeCjs, writeEsm } = useBundle(
    defineConfig.bemedev({
      ignoresJS: `${process.cwd()}/src/**/${path}.ts`,
    }),
  );

  test('#1 Write esm', ...writeEsm);

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
        [path]: false,
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
        [path]: false,
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

  test('#3 Write commonjs', ...writeCjs);

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
        [path]: false,
      },
      '.cjs': {
        config: true,
        constants: true,
        index: true,
        input: true,
        types: false,
        utils: true,
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
        [path]: false,
      },
      '.cjs.map': {
        config: true,
        constants: true,
        input: true,
        types: false,
        utils: true,
        [path]: false,
      },
    }),
  );
});
