import { walkAST, type MagicStringAST } from '@vue-macros/common'
import hash from 'hash-sum'
import { helperPrefix } from './helper'
import { isFunctionalNode, type DefineStyle, type FunctionalNode } from '.'
import type { Node } from '@babel/types'

export function transformDefineStyle(
  defineStyle: DefineStyle,
  index: number,
  root: FunctionalNode | undefined,
  s: MagicStringAST,
  importMap: Map<string, string>,
): void {
  const { expression, lang, isDeclaration } = defineStyle
  if (expression.arguments[0]?.type !== 'TemplateLiteral') return

  let css = s.sliceNode(expression.arguments[0]).slice(1, -1)
  const scopeId = hash(css)
  const vars = new Map<string, string>()
  expression.arguments[0].expressions.forEach((exp) => {
    const cssVar = s.sliceNode(exp)
    const cssVarId = toCssVarId(cssVar, `--${scopeId}-`)
    s.overwrite(exp.start! - 2, exp.end! + 1, `var(${cssVarId})`)
    vars.set(cssVarId, cssVar)
  })

  let returnExpression = root && getReturnStatement(root)
  if (isFunctionalNode(returnExpression)) {
    returnExpression = getReturnStatement(returnExpression)
  }
  if (vars.size && returnExpression) {
    const children =
      returnExpression.type === 'JSXElement'
        ? [returnExpression]
        : returnExpression.type === 'JSXFragment'
          ? returnExpression.children
          : []
    const varString = Array.from(vars.entries())
      .map(([key, value]) => `'${key}': ${value}`)
      .join(', ')
    for (const child of children) {
      if (child.type === 'JSXElement') {
        s.appendRight(
          child.openingElement.name.end!,
          ` {...{style:{${varString}}}}`,
        )
      }
    }
  }

  let scoped = !!root
  if (expression.arguments[1]?.type === 'ObjectExpression') {
    for (const prop of expression.arguments[1].properties) {
      if (
        prop.type === 'ObjectProperty' &&
        prop.key.type === 'Identifier' &&
        prop.key.name === 'scoped' &&
        prop.value.type === 'BooleanLiteral'
      ) {
        scoped = prop.value.value
      }
    }
  }

  if (scoped && returnExpression) {
    walkAST<Node>(returnExpression, {
      enter(node) {
        if (
          node.type === 'JSXElement' &&
          s.sliceNode(node.openingElement.name) !== 'template'
        ) {
          s.appendRight(node.openingElement.name.end!, ` data-v-${scopeId}=""`)
        }
      },
    })
  }

  css = s
    .sliceNode(expression.arguments[0])
    .slice(1, -1)
    .replaceAll(/\/\/(.*)(?=\n)/g, '/*$1*/')
  const module = isDeclaration ? 'module.' : ''
  const importId = `${helperPrefix}/define-style/${index}?scopeId=${scopeId}&scoped=${scoped}&lang.${module}${lang}`
  importMap.set(importId, css)
  s.appendLeft(
    0,
    isDeclaration
      ? `import style${index} from "${importId}";`
      : `import "${importId}";`,
  )
  s.overwriteNode(expression, isDeclaration ? `style${index}` : '')
}

function getReturnStatement(root: FunctionalNode) {
  if (root.body.type === 'BlockStatement') {
    const returnStatement = root.body.body.find(
      (node) => node.type === 'ReturnStatement',
    )
    if (returnStatement) {
      return returnStatement.argument
    }
  } else {
    return root.body
  }
}

function toCssVarId(name: string, prefix = '') {
  return (
    prefix +
    name.replaceAll(/\W/g, (searchValue, replaceValue) => {
      return searchValue === '.'
        ? '-'
        : name.charCodeAt(replaceValue).toString()
    })
  )
}
