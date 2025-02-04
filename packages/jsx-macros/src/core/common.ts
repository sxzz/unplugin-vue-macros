import type { Program } from '@babel/types'
import type { MagicString } from 'vue/compiler-sfc'

const importedMap = new WeakMap<MagicString, Set<string>>()
export function importHelper({
  s,
  ast,
  local,
  as = local,
  isDefault,
  from = 'vue',
  offset = 0,
}: {
  s: MagicString
  ast: Program
  local: string
  as?: string
  isDefault?: boolean
  from?: string
  offset?: number
}): string {
  let hasBeenImported = false
  ast.body.forEach((node) => {
    if (node.type === 'ImportDeclaration' && node.source.value === from) {
      for (const specifier of node.specifiers) {
        if (specifier.local.name === as) {
          hasBeenImported = true
          break
        }
      }
    }
  })
  if (hasBeenImported) return as

  const imported = isDefault ? 'default' : local
  const cacheKey = `${from}@${imported}`
  if (!importedMap.get(s)?.has(cacheKey)) {
    s.appendLeft(
      offset,
      `\nimport ${
        isDefault ? as : `{ ${imported}${as !== local ? ` as ${as}` : ''} }`
      } from ${JSON.stringify(from)};`,
    )
    if (!importedMap.has(s)) {
      importedMap.set(s, new Set([cacheKey]))
    } else {
      importedMap.get(s)!.add(cacheKey)
    }
  }

  return as
}
