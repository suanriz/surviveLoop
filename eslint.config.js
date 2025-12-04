import js from '@eslint/js'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import importPlugin from 'eslint-plugin-import'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'

export default [
  {
    ignores: ['src/types/*', 'node_modules/', 'dist/', '**/*.d.ts'],
  },

  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        React: 'readonly'
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.json', './tsconfig.app.json', './tsconfig.node.json'],
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@typescript-eslint': tsPlugin,
      import: importPlugin,
    },
    settings: {
      react: { version: 'detect' },
      'import/resolver': { typescript: true, node: true },
    },
    rules: {
      ...js.configs.recommended.rules,
      ...tsPlugin.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      ...(reactRefresh.configs.vite?.rules || {}),

      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', {
        argsIgnorePattern: '_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true
      }],
      'no-unused-vars': 'off',
      'no-var': 'error',
      'prefer-const': 'error',
      'semi': ['error', 'never'],
      'no-extra-semi': 'off',
      'no-useless-escape': 'off',
      'no-non-null-assertion': 'off',
      'comma-spacing': 'error',
      'arrow-spacing': ['error', { before: true, after: true }],
      'no-multiple-empty-lines': 'error',
      'quotes': ['error', 'single'],
      'jsx-quotes': ['error', 'prefer-single'],
      'react/jsx-max-props-per-line': ['error', { 'maximum': 1, 'when': 'multiline' }],
      'react/jsx-first-prop-new-line': ['error', 'multiline'],
      'react/jsx-closing-bracket-location': ['error', 'tag-aligned'],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'import/order': ['error', {
        'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
        'pathGroups': [
          {
            'pattern': '{react,react-dom,react-dom/*}',
            'group': 'external',
            'position': 'before'
          },
          {
            'pattern': '@/**',
            'group': 'internal'
          }
        ],
        'pathGroupsExcludedImportTypes': ['{react,react-dom,react-dom/*}'],
        'newlines-between': 'always',
        'alphabetize': {
          'order': 'asc',
          'caseInsensitive': true
        }
      }],
    },
  },
  {
    files: ['src/components/ui/**/*.{ts,tsx}'],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },
]
