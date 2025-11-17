// eslint.config.js
import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
    globalIgnores(['dist', 'build']),
    {
        files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],

        extends: [
            js.configs.recommended,
            ...tseslint.configs.recommended,
            pluginReact.configs.flat.recommended,
            reactHooks.configs.flat.recommended,
            reactRefresh.configs.vite,
        ],

        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
            parserOptions: {
                ecmaVersion: 'latest',
                ecmaFeatures: { jsx: true, tsx: true },
                sourceType: 'module',
            },
        },

        settings: {
            react: { version: 'detect' },
        },

        rules: {
            /* ---- GENERAL RULES ---- */
            'no-console': 'warn',
            'no-debugger': 'warn',

            /* ---- OPTIMIZED UNUSED VARS ---- */
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    varsIgnorePattern: '^[A-Z_]',
                    argsIgnorePattern: '^_',
                    caughtErrorsIgnorePattern: '^_',
                },
            ],

            /* ---- REACT RULES ---- */
            'react/react-in-jsx-scope': 'off', // Vite не потребує імпорту React
            // 'react-hooks/exhaustive-deps': 'error',
            'react-hooks/exhaustive-deps': 'off',
            'react-refresh/only-export-components': 'off',

            /* ---- CUSTOM FIX ---- */
            'react-hooks/set-state-in-effect': 'off', // дозволено для модалок/форм
        },
    },
]);
