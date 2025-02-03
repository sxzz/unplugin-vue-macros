import {
  HELPER_PREFIX,
  type MarkRequired,
  type Overwrite,
} from '@vue-macros/common'
import { toValidAssetId } from '@vue/compiler-dom'
import { replaceSourceRange } from 'muggle-string'
import { getStart, getText } from '../common'
import type { OptionsResolved } from '@vue-macros/config'
import type { TsmVirtualCode } from 'ts-macro'

export { transformJsxMacros } from './transform'
export { getGlobalTypes } from './global-types'

type UserOptions = MarkRequired<
  Exclude<OptionsResolved['jsxMacros'], false>,
  | 'lib'
  | 'defineModel'
  | 'defineSlots'
  | 'defineStyle'
  | 'defineExpose'
  | 'defineComponent'
>
export type TransformOptions = Overwrite<
  TsmVirtualCode,
  {
    ts: typeof import('typescript')
    lib: UserOptions['lib']
    defineModel: UserOptions['defineModel']
    defineSlots: UserOptions['defineSlots']
    defineStyle: UserOptions['defineStyle']
    defineExpose: UserOptions['defineExpose']
    defineComponent: UserOptions['defineComponent']
  }
>

export type JsxMacros = {
  defineModel?: string[]
  defineSlots?: string
  defineExpose?: string
  defineStyle?: {
    expression: import('typescript').CallExpression
    isCssModules: boolean
  }[]
  defineComponent?: true
}
export type RootMap = Map<
  | import('typescript').ArrowFunction
  | import('typescript').FunctionExpression
  | import('typescript').FunctionDeclaration
  | undefined,
  JsxMacros
>

function getMacro(
  node: import('typescript').Node | undefined,
  ts: typeof import('typescript'),
  options: TransformOptions,
):
  | {
      expression: import('typescript').CallExpression
      initializer: import('typescript').Node
      isRequired: boolean
    }
  | undefined {
  if (!node) return

  if (ts.isVariableStatement(node)) {
    return ts.forEachChild(node.declarationList, (decl) => getExpression(decl))
  } else {
    return getExpression(node)
  }

  function getExpression(decl: import('typescript').Node) {
    if (ts.isVariableDeclaration(decl) && decl.initializer) {
      const initializer =
        ts.isCallExpression(decl.initializer) &&
        ts.isIdentifier(decl.initializer.expression) &&
        decl.initializer.expression.escapedText === '$' &&
        decl.initializer.arguments[0]
          ? decl.initializer.arguments[0]
          : decl.initializer
      const expression = getMacroExpression(initializer)
      if (expression) {
        return {
          expression,
          initializer: decl.initializer,
          isRequired: ts.isNonNullExpression(initializer),
        }
      }
    } else if (ts.isExpressionStatement(decl)) {
      const expression = getMacroExpression(decl.expression)
      if (expression)
        return {
          expression,
          initializer: decl.expression,
          isRequired: ts.isNonNullExpression(decl.expression),
        }
    }
  }

  function getMacroExpression(node: import('typescript').Node) {
    if (ts.isNonNullExpression(node)) {
      node = node.expression
    }
    if (!ts.isCallExpression(node)) return
    const expression = ts.isPropertyAccessExpression(node.expression)
      ? node.expression
      : node
    return (
      ts.isIdentifier(expression.expression) &&
      [
        ...options.defineModel.alias,
        ...options.defineSlots.alias,
        ...options.defineStyle.alias,
        ...options.defineExpose.alias,
        ...options.defineComponent.alias,
      ].includes(expression.expression.escapedText!) &&
      node
    )
  }
}

