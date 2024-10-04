// @ts-check
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginPrettier from 'eslint-plugin-prettier/recommended';
import pluginNode from 'eslint-plugin-n';
import pluginSecurity from 'eslint-plugin-security';
import pluginUnicorn from 'eslint-plugin-unicorn';

export default tseslint.config(
    js.configs.recommended,
    ...tseslint.configs.strict,
    ...tseslint.configs.stylistic,
    {
        languageOptions: {
            parserOptions: {
                project: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
    pluginPrettier,
    pluginNode.configs['flat/recommended'],
    pluginSecurity.configs.recommended,
    pluginUnicorn.configs['flat/recommended'],
    { files: ['eslint.config.js'], extends: [tseslint.configs.disableTypeChecked] },
    {
        rules: {
            '@typescript-eslint/no-unused-vars': 'off',
            'unicorn/no-anonymous-default-export': 'off',
            'unicorn/no-array-for-each': 'off',
            'unicorn/prevent-abbreviations': 'off',
        },
    },
    { ignores: [] },
);
