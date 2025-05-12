import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['lib/*.ts'],
  format: ['esm'],
  dts: true,
  clean: true,
  target: 'node14',
  outDir: 'dist',
  treeshake: true,
})
