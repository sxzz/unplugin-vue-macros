/* eslint-disable node/prefer-global/process */

let _require: NodeRequire | undefined
if (TSUP_FORMAT === 'cjs') {
  _require = require
} else if (typeof process !== 'undefined') {
  if (globalThis.process?.getBuiltinModule) {
    const module = globalThis.process.getBuiltinModule('module')
    _require = module.createRequire(import.meta.url)
  } else {
    import('node:module').then(
      ({ default: { createRequire } }) => {
        _require = createRequire(import.meta.url)
      },
      () => {},
    )
  }
}

export function detectVueVersion(root?: string, defaultVersion = 3): number {
  // cannot detect version
  if (!_require) {
    console.warn('Cannot detect Vue version. Default to Vue 3.5')
    return 3.5
  }

  const { resolve } = _require('node:path') as typeof import('path')
  const { statSync } = _require('node:fs') as typeof import('fs')
  const { getPackageInfoSync } = _require(
    'local-pkg',
  ) as typeof import('local-pkg')

  root ||= process.cwd()

  let isFile = false
  try {
    isFile = statSync(root).isFile()
  } catch {}
  const paths: string[] = [root]
  if (!isFile) paths.unshift(resolve(root, '_index.js'))
  const vuePkg = getPackageInfoSync('vue', { paths })
  if (vuePkg && vuePkg.version) {
    const version = Number.parseFloat(vuePkg.version)
    return version >= 2 && version < 3 ? Math.trunc(version) : version
  } else {
    return defaultVersion
  }
}
