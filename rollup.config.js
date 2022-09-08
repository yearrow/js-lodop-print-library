/* eslint-disable no-tabs */
import { nodeResolve } from '@rollup/plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import pkg from './package.json';
import { terser } from 'rollup-plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
const bebalConf = babel({
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        useBuiltIns: 'usage',
        corejs: 3,
        targets: {
          node: '12'
        }
      }
    ]
  ],
  exclude: 'node_modules/**',
  extensions: ['.js', '.cjs', '.mjs', '.jsx']
});

export default [
  {
    input: 'src/index.js',
    output: {
      name: 'lodopPrint',
      file: pkg.browser,
      format: 'iife'
    },
    plugins: [
      nodeResolve({
        browser: true
      }),
      bebalConf,
      commonjs(),
      // terser()
    ]
  },
  {
    input: 'src/index.js',
    external: ['lodash/defaultsDeep'],
    plugins: [
      nodeResolve({
        browser: true
      }),
      bebalConf,
      commonjs(),
      // terser()
    ],
    output: [
      { file: pkg.module, format: 'es' }
    ]
  }
];
