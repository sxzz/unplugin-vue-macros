import {
  babelParse,
  generateTransform,
  getLang,
  HELPER_PREFIX,
  MagicStringAST,
  walkAST,
  type CodeTransform,
} from '@vue-macros/common'
import type { OptionsResolved } from '..'
import { transformDefineComponent } from './define-component'
import { transformDefineExpose } from './define-expose'
import { transformDefineModel } from './define-model'
import { transformDefineSlots } from './define-slots'
import { transformDefineStyle } from './define-style'
import type {
  ArrowFunctionExpression,
  CallExpression,
  FunctionDeclaration,
  FunctionExpression,
  Node,
  Program,
} from '@babel/types'

export type FunctionalNode =
  | FunctionDeclaration
  | FunctionExpression
  | ArrowFunctionExpression

export type DefineStyle = {
  expression: CallExpression
  isDeclaration: boolean
  lang: string
}

export type RootMapValue = {
  defineComponent?: CallExpression
  defineModel?: {
    expression: CallExpression
    isRequired: boolean
  }[]
  defineSlots?: CallExpression
  defineExpose?: CallExpression
  defineStyle?: DefineStyle[]
}

export function transformJsxMacros(
  code: string,
  id: string,
  importMap: Map<string, string>,
  options: OptionsResolved,
): CodeTransform | undefined {
  const s = new MagicStringAST(code)
  const ast = babelParse(s.original, getLang(id))
  const rootMap = getRootMap(ast, s, options)

  let defineStyleIndex = 0
  for (const [root, map] of rootMap) {
    map.defineStyle?.forEach((defineStyle) => {
      transformDefineStyle(defineStyle, defineStyleIndex++, root, s, importMap)
    })

    if (root === undefined) continue

    let propsName = `${HELPER_PREFIX}props`
    if (root.params[0]) {
      if (root.params[0].type === 'Identifier') {
        propsName = root.params[0].name
      } else if (root.params[0].type === 'ObjectPattern') {
        const lastProp = root.params[0].properties.at(-1)
        if (
          !map.defineComponent &&
          lastProp?.type === 'RestElement' &&
          lastProp.argument.type === 'Identifier'
        ) {
          propsName = lastProp.argument.name
        } else {
          s.appendRight(
            root.params[0].extra?.trailingComma
              ? (root.params[0].extra?.trailingComma as number) + 1
              : lastProp?.end || root.params[0].end! - 1,
            `${
              !root.params[0].extra?.trailingComma &&
              root.params[0].properties.length
                ? ','
                : ''
            } ...${HELPER_PREFIX}props`,
          )
        }
      }
    } else {
      s.appendRight(getParamsStart(root, s.original), propsName)
    }

    if (map.defineComponent) {
      transformDefineComponent(root, propsName, map, s, ast, options)
    }
    if (map.defineModel?.length) {
      map.defineModel.forEach(({ expression }) => {
        transformDefineModel(expression, propsName, s)
      })
    }
    if (map.defineSlots) {
      transformDefineSlots(map.defineSlots, propsName, s, options.lib)
    }
    if (map.defineExpose) {
      transformDefineExpose(
        map.defineExpose,
        propsName,
        root,
        s,
        options.lib,
        options.version,
      )
    }
  }

  return generateTransform(s, id)
}

function getRootMap(ast: Program, s: MagicStringAST, options: OptionsResolved) {
  const parents: (Node | undefined | null)[] = []
  const rootMap = new Map<FunctionalNode | undefined, RootMapValue>()
  walkAST<Node>(ast, {
    enter(node, parent) {
      parents.unshift(parent)
      const root = isFunctionalNode(parents[1]) ? parents[1] : undefined

      if (
        root &&
        parents[2]?.type === 'CallExpression' &&
        options.defineComponent.alias.includes(s.sliceNode(parents[2].callee))
      ) {
        if (!rootMap.has(root)) rootMap.set(root, {})
        if (!rootMap.get(root)!.defineComponent) {
          rootMap.get(root)!.defineComponent = parents[2]
        }
      }

      const expression =
        node.type === 'VariableDeclaration'
          ? node.declarations[0].init?.type === 'CallExpression' &&
            s.sliceNode(node.declarations[0].init.callee) === '$'
            ? node.declarations[0].init.arguments[0]
            : node.declarations[0].init
          : node.type === 'ExpressionStatement'
            ? node.expression
            : undefined
      if (!expression) return
      const macroExpression = getMacroExpression(expression, options)
      if (!macroExpression) return
      if (!rootMap.has(root)) rootMap.set(root, {})
      const macroName = s.sliceNode(
        macroExpression.callee.type === 'MemberExpression'
          ? macroExpression.callee.object
          : macroExpression.callee,
      )
      if (macroName) {
        if (options.defineModel.alias.includes(macroName)) {
          ;(rootMap.get(root)!.defineModel ??= []).push({
            expression: macroExpression,
            isRequired: expression.type === 'TSNonNullExpression',
          })
        } else if (options.defineStyle.alias.includes(macroName)) {
          const lang =
            macroExpression.callee.type === 'MemberExpression' &&
            macroExpression.callee.property.type === 'Identifier'
              ? macroExpression.callee.property.name
              : 'css'
          ;(rootMap.get(root)!.defineStyle ??= []).push({
            expression: macroExpression,
            isDeclaration: node.type === 'VariableDeclaration',
            lang,
          })
        } else if (options.defineSlots.alias.includes(macroName)) {
          rootMap.get(root)!.defineSlots = macroExpression
        } else if (options.defineExpose.alias.includes(macroName)) {
          rootMap.get(root)!.defineExpose = macroExpression
        }
      }
    },
    leave() {
      parents.shift()
    },
  })
  return rootMap
}

export function isFunctionalNode(node?: Node | null): node is FunctionalNode {
  return !!(
    node &&
    (node.type === 'ArrowFunctionExpression' ||
      node.type === 'FunctionDeclaration' ||
      node.type === 'FunctionExpression')
  )
}

export function getMacroExpression(
  node: Node,
  options: OptionsResolved,
): CallExpression | undefined {
  if (node.type === 'TSNonNullExpression') {
    node = node.expression
  }

  if (node.type === 'CallExpression') {
    if (
      node.callee.type === 'MemberExpression' &&
      node.callee.object.type === 'Identifier' &&
      node.callee.object.name === 'defineStyle'
    ) {
      return node
    } else if (
      node.callee.type === 'Identifier' &&
      [
        ...options.defineComponent.alias,
        ...options.defineSlots.alias,
        ...options.defineModel.alias,
        ...options.defineExpose.alias,
        ...options.defineStyle.alias,
      ].includes(node.callee.name!)
    ) {
      return node
    }
  }
}

export function getParamsStart(node: FunctionalNode, code: string): number {
  return node.params[0]
    ? node.params[0].start!
    : node.start! +
        (code.slice(node.start!, node.body.start!).match(/\(\s*\)/)?.index ||
          0) +
        1
}
