import { testFixtures } from '@vue-macros/test-utils'
import { describe } from 'vitest'
import { transformJsxDirective } from '../src/api'

describe('jsx-vue-directive', () => {
  describe('v-model', async () => {
    await testFixtures(
      import.meta.glob<string>('./fixtures/v-model/*.{vue,jsx,tsx}', {
        eager: true,
        query: '?raw',
        import: 'default',
      }),
      (_, id, code) =>
        transformJsxDirective(code, id, {
          version: 3,
          lib: 'vue',
          prefix: 'v-',
        })?.code,
    )
  })
})
