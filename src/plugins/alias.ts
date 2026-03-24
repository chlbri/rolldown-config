import type { Plugin } from 'rolldown';
//@ts-expect-error for bundling
import tscAlias from 'rollup-plugin-tsc-alias';

export type AliasOptions = {
  /** path to tsconfig.json (relative to CWD) */
  configFile?: string;
  /** Observe file changes */
  watch?: boolean;
  /** Override outDir (relative path to tsconfig location) */
  outDir?: string;
  /** Override declarationDir (relative path to tsconfig location) */
  declarationDir?: string;
  /** Replace incomplete import paths with fully resolved paths (ESM compat) */
  resolveFullPaths?: boolean;
  /** Deprecated option; kept for compatibility */
  silent?: boolean;
  /** Extra replacer files to load */
  replacers?: string[];
  /** Custom output sink for tsc-alias logs */
  output?: unknown;
};

/**
 * Creates a configured tsc-alias plugin instance
 * @param options - Configuration options for tsc-alias
 * @returns Rolldown plugin
 */
export function alias(options: AliasOptions = {}): Plugin {
  return tscAlias(options);
}
