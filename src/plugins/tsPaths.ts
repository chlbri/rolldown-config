import type { RolldownPluginOption } from 'rolldown';
import tsConfigPaths from 'rollup-plugin-tsconfig-paths';

export type TsConfigPathsOptions = Parameters<typeof tsConfigPaths>[0];
/**
 * Creates a configured tsconfig-paths plugin instance
 * @param options - Configuration options for tsconfig-paths
 * @returns Rolldown plugin
 */
export function tsPaths(
  options: TsConfigPathsOptions = {},
): RolldownPluginOption {
  return tsConfigPaths(options);
}
