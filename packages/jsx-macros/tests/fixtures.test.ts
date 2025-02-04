import { testFixtures } from '@vue-macros/test-utils'
import { describe } from 'vitest'
import { transformJsxMacros } from '../src/core'

const options = {
  defineModel: { alias: ['defineModel'] },
  defineSlots: { alias: ['defineSlots'] },
  defineStyle: { alias: ['defineStyle'] },
  defineExpose: { alias: ['defineExpose'] },
  defineComponent: { alias: ['defineComponent'] },
}

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
        ...options,
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
        ...options,
      })?.code,
  )
})

describe('react19 fixtures', async () => {
  await testFixtures(
    import.meta.glob('./fixtures/**/define-expose.tsx', {
      eager: true,
      as: 'raw',
    }),
    (args, id, code) =>
      transformJsxMacros(code, id, new Map(), {
        lib: 'react',
        include: ['*.tsx'],
        version: 19,
        ...options,
      })?.code,
  )
})
