import { walkIdentifiers } from '@vue/compiler-sfc'
import { isFunctionType, isLiteralType, resolveObjectKey } from 'ast-kit'
import type * as t from '@babel/types'
import type { MagicString } from 'magic-string-ast'

export function checkInvalidScopeReference(
  node: t.Node | undefined,
  method: string,
  setupBindings: string[],
): void {
  if (!node) return
  walkIdentifiers(node, (id) => {
    if (setupBindings.includes(id.name))
      throw new SyntaxError(
        `\`${method}()\` in <script setup> cannot reference locally ` +
          `declared variables (${id.name}) because it will be hoisted outside of the ` +
          `setup() function.`,
      )
  })
}

export function isStaticExpression(
  node: t.Node,
  options: Partial<
    Record<
      'object' | 'fn' | 'objectMethod' | 'array' | 'unary' | 'regex',
      boolean
    > & {
      magicComment?: string
    }
  > = {},
): boolean {
  const { magicComment, fn, object, objectMethod, array, unary, regex } =
    options

  // magic comment
  if (
    magicComment &&
    node.leadingComments?.some(
      (comment) => comment.value.trim() === magicComment,
    )
  )
    return true
  else if (fn && isFunctionType(node)) return true

  switch (node.type) {
    case 'UnaryExpression': // !true
      return !!unary && isStaticExpression(node.argument, options)

    case 'LogicalExpression': // 1 > 2
    case 'BinaryExpression': // 1 + 2
      return (
        isStaticExpression(node.left, options) &&
        isStaticExpression(node.right, options)
      )

    case 'ConditionalExpression': // 1 ? 2 : 3
      return (
        isStaticExpression(node.test, options) &&
        isStaticExpression(node.consequent, options) &&
        isStaticExpression(node.alternate, options)
      )

    case 'SequenceExpression': // (1, 2)
    case 'TemplateLiteral': // `123`
      return node.expressions.every((expr) => isStaticExpression(expr, options))

    case 'ArrayExpression': // [1, 2]
      return (
        !!array &&
        node.elements.every(
          (element) => element && isStaticExpression(element, options),
        )
      )

    case 'ObjectExpression': // { foo: 1 }
      return (
        !!object &&
        node.properties.every((prop) => {
          if (prop.type === 'SpreadElement') {
            return (
              prop.argument.type === 'ObjectExpression' &&
              isStaticExpression(prop.argument, options)
            )
          } else if (!isLiteralType(prop.key) && prop.computed) {
            return false
          } else if (
            prop.type === 'ObjectProperty' &&
            !isStaticExpression(prop.value, options)
          ) {
            return false
          }
          if (prop.type === 'ObjectMethod' && !objectMethod) {
            return false
          }
          return true
        })
      )

    case 'ParenthesizedExpression': // (1)
    case 'TSNonNullExpression': // 1!
    case 'TSAsExpression': // 1 as number
    case 'TSTypeAssertion': // (<number>2)
    case 'TSSatisfiesExpression': // 1 satisfies number
      return isStaticExpression(node.expression, options)

    case 'RegExpLiteral':
      return !!regex
  }

  if (isLiteralType(node)) return true
  return false
}

export function isStaticObjectKey(node: t.ObjectExpression): boolean {
  return node.properties.every((prop) => {
    if (prop.type === 'SpreadElement') {
      return (
        prop.argument.type === 'ObjectExpression' &&
        isStaticObjectKey(prop.argument)
      )
    }
    return !prop.computed || isLiteralType(prop.key)
  })
}

/**
 * @param node must be a static expression, SpreadElement is not supported
 */
export function resolveObjectExpression(
  node: t.ObjectExpression,
): Record<string | number, t.ObjectMethod | t.ObjectProperty> | undefined {
  const maps: Record<string | number, t.ObjectMethod | t.ObjectProperty> =
    Object.create(null)
  for (const property of node.properties) {
    if (property.type === 'SpreadElement') {
      if (property.argument.type !== 'ObjectExpression')
        // not supported
        return undefined
      Object.assign(maps, resolveObjectExpression(property.argument)!)
    } else {
      const key = resolveObjectKey(property)
      maps[key] = property
    }
  }

  return maps
}

const importedMap = new WeakMap<MagicString, Set<string>>()
export const HELPER_PREFIX = '__MACROS_'
export function importHelperFn(
  s: MagicString,
  offset: number,
  local: string,
  from = 'vue',
  isDefault = false,
  as: string = local,
) {
  const imported = isDefault ? 'default' : local
  const cacheKey = `${from}@${imported}`
  if (!importedMap.get(s)?.has(cacheKey)) {
    s.appendLeft(
      offset,
      `\nimport ${
        isDefault
          ? HELPER_PREFIX + as
          : `{ ${imported} as ${HELPER_PREFIX + as} }`
      } from ${JSON.stringify(from)};`,
    )
    if (!importedMap.has(s)) {
      importedMap.set(s, new Set([cacheKey]))
    } else {
      importedMap.get(s)!.add(cacheKey)
    }
  }

  return `${HELPER_PREFIX}${as}`
}
