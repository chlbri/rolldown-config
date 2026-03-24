import type { OutputOptions } from 'rolldown';

export const buildOutput = (dir: string, sourcemap: boolean) => {
  return [
    {
      format: 'es',
      sourcemap,
      preserveModulesRoot: 'src',
      dir,
      preserveModules: true,
      entryFileNames: '[name].js',
    },
    {
      format: 'cjs',
      sourcemap,
      preserveModulesRoot: 'src',
      dir,
      preserveModules: true,
      entryFileNames: '[name].cjs',
    },
  ] as const satisfies OutputOptions[];
};
