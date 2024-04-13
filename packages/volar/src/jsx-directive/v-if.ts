import { replaceSourceRange } from '@vue/language-core'
import { enableAllFeatures } from '../common'
import type { JsxDirective, TransformOptions } from './index'

export function transformVIf(nodes: JsxDirective[], options: TransformOptions) {
  const { codes, ts, sfc, source } = options

  nodes.forEach(({ node, attribute, parent }, index) => {
    if (!ts.isIdentifier(attribute.name)) return

    if (
      ['v-if', 'v-else-if'].includes(
        attribute.name.getText(sfc[source]?.ast),
      ) &&
      attribute.initializer &&
      ts.isJsxExpression(attribute.initializer) &&
      attribute.initializer.expression
    ) {
      const hasScope = parent && attribute.name.escapedText === 'v-if'
      replaceSourceRange(
        codes,
        source,
        node.pos,
        node.pos,
        `${hasScope ? '{' : ' '}(`,
        [
          attribute.initializer.expression.getText(sfc[source]?.ast),
          source,
          attribute.initializer.expression.getStart(sfc[source]?.ast),
          enableAllFeatures(),
        ],
        ') ? ',
      )

      const nextAttribute = nodes[index + 1]?.attribute
      const nextNodeHasElse =
        nextAttribute && ts.isIdentifier(nextAttribute.name)
          ? `${nextAttribute.name.escapedText}`.startsWith('v-else')
          : false
      replaceSourceRange(
        codes,
        source,
        node.end,
        node.end,
        nextNodeHasElse ? ' : ' : ` : null${parent ? '}' : ''}`,
      )
    } else if (attribute.name.escapedText === 'v-else') {
      replaceSourceRange(codes, source, node.end, node.end, parent ? '}' : '')
    }

    replaceSourceRange(codes, source, attribute.pos, attribute.end)
  })
}
