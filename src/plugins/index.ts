import { alias } from './alias';
import { circulars } from './circulars';
import { clean } from './clean';
import { externals } from './externals';
import { tsPaths } from './tsPaths';
import { typescript } from './typescript';

export const PLUGIN_BUILDERS = {
  alias,
  typescript,
  tsPaths,
  circulars,
  externals,
  clean,
};

export const DEFAULT_PLUGINS_ORDER = [
  'alias',
  'typescript',
  'tsPaths',
  'circulars',
  'externals',
  'clean',
];
