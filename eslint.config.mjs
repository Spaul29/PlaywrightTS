import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import typescript from '@typescript-eslint/eslint-plugin';
import playwright from 'eslint-plugin-playwright';
import typescriptParser from '@typescript-eslint/parser';
import { fi } from '@faker-js/faker';
const { configs: typescriptConfigs } = typescript;

export default [
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      '@typescript-eslint': typescript,
      playwright: playwright,
      prettier: prettierPlugin,
    },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      ...typescriptConfigs.recommended.rules,
      ...playwright.configs['flat/recommended'].rules,
      'prettier/prettier': 'error',
      ...prettierConfig.rules,
      'no-console': 'warn',
    },
    settings: {
      ...prettierConfig,
    },
  },
];
