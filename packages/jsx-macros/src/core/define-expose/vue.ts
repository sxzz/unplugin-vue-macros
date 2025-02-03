import { importHelperFn, type MagicStringAST } from '@vue-macros/common'
import { useExposeHelperId } from '../helper'
import type { CallExpression } from '@babel/types'

export function transformVueDefineExpose(
  node: CallExpression,
  s: MagicStringAST,
  lib: string,
): void {
  s.overwriteNode(
    node.callee,
    importHelperFn(s, 0, 'useExpose', useExposeHelperId),
  )
  s.appendRight(
    node.arguments[0]?.start || node.end! - 1,
    `${importHelperFn(s, 0, 'getCurrentInstance', lib)}(), `,
  )
}
