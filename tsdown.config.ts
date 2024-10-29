import { copyFile, readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import fg from 'fast-glob'
import { rollup } from 'rollup'
import dts from 'rollup-plugin-dts'
import { defineConfig, type Options } from 'tsdown'
import { IsolatedDecl } from 'unplugin-isolated-decl'
import Macros from 'unplugin-macros'
import Raw from 'unplugin-raw'
import { Unused, type Options as UnusedOptions } from 'unplugin-unused'

const filename = fileURLToPath(import.meta.url)
const macros = path.resolve(filename, '../macros')

const pkg = JSON.parse(await readFile('./package.json', 'utf8'))
const isESM = pkg.type === 'module'

export function config({
  ignoreDeps = { peerDependencies: ['vue'] },
  shims,
  treeshake,
  onlyIndex = false,
  splitting = !onlyIndex,
  platform = 'neutral',
}: {
  ignoreDeps?: UnusedOptions['ignore']
  shims?: boolean
  treeshake?: boolean
  splitting?: boolean
  onlyIndex?: boolean
  platform?: Options['platform']
} = {}): Options {
  const entry = onlyIndex ? ['./src/index.ts'] : ['./src/*.ts', '!./**.d.ts']

  return {
    entry,
    format: ['cjs', 'esm'],
    // target: 'node16.14',
    // splitting,
    // cjsInterop: true,
    watch: !!process.env.DEV,
    dts: false,
    // tsconfig: '../../tsconfig.lib.json',
    clean: true,
    // define: {
    //   'import.meta.DEV': JSON.stringify(!!process.env.DEV),
    // },
    // removeNodeProtocol: false,
    // shims,
    treeshake,
    platform,

    plugins: [
      Unused.rolldown({
        level: 'error',
        ignore: ignoreDeps,
      }),
      IsolatedDecl.rolldown({
        exclude: [/node_modules/, `${macros}/**`],
        transformer: 'oxc',
        extraOutdir: 'temp',
      }),
      Raw.rolldown({
        transform: {
          options: {
            minifyWhitespace: true,
          },
        },
      }),
      Macros.rolldown({
        viteConfig: {
          resolve: {
            alias: {
              '#macros': path.resolve(filename, '../macros/index.ts'),
            },
          },
        },
      }),
    ],

    async onSuccess() {
      const entryFiles = await fg(entry)
      const input = entryFiles.map((file) =>
        path.resolve(
          process.cwd(),
          file.replace('src', 'dist/temp').replace(/\.ts$/, '.d.ts'),
        ),
      )
      const build = await rollup({
        input,
        plugins: [dts()],
        external(id) {
          return id[0] !== '.' && !path.isAbsolute(id)
        },
      })

      await build.write({
        dir: 'dist',
        format: 'es',
        entryFileNames: (chunk) => {
          let filename = chunk.name
          if (!filename.endsWith('.d')) filename += '.d'
          return `${filename}.ts`
        },
      })

      for (const file of entryFiles) {
        const mainFormat = file.replace('src', 'dist').replace(/\.ts$/, '.d.ts')
        const alterFormat = mainFormat.replace(/\.ts$/, isESM ? '.cts' : '.mts')
        await copyFile(mainFormat, alterFormat)

        const cjsFormat = isESM ? alterFormat : mainFormat

        const cjsExport = (await readFile(cjsFormat, 'utf8')).replace(
          /(?<=(?:[;}]|^)\s*export\s*)\{\s*([\w$]+)\s*as\s+default\s*\}/,
          `= $1`,
        )
        await writeFile(cjsFormat, cjsExport, 'utf8')
      }

      await rm(path.resolve(process.cwd(), 'dist/temp'), { recursive: true })
    },
  }
}

export default defineConfig(config())
