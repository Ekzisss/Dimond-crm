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
          'jsdoc/require-property-description': 'error',
          'jsdoc/require-description': 'error',
          'jsdoc/require-param': 'off',
          'jsdoc/require-returns': 'off',
          'jsdoc/require-returns-type': 'off',
          'jsdoc/require-param-description': 'off',
          'jsdoc/require-param-type': 'off',
          'jsdoc/multiline-blocks': ['error', { noSingleLineBlocks: true }],
        },
      }),
    ],

    rules: {
      'import/order': [
        'error',
        {
          groups: [['builtin', 'external'], 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
          'newlines-between': 'always',
          pathGroups: [
            {
              pattern: '@**/**',
              group: 'internal',
            },
            {
              pattern: './**/*.css',
              group: 'sibling',
              position: 'after',
            },
          ],
          pathGroupsExcludedImportTypes: [],
          warnOnUnassignedImports: false,
        },
      ],
    },

    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.browser,
    },
  },
]);
