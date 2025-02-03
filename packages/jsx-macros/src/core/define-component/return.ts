import { isFunctionalNode, type FunctionalNode } from '..'
import type { MagicStringAST } from '@vue-macros/common'

export function transformReturn(
  root: FunctionalNode,
  s: MagicStringAST,
  lib: string,
): void {
  if (lib !== 'vue') return

  const node =
    root.body.type === 'BlockStatement'
      ? root.body.body.find((node) => node.type === 'ReturnStatement')?.argument
      : root.body
  if (!node || isFunctionalNode(node)) return

  s.appendRight(
    node.extra?.parenthesized ? (node.extra.parenStart as number) : node.start!,
    '() => ',
  )
}
