export const DEFAULT_EXCLUDE = [
  '**/__tests__/**/*',
  '**/*.test.ts',
  '**/*.test-d.ts',
  '**/*.fixtures.ts',
  '**/fixtures.ts',
  'src/fixtures/**/*.ts',
];

export const DEFAULT_CIRCULAR_DEPS = [
  '**/types.ts',
  '**/type.ts',
  '**/*.types.ts',
  '**/*.type.ts',
];

export const IGNORE = DEFAULT_EXCLUDE.concat(DEFAULT_CIRCULAR_DEPS);

export const DEFAULT_DIR = 'lib';

export const WARNING_CODES = {
  EMPTY_BUNDLE: 'EMPTY_BUNDLE',
  CIRCULAR_DEPENDENCY: 'CIRCULAR_DEPENDENCY',
};
