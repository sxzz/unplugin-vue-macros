import { createFilter, DEFINE_EMIT } from '@vue-macros/common'
import { addEmits, getText, getVolarOptions } from './common'
import type { Sfc, VueLanguagePlugin } from '@vue/language-core'

function getEmitStrings(options: {
  ts: typeof import('typescript')
  sfc: Sfc
}) {
  const { ts, sfc } = options

  const emitStrings: string[] = []
  function walkNode(node: import('typescript').Node, defaultName = '') {
    if (
      ts.isCallExpression(node) &&
      ts.isIdentifier(node.expression) &&
      DEFINE_EMIT === node.expression.escapedText
    ) {
      const name =
        node.arguments.length && ts.isStringLiteral(node.arguments[0])
          ? node.arguments[0].text
          : defaultName
      if (!name) return

      const type =
        node.typeArguments?.length === 1
          ? ts.isFunctionTypeNode(node.typeArguments[0])
            ? `Parameters<${getText(node.typeArguments[0], options)}>`
            : getText(node.typeArguments[0], options)
          : '[]'
      emitStrings.push(`'${name}': ${type}`)
    }
  }

  const sourceFile = sfc.scriptSetup!.ast
  ts.forEachChild(sourceFile, (node) => {
    if (ts.isExpressionStatement(node)) {
      walkNode(node.expression)
    } else if (ts.isVariableStatement(node)) {
      ts.forEachChild(node.declarationList, (decl) => {
        if (
          ts.isVariableDeclaration(decl) &&
          decl.initializer &&
          ts.isIdentifier(decl.name)
        ) {
          walkNode(decl.initializer, decl.name.text)
        }
      })
    }
  })

  return emitStrings
}

const plugin: VueLanguagePlugin = ({
  modules: { typescript: ts },
  vueCompilerOptions: { vueMacros, lib },
}) => {
  const volarOptions = getVolarOptions(vueMacros, 'defineEmit')
  if (!volarOptions) return []

  const filter = createFilter(volarOptions)

  return {
    name: 'vue-macros-define-emit',
    version: 2.1,
    resolveEmbeddedCode(fileName, sfc, embeddedFile) {
      if (
        !filter(fileName) ||
        !['ts', 'tsx'].includes(embeddedFile.lang) ||
        !sfc.scriptSetup?.ast
      )
        return

      const emitStrings = getEmitStrings({ ts, sfc })
      if (!emitStrings.length) return

      addEmits(embeddedFile.content, emitStrings, lib)
    },
  }
}
export default plugin
