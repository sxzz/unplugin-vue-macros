// @ts-check
import { sxzz } from '@sxzz/eslint-config'
import { importx } from 'importx'

const vueMacros = (
  await importx('./packages/eslint-config/src/flat.ts', {
    parentURL: import.meta.url,
    loader: 'bundle-require',
  })
).default

export default sxzz([
  vueMacros,
  {
    name: 'global-ignores',
    ignores: ['playground/vue2/src', 'playground/nuxt', 'playground/astro'],
  },
  {
    name: 'global-rules',
    rules: {
      '@typescript-eslint/no-dynamic-delete': 'off',
    },
  },
  {
    name: 'markdown',
    files: ['**/*.md/*.{js,ts,vue}'],
    rules: {
      'no-var': 'off',
      'import/no-mutable-exports': 'off',
      'import/first': 'off',
    },
  },
  {
    name: 'playground/vue3',
    files: ['playground/vue3/**'],
    rules: {
      'no-debugger': 'off',
      'no-console': 'off',
    },
  },
  {
    name: 'allow-default-export',
    files: [
      '**/helper/*',
      'playground/vue3/**',
      'packages/{volar,eslint-config}/**',
    ],
    rules: {
      'import/no-default-export': 'off',
    },
  },
  {
    name: 'sort-config',
    files: ['**/vue-macros.config.ts'],
    rules: {
      'perfectionist/sort-objects': 'error',
    },
  },
])
