import { replaceSourceRange } from 'muggle-string'
import { allCodeFeatures } from 'ts-macro'
import { getStart, getText, isJsxExpression } from '../common'
import type { JsxDirective, TransformOptions } from './index'

export function transformRef(
  nodes: JsxDirective[],
  ctxMap: Map<JsxDirective['node'], string>,
  options: TransformOptions,
): void {
  const { codes, source, ts } = options

  for (const { node, attribute } of nodes) {
    if (
      attribute.initializer &&
      isJsxExpression(attribute.initializer) &&
      attribute.initializer.expression &&
      (ts.isFunctionExpression(attribute.initializer.expression) ||
        ts.isArrowFunction(attribute.initializer.expression))
    ) {
      replaceSourceRange(
        codes,
        source,
        getStart(attribute, options),
        attribute.end,
        '{...({ ',
        ['ref', source, getStart(attribute.name, options), allCodeFeatures],
        ': ',
        [
          getText(attribute.initializer.expression, options),
          source,
          getStart(attribute.initializer.expression, options),
          allCodeFeatures,
        ],
        `} satisfies { ref: (e: Parameters<typeof ${ctxMap.get(node)}['expose']>[0]) => any }) as {}}`,
      )
    }
  }
}
