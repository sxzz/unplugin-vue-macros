import { testFixtures } from '@vue-macros/test-utils'
import { describe } from 'vitest'
import { transformJsxMacros } from '../src/core'

describe('fixtures', async () => {
  await testFixtures(
    import.meta.glob('./fixtures/**/*.tsx', {
      eager: true,
      as: 'raw',
    }),
    (args, id, code) =>
      transformJsxMacros(code, id, new Map(), {
        lib: 'vue',
        include: ['*.tsx'],
        version: 3.5,
      })?.code,
  )
})

describe('react fixtures', async () => {
  await testFixtures(
    import.meta.glob('./fixtures/**/define-expose.tsx', {
      eager: true,
      as: 'raw',
    }),
    (args, id, code) =>
      transformJsxMacros(code, id, new Map(), {
        lib: 'react',
        include: ['*.tsx'],
        version: 18,
      })?.code,
  )
})
