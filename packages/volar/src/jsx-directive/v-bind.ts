import { replaceSourceRange } from '@vue/language-core'
import { camelize } from '@vue/shared'
import { enableAllFeatures } from '../common'
import type { JsxDirective, TransformOptions } from './index'

export function transformVBind(
  nodes: JsxDirective[],
  { codes, ts, sfc, source }: TransformOptions,
) {
  if (nodes.length === 0) return

  for (const { attribute } of nodes) {
    let attributeName = attribute.name.getText(sfc[source]?.ast)

    if (
      attributeName.includes('-') &&
      attribute.initializer &&
      !ts.isStringLiteral(attribute.initializer)
    ) {
      attributeName = camelize(attributeName)
      replaceSourceRange(
        codes,
        source,
        attribute.name.getStart(sfc[source]?.ast),
        attribute.name.end,
        [
          attributeName,
          source,
          attribute.name.getStart(sfc[source]?.ast),
          enableAllFeatures(),
        ],
      )
    }

    if (attributeName.includes('_')) {
      replaceSourceRange(
        codes,
        source,
        attribute.name.getStart(sfc[source]?.ast),
        attribute.name.end,
        [
          attributeName.split('_')[0],
          source,
          attribute.name.getStart(sfc[source]?.ast),
          enableAllFeatures(),
        ],
      )
    }
  }
}
