'use strict';

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    requireConfigFile: false,
    babelOptions: {
      plugins: [
        ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true }],
      ],
    },
  },
  plugins: ['ember'],
  extends: [
    'eslint:recommended',
    'plugin:ember/recommended',
    'plugin:prettier/recommended',
  ],
  env: {
    browser: true,
  },
  rules: {},
  overrides: [
    // node files
    {
      files: [
        './.eslintrc.js',
        './.prettierrc.js',
        './.stylelintrc.js',
        './.template-lintrc.js',
        './ember-cli-build.js',
        './testem.js',
        './blueprints/*/index.js',
        './config/**/*.js',
        './lib/*/index.js',
        './server/**/*.js',
      ],
      parserOptions: {
        sourceType: 'script',
      },
      env: {
        browser: false,
        node: true,
      },
      extends: ['plugin:n/recommended'],
    },
    // test files
    {
      files: ['tests/**/*-test.{js,ts}'],
      extends: ['plugin:qunit/recommended'],
      rules: { 'ember/no-empty-glimmer-component-classes': 'off' },
    },
    // ts files
    {
      files: ['**/*.ts'],
      extends: ['@qonto/eslint-config-typescript'],
    },
  ],
  ignores: [
    '/blueprints/*/files/',
    '/vendor/',
    '/dist/',
    '/tmp/',
    '/bower_components/',
    '/node_modules/',
    '/coverage/',
    '!.*',
    '.*/',
    '.eslintcache',
    '/.node_modules.ember-try',
    '/bower.json.ember-try',
    '/npm-shrinkwrap.json.ember-try',
    '/package.json.ember-try',
    '/package-lock.json.ember-try',
    '/yarn.lock.ember-try',
  ],
};
