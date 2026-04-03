import type { RolldownPluginOption, RolldownOptions } from 'rolldown';

export type { RolldownOptions };
import type { PLUGIN_BUILDERS } from './plugins';

export type ToArray_F = <T>(value?: T | T[]) => T[];

export type Params = {
  circularDeps?: string | string[];
  excludesTS?: string | string[];
  ignoresJS?: string | string[];
  externals?: string | string[];
  dir?: string;
  sourcemap?: boolean;
  declarationMap?: boolean;
  plugins?: (RolldownPluginOption | keyof typeof PLUGIN_BUILDERS)[];
};

export type BuildInput_F = (
  ...ignores: string[]
) => Record<string, string>;

export type Config_F = {
  (additionals?: Params): RolldownOptions;
  bemedev: (additionals?: Params) => RolldownOptions;
  default: (additionals?: Params) => RolldownOptions;
};
