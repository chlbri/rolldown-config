import type { RolldownPluginOption } from 'rolldown';
import { nodeExternals } from 'rollup-plugin-node-externals';

export type NodeExternalsOptions = Parameters<typeof nodeExternals>[0];

/**
 * Creates a configured node externals plugin instance
 * @param options - Configuration options for node externals
 * @returns Rolldown plugin
 */
export function externals(
  options: NodeExternalsOptions = {},
): RolldownPluginOption {
  return nodeExternals(options);
}
