import { existsSync, writeFileSync } from 'node:fs';
import { rm } from 'node:fs/promises';
import { rolldown, type RolldownOptions } from 'rolldown';
import { toArray } from '../utils';
import { this1 } from '@bemedev/build-tests/constants';
import type { Params } from '../types';

export const WAITER = 100_000;

export const path = 'fileInt';

export const useBuild = () => {
  const cFile = `${process.cwd()}/src/${path}.ts`;
  const content = `export const A = 'A';`;
  writeFileSync(cFile, content);

  afterAll(async () => {
    await rm(cFile);
    return rm('./lib', { recursive: true, force: true });
  });

  beforeAll(() => {
    return rm('./lib', { recursive: true, force: true });
  });
};

export const useBundle = (options: RolldownOptions) => {
  const esm = toArray(options.output)[0];
  const cjs = toArray(options.output)[1];

  const writeEsm = [
    async () => {
      const out = await rolldown(options);
      await out.write(esm);
      await out.close();
    },
    WAITER,
  ] as const;
  const writeCjs = [
    async () => {
      const out = await rolldown(options);
      await out.write(cjs);
      await out.close();
    },
    WAITER,
  ] as const;

  return {
    writeEsm,
    writeCjs,
  };
};

type Options = Partial<{
  '.d.ts': Output;
  '.js': Output;
  '.cjs': Output;
  '.d.ts.map': Output;
  '.js.map': Output;
  '.cjs.map': Output;
}>;

type Output = Partial<
  {
    config: boolean;
    constants: boolean;
    input: boolean;
    types: boolean;
    utils: boolean;
  } & Record<string, boolean>
>;

export const useTests = (options: Options) => {
  const entries1 = Object.entries(options);

  const out = () => {
    return entries1.forEach(([ext, each], index) => {
      describe(`#${index + 1} => For "${ext}" files`, () => {
        const entries2 = Object.entries(each);

        entries2.forEach(([pathName, bool], index) => {
          const path = `${pathName}${ext}`;
          const existBool = bool ? 'exists' : "doesn't exist";
          const invite = `#${index + 1} The file "${path}" ${existBool}`;

          test(invite, () => {
            const file = `${process.cwd()}/lib/${path}`;
            const check = existsSync(file);

            expect(check).toBe(bool);
          });
        });
      });
    });
  };

  return out;
};

export const useRebuild = (additionals?: Params | undefined) => {
  let writeCjs: ReturnType<typeof useBundle>['writeCjs'];
  let writeEsm: ReturnType<typeof useBundle>['writeEsm'];

  beforeAll(async () => {
    const bemedev = await import(this1).then(
      ({ defineConfig }) => defineConfig.bemedev,
    );
    const bundle = useBundle(bemedev(additionals));
    writeCjs = bundle.writeCjs;
    writeEsm = bundle.writeEsm;
  });

  const testEsm = () => [() => writeEsm[0](), WAITER] as const;
  const testCjs = () => [() => writeCjs[0](), WAITER] as const;

  return {
    testEsm,
    testCjs,
  };
};
