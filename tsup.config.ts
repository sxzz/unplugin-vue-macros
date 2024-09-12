import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { defineConfig, type Options } from 'tsup'
import { createUnplugin } from 'unplugin'
import { IsolatedDecl } from 'unplugin-isolated-decl'
import Macros from 'unplugin-macros'
import Raw from 'unplugin-raw'
import { Unused, type Options as UnusedOptions } from 'unplugin-unused'

const filename = fileURLToPath(import.meta.url)
const macros = path.resolve(filename, '../macros')

export function config({
  ignoreDeps = { peerDependencies: ['vue'] },
  shims,
  treeshake,
  onlyIndex = false,
  splitting = !onlyIndex,
}: {
  ignoreDeps?: UnusedOptions['ignore']
  shims?: boolean
  treeshake?: boolean
  splitting?: boolean
  onlyIndex?: boolean
} = {}): Options {
  return {
    entry: onlyIndex ? ['./src/index.ts'] : ['./src/*.ts', '!./**.d.ts'],
    format: ['cjs', 'esm'],
    target: 'node16.14',
    splitting,
    cjsInterop: true,
    watch: !!process.env.DEV,
    dts: false,
    tsconfig: '../../tsconfig.lib.json',
    clean: true,
    define: {
      'import.meta.DEV': JSON.stringify(!!process.env.DEV),
    },
    removeNodeProtocol: false,
    shims,
    treeshake,

    esbuildPlugins: [
      createUnplugin<undefined, true>((opt, meta) => {
        return [
          Unused.raw(
            {
              level: 'error',
              ignore: ignoreDeps,
            },
            meta,
          ),
          IsolatedDecl.raw({ exclude: [/node_modules/, `${macros}/**`] }, meta),
          Raw.raw(
            {
              transform: {
                options: {
                  minifyWhitespace: true,
                },
              },
            },
            meta,
          ),
          Macros.raw(
            {
              viteConfig: {
                resolve: {
                  alias: {
                    '#macros': path.resolve(filename, '../macros/index.ts'),
                  },
                },
              },
            },
            meta,
          ),
        ]
      }).esbuild(),
    ],
  }
}

export default defineConfig(config())
