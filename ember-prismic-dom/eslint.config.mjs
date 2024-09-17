import ember from 'eslint-plugin-ember';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import node from 'eslint-plugin-node';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  ...compat.extends(
    'eslint:recommended',
    'plugin:ember/recommended',
    'plugin:prettier/recommended',
  ),
  {
    plugins: {
      ember,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
      },

      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',

      parserOptions: {
        ecmaFeatures: {
          legacyDecorators: true,
        },

        babelOptions: {
          root: '/Users/juanjo.dominguez/qonto.github.com/ember-prismic-dom/ember-prismic-dom',
        },
      },
    },

    rules: {},
  },
  ...compat.extends('plugin:node/recommended').map((config) => ({
    ...config,

    files: [
      './.eslintrc.js',
      './.prettierrc.js',
      './.template-lintrc.js',
      './addon-main.js',
    ],
  })),
  {
    files: [
      './.eslintrc.js',
      './.prettierrc.js',
      './.template-lintrc.js',
      './addon-main.js',
    ],

    plugins: {
      node,
    },

    languageOptions: {
      globals: {
        ...Object.fromEntries(
          Object.entries(globals.browser).map(([key]) => [key, 'off']),
        ),
        ...globals.node,
      },

      ecmaVersion: 5,
      sourceType: 'commonjs',
    },
  },
  ...compat.extends('@qonto/eslint-config-typescript').map((config) => ({
    ...config,
    files: ['**/*.ts'],
  })),
];
