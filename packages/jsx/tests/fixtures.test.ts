import { resolve } from 'node:path'
import {
  rollupBuild,
  RollupEsbuildPlugin,
  RollupVueJsx,
  testFixtures,
} from '@vue-macros/test-utils'
import { describe } from 'vitest'
import VueJsxMacros from '../src/rollup'

describe('fixtures', async () => {
  await testFixtures(
    ['tests/fixtures/**/*'],
    (_, id) => {
      return rollupBuild(id, [
        VueJsxMacros(),
        RollupVueJsx(),
        RollupEsbuildPlugin({
          target: 'esnext',
        }),
      ])
    },
    {
      cwd: resolve(__dirname, '..'),
      promise: true,
    },
  )
})
