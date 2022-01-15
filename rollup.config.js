import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'

const terserOptions = {
  compress: {
    warnings: false,
    comparisons: false,
    inline: 2
  },
  mangle: {
    safari10: true
  },
  output: {
    comments: false,
    ascii_only: true
  }
}

export default [
  {
    preserveModules: true,
    input: ['index.ts'],
    output: [{ dir: 'build', format: 'esm', entryFileNames: '[name].mjs' }],
    external: [
      '@noshot/env',
      'chalk',
      'fs',
      'child_process',
      'path',
      'playwright',
      'process'
    ],
    plugins: [
      typescript({ tsconfig: './tsconfig.prod.json' }),
      terser(terserOptions)
    ]
  }
]
