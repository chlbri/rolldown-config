import { aliasTs } from '@bemedev/vitest-alias';
import { exclude } from '@bemedev/vitest-exclude';
import { defineConfig } from 'vitest/config';
import tsconfig from './tsconfig.json';

export default defineConfig({
  plugins: [
    aliasTs(tsconfig),
    exclude({
      ignoreCoverageFiles: ['**/index.ts', '**/types.ts', '**/*.types.ts'],
    }),
  ],
  test: {
    maxConcurrency: 10,
    passWithNoTests: true,
    slowTestThreshold: 3000,
    fileParallelism: false,
    globals: true,
    logHeapUsage: true,
    coverage: {
      enabled: true,
      extension: 'ts',
      reportsDirectory: '.coverage',
      all: true,
      provider: 'v8',
    },
  },
});
