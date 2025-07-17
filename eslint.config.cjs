const js = require('@eslint/js');
const parser = require('@typescript-eslint/parser');
const prettier = require('eslint-plugin-prettier');

/** @type {import("eslint").Linter.FlatConfig[]} */
module.exports = [
  js.configs.recommended,

  {
    languageOptions: {
      globals: {
        console: true,
        process: true,
        module: true,
        require: true,
        __dirname: true,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },

  {
    files: ['**/*.ts'],
    languageOptions: {
      parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      prettier,
    },
    rules: {
      'prettier/prettier': 'error',
    },
  },

  {
    files: ['tests/**/*.ts'],
    languageOptions: {
      globals: {
        describe: true,
        it: true,
        expect: true,
        beforeAll: true,
        afterAll: true,
        beforeEach: true,
        afterEach: true,
      },
    },
  },

  {
    ignores: ['node_modules', 'dist'],
  },
];
