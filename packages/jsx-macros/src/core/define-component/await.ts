// Modified from: https://github.com/vuejs/core/blob/main/packages/compiler-sfc/src/script/topLevelAwait.ts

import {
  importHelperFn,
  walkAST,
  type MagicStringAST,
} from '@vue-macros/common'
import { isFunctionType } from '@vue/compiler-core'
import type { FunctionalNode } from '..'
import type { AwaitExpression, Node, Statement } from '@babel/types'

export function transformAwait(root: FunctionalNode, s: MagicStringAST): void {
  if (root.body.type !== 'BlockStatement') return
  let hasAwait = false
  for (const node of root.body.body) {
    if (
      (node.type === 'VariableDeclaration' && !node.declare) ||
      node.type.endsWith('Statement')
    ) {
      const scope: Statement[][] = [root.body.body]
      walkAST<Node>(node, {
        enter(child, parent) {
          if (isFunctionType(child)) {
            this.skip()
          }
          if (child.type === 'BlockStatement') {
            scope.push(child.body)
          }
          if (child.type === 'AwaitExpression') {
            hasAwait = true
            // if the await expression is an expression statement and
            // - is in the root scope
            // - or is not the first statement in a nested block scope
            // then it needs a semicolon before the generated code.
            const currentScope = scope.at(-1)
            const needsSemi = !!currentScope?.some((n, i) => {
              return (
                (scope.length === 1 || i > 0) &&
                n.type === 'ExpressionStatement' &&
                n.start === child.start
              )
            })
            processAwait(
              s,
              child,
              needsSemi,
              parent!.type === 'ExpressionStatement',
            )
          }
        },
        leave(node: Node) {
          if (node.type === 'BlockStatement') scope.pop()
        },
      })
    }
  }

  if (hasAwait) {
    s.prependLeft(root.body.start! + 1, `\nlet __temp, __restore\n`)
  }
}

function processAwait(
  s: MagicStringAST,
  node: AwaitExpression,
  needSemi: boolean,
  isStatement: boolean,
): void {
  const argumentStart =
    node.argument.extra && node.argument.extra.parenthesized
      ? (node.argument.extra.parenStart as number)
      : node.argument.start!

  const argumentStr = s.slice(argumentStart, node.argument.end!)

  const containsNestedAwait = /\bawait\b/.test(argumentStr)

  s.overwrite(
    node.start!,
    argumentStart,
    `${needSemi ? `;` : ``}(\n  ([__temp,__restore] = ${importHelperFn(
      s,
      0,
      `withAsyncContext`,
      'vue',
    )}(${containsNestedAwait ? `async ` : ``}() => `,
  )
  s.appendLeft(
    node.end!,
    `)),\n  ${isStatement ? `` : `__temp = `}await __temp,\n  __restore()${
      isStatement ? `` : `,\n  __temp`
    }\n)`,
  )
}
