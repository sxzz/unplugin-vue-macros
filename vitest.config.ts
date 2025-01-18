import path from 'node:path'
import process from 'node:process'
import Macros from 'unplugin-macros/vite'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      '#macros': path.resolve(__dirname, 'macros/index.ts'),
    },
    conditions: ['dev'],
  },
  define: {
    TSUP_FORMAT: "'esm'",
  },
  environments: {
    ssr: {
      resolve: { conditions: ['dev'] },
    },
  },
  test: {
    reporters: process.env.GITHUB_ACTIONS ? ['dot', 'github-actions'] : ['dot'],
  },
  plugins: [Macros()],
})
