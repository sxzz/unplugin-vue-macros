import { replaceSourceRange } from 'muggle-string'
import { addCode, getText, isJsxExpression } from '../common'
import {
  getOpeningElement,
  getTagName,
  type JsxDirective,
  type TransformOptions,
} from './index'

export type CtxMap = Map<
  JsxDirective['node'],
  import('typescript').Block | undefined
>

export function resolveCtxMap(
  ctxNodeMap: CtxMap,
  options: TransformOptions,
): Map<import('typescript').Node, string> {
  if (ctxNodeMap.size) {
    options.codes.push(`
type __VLS_IsAny<T> = 0 extends 1 & T ? true : false;
type __VLS_PickNotAny<A, B> = __VLS_IsAny<A> extends true ? B : A;
type __VLS_Element = globalThis.JSX.Element;
declare function __VLS_asFunctionalComponent<T, K = T extends new (...args: any) => any ? InstanceType<T> : unknown>(t: T, instance?: K):
  T extends new (...args: any) => any
  ? (props: (K extends { $props: infer Props } ? Props : any) & Record<string, unknown>, ctx?: any) => __VLS_Element & { __ctx?: {
    attrs?: any,
    slots?: K extends { $scopedSlots: infer Slots } ? Slots : K extends { $slots: infer Slots } ? Slots : any,
    emit?: K extends { $emit: infer Emit } ? Emit : any
  } & { props?: (K extends { $props: infer Props } ? Props : any) & Record<string, unknown>; expose?(exposed: K): void; } }
  : T extends () => any ? (props: {}, ctx?: any) => ReturnType<T>
  : T extends (...args: any) => any ? T
  : (_: {} & Record<string, unknown>, ctx?: any) => { __ctx?: { attrs?: any, expose?: any, slots?: any, emit?: any, props?: {} & Record<string, unknown> } };
const __VLS_nativeElements = {
  ...{} as SVGElementTagNameMap,
  ...{} as HTMLElementTagNameMap,
};
declare function __VLS_getFunctionalComponentCtx<T, K, const S>(
  comp: T,
  compInstance: K,
  s: S,
): S extends keyof typeof __VLS_nativeElements
  ? { expose: (exposed: (typeof __VLS_nativeElements)[S]) => any }
  : '__ctx' extends keyof __VLS_PickNotAny<K, {}>
    ? K extends { __ctx?: infer Ctx }
      ? Ctx
      : never
    : T extends (props: infer P, ctx: infer Ctx) => any
      ? { props: P } & Ctx
      : {};\n`)
  }

  return new Map(
    Array.from(ctxNodeMap).map(([node, root], index) => [
      node,
      transformCtx(node, root, index, options),
    ]),
  )
}

export function transformCtx(
  node: JsxDirective['node'],
  root: import('typescript').Block | undefined,
  index: number,
  options: TransformOptions,
): string {
  const { ts, codes, prefix } = options

  const openingElement = getOpeningElement(node, options)
  if (!openingElement) return ''

  let props = ''
  let refValue
  for (const prop of openingElement.attributes.properties) {
    if (!ts.isJsxAttribute(prop)) continue

    let name = getText(prop.name, options)
    if (
      name === 'ref' &&
      prop.initializer &&
      isJsxExpression(prop.initializer) &&
      prop.initializer.expression
    ) {
      refValue = getRefValue(prop.initializer.expression, options)
      continue
    }

    if (name.startsWith(`${prefix}model`)) {
      name = name.split('_')[0].split(':')[1] || 'modelValue'
    } else if (name.includes('_')) {
      name = name.split('_')[0]
    } else if (prefix && name.startsWith(prefix)) {
      continue
    }

    const value = prop.initializer
      ? isJsxExpression(prop.initializer) && prop.initializer.expression
        ? getText(prop.initializer.expression, options)
        : getText(prop.initializer, options)
      : 'true'
    props += `'${name}': ${value},`
  }

  const ctxName = `__VLS_ctx_${refValue || index}`
  const tagName = getTagName(node, { ...options, withTypes: true })
  const result = `\nconst ${ctxName} = __VLS_getFunctionalComponentCtx(${tagName}, __VLS_asFunctionalComponent(${tagName})({${props}}), '${tagName}');\n`
  if (root) {
    replaceSourceRange(
      codes,
      options.source,
      root.end - 1,
      root.end - 1,
      result,
    )
  } else {
    addCode(codes, result)
  }

  return ctxName
}

function getRefValue(
  expression: import('typescript').Expression,
  options: TransformOptions,
) {
  const { ts } = options

  if (ts.isIdentifier(expression)) {
    return getText(expression, options)
  } else if (ts.isFunctionLike(expression)) {
    let left
    if (ts.isBinaryExpression(expression.body)) {
      left = expression.body.left
    }
    ts.forEachChild(expression.body, (node) => {
      if (ts.isBinaryExpression(node)) {
        left = node.left
      } else if (
        ts.isExpressionStatement(node) &&
        ts.isBinaryExpression(node.expression)
      ) {
        left = node.expression.left
      }
    })
    return (
      left &&
      getText(
        ts.isPropertyAccessExpression(left) ||
          ts.isElementAccessExpression(left)
          ? left.expression
          : left,
        options,
      )
    )
  } else if (
    ts.isCallExpression(expression) &&
    expression.arguments[0] &&
    ts.isIdentifier(expression.arguments[0])
  ) {
    return getText(expression.arguments[0], options)
  }
}
