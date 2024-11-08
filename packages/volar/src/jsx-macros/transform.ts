import { HELPER_PREFIX } from '@vue-macros/common'
import { replaceSourceRange } from 'muggle-string'
import { getStart, getText } from '../common'
import { transformDefineStyle } from './define-style'
import type { RootMap, TransformOptions } from '.'

export function transformJsxMacros(
  rootMap: RootMap,
  options: TransformOptions,
): void {
  const { ts, source, codes } = options

  for (const [root, map] of rootMap) {
    if (!root.body) continue
    const asyncModifier = root.modifiers?.find(
      (modifier) => modifier.kind === ts.SyntaxKind.AsyncKeyword,
    )
    if (asyncModifier && map.defineComponent)
      replaceSourceRange(codes, source, asyncModifier.pos, asyncModifier.end)
    const result = `({}) as Awaited<ReturnType<typeof ${
      HELPER_PREFIX
    }setup>>['render'] & { __ctx: Awaited<ReturnType<typeof ${
      HELPER_PREFIX
    }setup>> }`

    const propsType = root.parameters[0]?.type
      ? String(getText(root.parameters[0].type, options))
      : '{}'
    replaceSourceRange(
      codes,
      source,
      getStart(root.parameters, options),
      getStart(root.parameters, options),
      `${HELPER_PREFIX}props: Awaited<ReturnType<typeof ${HELPER_PREFIX}setup>>['props'] & ${propsType},`,
      `${HELPER_PREFIX}setup = (${asyncModifier ? 'async' : ''}(`,
    )
    if (ts.isArrowFunction(root)) {
      replaceSourceRange(codes, source, root.end, root.end, `)) => `, result)
    } else {
      replaceSourceRange(
        codes,
        source,
        getStart(root.body, options),
        getStart(root.body, options),
        '=>',
      )
      replaceSourceRange(
        codes,
        source,
        root.end,
        root.end,
        `)){ return `,
        result,
        '}',
      )
    }

    transformDefineStyle(map.defineStyle, options)

    ts.forEachChild(root.body, (node) => {
      if (ts.isReturnStatement(node) && node.expression) {
        const defaultProps = []
        const elements =
          root.parameters[0] &&
          !root.parameters[0].type &&
          ts.isObjectBindingPattern(root.parameters[0].name)
            ? root.parameters[0].name.elements
            : []
        for (const element of elements) {
          if (ts.isIdentifier(element.name))
            defaultProps.push(
              `${element.name.escapedText}${
                element.initializer &&
                ts.isNonNullExpression(element.initializer)
                  ? ':'
                  : '?:'
              } typeof ${element.name.escapedText}`,
            )
        }

        const shouldWrapByCall =
          (ts.isArrowFunction(node.expression) ||
            ts.isFunctionExpression(node.expression)) &&
          map.defineComponent
        replaceSourceRange(
          codes,
          source,
          getStart(node, options),
          getStart(node.expression, options),
          `return {\nprops: {} as `,
          `{ ${defaultProps.join(', ')} } & `,
          `{ ${map.defineModel?.join(', ') ?? ''} }`,
          map.defineSlots ? ` & ${map.defineSlots}` : '',
          map.defineExpose ? `,\nexpose: ${map.defineExpose}` : '',
          `,\nrender: `,
          shouldWrapByCall ? '(' : '',
        )
        replaceSourceRange(
          codes,
          source,
          node.expression.end,
          node.expression.end,
          shouldWrapByCall ? ')()' : '',
          `\n}`,
        )
      }
    })
  }
}
