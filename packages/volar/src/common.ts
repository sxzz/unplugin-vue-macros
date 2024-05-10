import {
  type Code,
  type Sfc,
  type VueCompilerOptions,
  replaceAll,
} from '@vue/language-core'
import type { VolarOptions } from '..'

export const REGEX_DEFINE_COMPONENT =
  /(?<=(default|__VLS_internalComponent =|__VLS_fnComponent =) \(await import\(\S+\)\)\.defineComponent\({\n)/g

export function addProps(codes: Code[], decl: Code[], vueLibName: string) {
  replaceAll(codes, REGEX_DEFINE_COMPONENT, 'props: ({} as ', ...decl, '),\n')
  codes.push(
    `type __VLS_NonUndefinedable<T> = T extends undefined ? never : T;\n`,
    `type __VLS_TypePropsToOption<T> = { [K in keyof T]-?: {} extends Pick<T, K> ? { type: import('${vueLibName}').PropType<__VLS_NonUndefinedable<T[K]>> } : { type: import('${vueLibName}').PropType<T[K]>, required: true } };\n`,
  )
  return true
}

export function addEmits(codes: Code[], decl: Code[]) {
  replaceAll(codes, REGEX_DEFINE_COMPONENT, 'emits: ({} as ', ...decl, '),\n')
  return true
}

export function getVolarOptions(
  vueCompilerOptions: VueCompilerOptions,
): VolarOptions | undefined {
  return vueCompilerOptions.vueMacros
}

export function getImportNames(ts: typeof import('typescript'), sfc: Sfc) {
  const names: string[] = []
  const sourceFile = sfc.scriptSetup!.ast
  ts.forEachChild(sourceFile, (node) => {
    if (
      ts.isImportDeclaration(node) &&
      node.attributes?.elements.some(
        (el) =>
          getText(el.name, { ts, sfc, source: 'scriptSetup' }) === 'type' &&
          ts.isStringLiteral(el.value) &&
          getText(el.value, { ts, sfc, source: 'scriptSetup' }) === 'macro',
      )
    ) {
      const name = node.importClause?.name?.escapedText
      if (name) names.push(name)

      if (node.importClause?.namedBindings) {
        const bindings = node.importClause.namedBindings
        if (ts.isNamespaceImport(bindings)) {
          names.push(bindings.name.escapedText!)
        } else {
          for (const el of bindings.elements) names.push(el.name.escapedText!)
        }
      }
    }
  })

  return names
}

interface Options {
  sfc: Sfc
  ts: typeof import('typescript')
  source?: 'script' | 'scriptSetup'
}

export function getStart(
  node: import('typescript').Node,
  { ts, sfc, source = 'scriptSetup' }: Options,
) {
  return (ts as any).getTokenPosOfNode(node, sfc[source]!.ast)
}

export function getText(node: import('typescript').Node, options: Options) {
  const { sfc, source = 'scriptSetup' } = options
  return sfc[source]!.content.slice(getStart(node, options), node.end)
}

export function isJsxExpression(
  node?: import('typescript').Node,
): node is import('typescript').JsxExpression {
  return node?.kind === 294
}
