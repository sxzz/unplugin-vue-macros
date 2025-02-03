import type { FunctionalNode } from '..'
import { transformReactDefineExpose } from './react'
import { transformVueDefineExpose } from './vue'
import type { CallExpression } from '@babel/types'
import type { MagicStringAST } from '@vue-macros/common'

export { transformVueDefineExpose } from './vue'
export { transformReactDefineExpose } from './react'

export function transformDefineExpose(
  node: CallExpression,
  propsName: string,
  root: FunctionalNode,
  s: MagicStringAST,
  lib: string,
  version: number,
): void {
  if (lib.includes('vue')) {
    transformVueDefineExpose(node, s, lib)
  } else if (lib.includes('react')) {
    transformReactDefineExpose(node, propsName, root, s, lib, version)
  }
}
