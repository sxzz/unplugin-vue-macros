import { access, readdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { camelCase } from 'change-case'
import fg from 'fast-glob'
import { importx } from 'importx'
import {
  defineConfig,
  noDuplicatedDeps,
  noDuplicatedPnpmLockfile,
} from 'monoman'
import { docsLink, githubLink } from './macros/repo'
import type { PackageJson } from 'pkg-types'
import type { Options } from 'tsup'

/// keep-sorted
const descriptions: Record<string, string> = {
  'define-options': 'Add defineOptions macro for Vue <script setup>.',
  'test-utils': 'Test utilities for Vue Macros.',
  api: 'General API for Vue Macros.',
  astro: 'Astro integration of Vue Macros.',
  config: 'Config API for Vue Macros.',
  devtools: 'Devtools plugin for Vue Macros.',
  macros: 'Explore more macros and syntax sugar to Vue.',
  volar: 'Volar plugin for Vue Macros.',
}

function exists(filePath: string) {
  return access(filePath).then(
    () => true,
    () => false,
  )
}

function getPkgName(filePath: string) {
  const relative = path.relative(import.meta.dirname, filePath)
  const [, pkgName] = relative.split(path.sep)
  return pkgName
}

let packageManager: string | undefined

export default defineConfig([
  {
    include: ['packages/*/package.json'],
    type: 'json',
    async contents(data: PackageJson, { filePath }) {
      const pkgRoot = path.resolve(filePath, '..')
      const pkgSrc = path.resolve(pkgRoot, 'src')
      const pkgName = getPkgName(filePath)

      data.type = pkgName === 'volar' ? 'commonjs' : 'module'
      const isESM = data.type === 'module'
      const cjsPrefix = isESM ? 'c' : ''
      const esmPrefix = isESM ? '' : 'm'
      const hasRootDts = (await readdir(pkgRoot)).some((file) =>
        file.endsWith('.d.ts'),
      )

      if (!data.private) {
        data.description =
          descriptions[pkgName] ||
          `${camelCase(pkgName)} feature from Vue Macros.`
        data.keywords = [
          'vue-macros',
          'macros',
          'vue',
          'sfc',
          'setup',
          'script-setup',
          pkgName,
        ]
      }
      data.license = 'MIT'
      data.homepage = docsLink
      data.bugs = { url: `${githubLink}/issues` }
      data.repository = {
        type: 'git',
        url: `git+${githubLink}.git`,
        directory: `packages/${pkgName}`,
      }
      // data.author = '三咲智子 <sxzz@sxzz.moe>'
      data.engines = { node: '>=16.14.0' }

      data.files = ['dist']
      if (hasRootDts) data.files.push('*.d.ts')
      data.files.sort()

      if (
        Object.keys(data.dependencies || {}).includes('unplugin') ||
        data?.meta?.plugin
      ) {
        data.keywords!.push('unplugin')

        // write unplugin entries
        const entries = [
          'vite',
          'webpack',
          'rollup',
          'esbuild',
          'rspack',
          'rolldown',
        ]
        Promise.all(
          entries.map((entry) =>
            writeFile(
              path.resolve(pkgSrc, `${entry}.ts`),
              `import unplugin from '.'\n
export default unplugin.${entry} as typeof unplugin.${entry}\n`,
              'utf8',
            ),
          ),
        )
      }

      data.publishConfig ||= {}
      data.publishConfig.access = 'public'

      const tsupFile = path.resolve(pkgRoot, 'tsup.config.ts')
      if (!data.meta?.skipExports && (await exists(tsupFile))) {
        const tsupConfig: Options = (
          await importx(tsupFile, {
            parentURL: import.meta.url,
            loader: 'bundle-require',
          })
        ).default
        const format = tsupConfig.format || []
        const hasCJS = format.includes('cjs')
        const hasESM = format.includes('esm')

        const entries = (
          await fg(tsupConfig.entry as string[], {
            cwd: pkgRoot,
            absolute: true,
          })
        ).map((file) => path.basename(path.relative(pkgSrc, file), '.ts'))

        data.exports = buildExports(true)
        data.publishConfig.exports = buildExports()

        const mainExport = data.exports['.']
        if (mainExport) {
          data.main = stripCurrentDir((mainExport as any).require)
          data.module = stripCurrentDir((mainExport as any).import)
        }

        const onlyIndex = entries.length === 1 && entries[0] === 'index'

        if (onlyIndex) delete data.typesVersions
        else
          data.typesVersions = {
            '*': {
              '*': ['./dist/*', './*'],
            },
          }

        function buildExports(withDev?: boolean) {
          return {
            ...Object.fromEntries(
              entries
                .map((entry) => {
                  const key = entry === 'index' ? '.' : `./${entry}`
                  const exports: Record<string, any> = withDev
                    ? {
                        dev: `./src/${entry}.ts`,
                      }
                    : {}
                  if (hasCJS) exports.require = `./dist/${entry}.${cjsPrefix}js`
                  if (hasESM) exports.import = `./dist/${entry}.${esmPrefix}js`

                  return [key, exports] as const
                })
                .sort(([a], [b]) => a.localeCompare(b)),
            ),
            './*': hasRootDts ? ['./*', './*.d.ts'] : './*',
          }
        }
      }

      return data
    },
  },
  {
    include: ['packages/*/README.md'],
    exclude: ['packages/define-options/README.md'],
    type: 'text',
    async contents(_, ctx) {
      const pkgPath = path.resolve(path.dirname(ctx.filePath), 'package.json')
      const pkg = JSON.parse(await readFile(pkgPath, 'utf-8'))
      const pkgName = pkg.name

      return `# ${pkgName} [![npm](https://img.shields.io/npm/v/${pkgName}.svg)](https://npmjs.com/package/${pkgName})\n
Please refer to [README.md](${githubLink}#readme)\n`
    },
  },
  ...noDuplicatedDeps({
    include: [
      'package.json',
      'packages/*/package.json',
      'docs/package.json',
      'playground/*/package.json',
    ],
  }),
  ...noDuplicatedDeps({
    include: [
      'package.json',
      'packages/*/package.json',
      'playground/*/package.json',
    ],
    ignores: ['vue'],
  }),
  {
    include: ['package.json', 'packages/*/package.json'],
    type: 'json',
    contents(data: Record<string, any>) {
      if (!packageManager) {
        packageManager = data.packageManager
      } else {
        data.packageManager = packageManager
      }

      return data
    },
  },
  ...noDuplicatedPnpmLockfile({
    deps: [
      'typescript',
      'vue-tsc',
      /twoslash/,
      /^@vue\/(?!compiler-sfc|devtools)/,
      /shiki/,
      /babel/,
      /esbuild/,
      /vite(?!-plugin-(vue-inspector|inspect))/,
      /unocss/,
      /rolldown/,
    ],
  }),
  ...noDuplicatedPnpmLockfile({
    deps: ['vue', '@vue/compiler-sfc', 'lru-cache', 'minimatch', 'debug'],
    allowMajor: true,
  }),
])

function stripCurrentDir(filePath: string) {
  return filePath.replace(/^\.\//, '')
}
