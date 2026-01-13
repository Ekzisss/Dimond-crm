import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import importPlugin from 'eslint-plugin-import';
import tseslint from 'typescript-eslint';
import { jsdoc } from 'eslint-plugin-jsdoc';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],

    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      importPlugin.flatConfigs.react,
      jsdoc({
        config: 'flat/recommended',
        rules: {
          'jsdoc/require-jsdoc': [
            'error',
            {
              contexts: ['TSPropertySignature', 'TSIndexSignature', 'TSMethodSignature', 'TSEnumMember'],
            },
          ],

          // Требовать осмысленное описание для каждого поля
          'jsdoc/require-property-description': 'error',

          // (опционально) запретить пустые /** */
          'jsdoc/require-description': 'error',
        },
      }),
    ],

    rules: {
      'import/order': ['error', { 'newlines-between': 'always' }],
    },

    // rules: {
    //   'import/order': [
    //     'error',
    //     {
    //       groups: [
    //         'builtin', // fs, path
    //         'external', // react, lodash
    //         'internal', // @/shared
    //         'parent', // ../
    //         'sibling', // ./
    //         'index',
    //       ],
    //       'newlines-between': 'always',
    //       alphabetize: {
    //         order: 'asc',
    //         caseInsensitive: true,
    //       },
    //     },
    //   ],
    // },

    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.browser,
    },
  },
]);
