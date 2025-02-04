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
    transformDefineStyle(map.defineStyle, options)

    if (!root?.body) continue

    const asyncModifier = root.modifiers?.find(
      (modifier) => modifier.kind === ts.SyntaxKind.AsyncKeyword,
    )
    if (asyncModifier && map.defineComponent)
      replaceSourceRange(codes, source, asyncModifier.pos, asyncModifier.end)
    const result = `({}) as __VLS_PickNotAny<Awaited<ReturnType<typeof ${
      HELPER_PREFIX
    }setup>>['render'], {}> & { __ctx: Awaited<ReturnType<typeof ${
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
      ts.isArrowFunction(root) && root.parameters.pos === root.pos ? '(' : '',
      `${HELPER_PREFIX}props: Awaited<ReturnType<typeof ${HELPER_PREFIX}setup>>['props'] & ${propsType},`,
      `${HELPER_PREFIX}placeholder?: {},`,
      `${HELPER_PREFIX}setup = (${asyncModifier ? 'async' : ''}(`,
    )
    if (ts.isArrowFunction(root)) {
      replaceSourceRange(
        codes,
        source,
        root.end,
        root.end,
        `))${root.pos === root.parameters.pos ? ')' : ''} => `,
        result,
      )
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

    ts.forEachChild(root.body, (node) => {
      if (ts.isReturnStatement(node) && node.expression) {
        const props = [...(map.defineModel ?? [])]
        const elements =
          root.parameters[0] &&
          !root.parameters[0].type &&
          ts.isObjectBindingPattern(root.parameters[0].name)
            ? root.parameters[0].name.elements
            : []
        for (const element of elements) {
          if (ts.isIdentifier(element.name))
            props.push(
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
          `return {\nprops: {} as { ${props.join(', ')} }`,
          `,\nslots: {} as ${map.defineSlots ?? '{}'}`,
          `,\nexpose: (exposed: ${
            options.lib === 'vue'
              ? `import('vue').ShallowUnwrapRef`
              : 'NonNullable'
          }<${map.defineExpose ?? '{}'}>) => {}`,
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
