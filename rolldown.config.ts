import { defineConfig } from './src/config';

export default defineConfig.bemedev({
  circularDeps: [
    '**/src/helpers.ts',
    '**/src/plugins/index.ts',
    '**/src/plugins/clean.ts',
    '**/src/plugins/circulars.ts',
  ],
});
