import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginSecurity from 'eslint-plugin-security';

export default [
  { ignores: ['dist/*', 'coverage/*', 'types/*', 'pnpm-lock.yaml'] },
  { files: ['src/**/*.{ts,js,mjs,cjs}'] },
  { files: ['config/**/*.{ts,js,mjs,cjs}'] },
  { files: ['config/**/*.js', 'src/**/*.js'], languageOptions: { sourceType: 'esm' } },
  { languageOptions: { globals: { ...globals.node, ...globals.jest } } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginSecurity.configs.recommended,
  {
    rules: {
      'security/detect-object-injection': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          'argsIgnorePattern': '^_',
          'varsIgnorePattern': '^_',
          'caughtErrorsIgnorePattern': '^_',
        },
      ],
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      'comma-dangle': ['error', 'always-multiline'],
      'eol-last': ['error', 'unix'],
    },
  },
];
