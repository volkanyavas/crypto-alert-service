import js from '@eslint/js';
import prettier from 'eslint-plugin-prettier';
import parser from '@typescript-eslint/parser';

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
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
      parser: parser,
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
