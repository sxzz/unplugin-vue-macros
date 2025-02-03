import { HELPER_PREFIX } from '@vue-macros/common'
import { generateCssClassProperty } from '@vue/language-core/lib/codegen/script/template.js'
import { parseCssClassNames } from '@vue/language-core/lib/utils/parseCssClassNames.js'
import { replaceSourceRange } from 'muggle-string'
import { getStart, getText } from '../common'
import type { JsxMacros, TransformOptions } from '.'

export function transformDefineStyle(
  defineStyles: JsxMacros['defineStyle'],
  options: TransformOptions,
): void {
  if (!defineStyles?.length) return
  const { ts, source, codes } = options
  defineStyles.forEach(({ expression, isCssModules }, index) => {
    if (
      isCssModules &&
      expression?.arguments[0] &&
      !expression.typeArguments &&
      ts.isTemplateLiteral(expression.arguments[0])
    ) {
      replaceSourceRange(
        codes,
        source,
        expression.arguments.pos - 1,
        expression.arguments.pos - 1,
        `<${HELPER_PREFIX}PrettifyLocal<{}`,
        ...generateCssClassesType(
          getText(expression.arguments[0], options).slice(1, -1),
          getStart(expression.arguments[0], options) + 1,
          index,
        ),
        '>>',
      )
    }

    addEmbeddedCode(expression, index, options)
  })
}

function* generateCssClassesType(css: string, offset: number, index: number) {
  for (const className of [...parseCssClassNames(css)]) {
    yield* generateCssClassProperty(
      index,
      className.text,
      className.offset + offset,
      'string',
      false,
    )
  }
}

function addEmbeddedCode(
  expression: import('typescript').CallExpression,
  index: number,
  options: TransformOptions,
) {
  const { ts } = options
  const languageId =
    ts.isPropertyAccessExpression(expression.expression) &&
    ts.isIdentifier(expression.expression.name)
      ? expression.expression.name.text
      : 'css'
  const style = expression.arguments[0]
  const styleText = getText(style, options)
    .slice(1, -1)
    .replaceAll(/\$\{.*\}/g, (str) => '_'.repeat(str.length))
  options.embeddedCodes.push({
    id: `style_${index}`,
    languageId,
    snapshot: {
      getText: (start, end) => styleText.slice(start, end),
      getLength: () => styleText.length,
      getChangeRange: () => undefined,
    },
    mappings: [
      {
        sourceOffsets: [getStart(style, options)! + 1],
        generatedOffsets: [0],
        lengths: [styleText.length],
        data: {
          completion: true,
          format: true,
          navigation: true,
          semantic: true,
          structure: true,
          verification: true,
        },
      },
    ],
    embeddedCodes: [],
  })
}
