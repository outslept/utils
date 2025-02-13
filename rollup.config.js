import pluginAlias from '@rollup/plugin-alias'
import pluginCjs from '@rollup/plugin-commonjs'
import pluginJson from '@rollup/plugin-json'
import pluginNodeResolve from '@rollup/plugin-node-resolve'
import pluginDts from 'rollup-plugin-dts'
import pluginEsbuild from 'rollup-plugin-esbuild'

const entries = [
  'src/index.ts',
]

const plugins = [
  pluginAlias({
    entries: [
      { find: /^node:(.+)$/, replacement: '$1' },
    ],
  }),
  pluginNodeResolve({
    preferBuiltins: true,
  }),
  pluginJson(),
  pluginCjs(),
  pluginEsbuild({
    target: 'node14',
  }),
]

export default [
  ...entries.map(input => ({
    input,
    output: [
      {
        file: input.replace('src/', 'dist/').replace('.ts', '.mjs'),
        format: 'esm',
      },
      {
        file: input.replace('src/', 'dist/').replace('.ts', '.cjs'),
        format: 'cjs',
      },
    ],
    external: [],
    plugins,
  })),
  ...entries.map(input => ({
    input,
    output: [
      {
        file: input.replace('src/', 'dist/').replace('.ts', '.d.mts'),
        format: 'esm',
      },
      {
        file: input.replace('src/', 'dist/').replace('.ts', '.d.ts'),
        format: 'esm',
      },
      {
        file: input.replace('src/', 'dist/').replace('.ts', '.d.cts'),
        format: 'cjs',
      },
    ],
    external: [],
    plugins: [
      pluginDts({ respectExternal: true }),
    ],
  })),
]
