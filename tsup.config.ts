import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['lib/*.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  target: 'node14',
  outDir: 'dist',
  splitting: true,
  treeshake: true,
  outExtension({ format }) {
    return {
      js: format === 'cjs' ? '.cjs' : '.mjs',
    }
  },
})
