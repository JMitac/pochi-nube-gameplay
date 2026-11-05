import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  platform: 'node',
  target: 'node24',
  outDir: 'dist',
  clean: true,
  sourcemap: true,
  // The shared package is TypeScript source, so it is bundled into the server build.
  noExternal: ['@pochi/shared'],
});