export function getRootMap(options: TransformOptions): RootMap {
  const { ts, ast, source, codes } = options
  const rootMap: RootMap = new Map()

  function walk(
    node: import('typescript').Node,
    parents: import('typescript').Node[],
  ) {
    ts.forEachChild(node, (child) => {
      parents.unshift(node)
      walk(child, parents)
      parents.shift()
    })

    const root =
      parents[1] &&
      (ts.isArrowFunction(parents[1]) ||
        ts.isFunctionExpression(parents[1]) ||
        ts.isFunctionDeclaration(parents[1]))
        ? parents[1]
        : undefined

    if (
      root &&
      parents[2] &&
      ts.isCallExpression(parents[2]) &&
      !parents[2].typeArguments &&
      options.defineComponent.alias.includes(
        getText(parents[2].expression, options),
      )
    ) {
      if (!rootMap.has(root)) rootMap.set(root, {})
      if (!rootMap.get(root)!.defineComponent) {
        rootMap.get(root)!.defineComponent = true
        replaceSourceRange(
          codes,
          source,
          getStart(parents[2], options),
          getStart(parents[2], options),
          HELPER_PREFIX,
        )
      }
    }

    const macro = getMacro(node, ts, options)
    if (!macro) return

    const { expression, initializer } = macro
    let isRequired = macro.isRequired
    if (!rootMap.has(root)) rootMap.set(root, {})
    const macroName = getText(expression.expression, options)
    if (macroName.startsWith('defineStyle')) {
      ;(rootMap.get(root)!.defineStyle ??= [])!.push({
        expression,
        isCssModules: !!ts.isVariableStatement(node),
      })
    }

    if (!root) return

    if (options.defineModel.alias.includes(macroName)) {
      const modelName =
        expression.arguments[0] &&
        ts.isStringLiteralLike(expression.arguments[0])
          ? expression.arguments[0].text
          : 'modelValue'
      const modelOptions =
        expression.arguments[0] &&
        ts.isStringLiteralLike(expression.arguments[0])
          ? expression.arguments[1]
          : expression.arguments[0]
      if (modelOptions && ts.isObjectLiteralExpression(modelOptions)) {
        let hasRequired = false
        for (const prop of modelOptions.properties) {
          if (
            ts.isPropertyAssignment(prop) &&
            getText(prop.name, options) === 'required'
          ) {
            hasRequired = true
            isRequired = prop.initializer.kind === ts.SyntaxKind.TrueKeyword
          }
        }

        if (!hasRequired && isRequired) {
          replaceSourceRange(
            codes,
            source,
            modelOptions.end - 1,
            modelOptions.end - 1,
            `${!modelOptions.properties.hasTrailingComma && modelOptions.properties.length ? ',' : ''} required: true`,
          )
        }
      } else if (isRequired) {
        replaceSourceRange(
          codes,
          source,
          expression.arguments.end,
          expression.arguments.end,
          `${!expression.arguments.hasTrailingComma && expression.arguments.length ? ',' : ''} { required: true }`,
        )
      }

      const id = toValidAssetId(modelName, `${HELPER_PREFIX}model` as any)
      const typeString = `import('vue').UnwrapRef<typeof ${id}>`
      ;(rootMap.get(root)!.defineModel ??= [])!.push(
        `${modelName.includes('-') ? `'${modelName}'` : modelName}${isRequired ? ':' : '?:'} ${typeString}`,
        `'onUpdate:${modelName}'?: ($event: ${typeString}) => any`,
      )
      replaceSourceRange(
        codes,
        source,
        getStart(initializer, options),
        getStart(initializer, options),
        `// @ts-ignore\n${id};\nlet ${id} =`,
      )
    } else if (options.defineSlots.alias.includes(macroName)) {
      replaceSourceRange(
        codes,
        source,
        getStart(expression, options),
        getStart(expression, options),
        `// @ts-ignore\n${HELPER_PREFIX}slots;\nconst ${HELPER_PREFIX}slots = `,
      )
      rootMap.get(root)!.defineSlots = `Partial<typeof ${HELPER_PREFIX}slots>`
    } else if (options.defineExpose.alias.includes(macroName)) {
      replaceSourceRange(
        codes,
        source,
        getStart(expression, options),
        getStart(expression, options),
        `// @ts-ignore\n${HELPER_PREFIX}exposed;\nconst ${HELPER_PREFIX}exposed = `,
      )
      rootMap.get(root)!.defineExpose = `typeof ${HELPER_PREFIX}exposed`
    }
  }

  ts.forEachChild(ast, (node) => walk(node, []))
  return rootMap
}
