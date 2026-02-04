/* global process */
import { FlatCompat } from '@eslint/eslintrc';
import rootConfig from '../../eslint.config.mjs';

const compat = new FlatCompat({ baseDirectory: process.cwd() });

export default [
  ...rootConfig,
  ...compat.extends('next/core-web-vitals'),
  {
    ignores: ['next-env.d.ts'],
  },
];
