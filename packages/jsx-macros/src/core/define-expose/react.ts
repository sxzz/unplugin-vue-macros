import {
  HELPER_PREFIX,
  importHelperFn,
  type MagicStringAST,
} from '@vue-macros/common'
import { walkIdentifiers } from 'vue/compiler-sfc'
import { getParamsStart, type FunctionalNode } from '..'
import type { CallExpression, Node } from '@babel/types'

export function transformReactDefineExpose(
  node: CallExpression,
  propsName: string,
  root: FunctionalNode,
  s: MagicStringAST,
  lib: string,
  version: number,
): void {
  const useImperativeHandle = importHelperFn(
    s,
    0,
    'useImperativeHandle',
    lib === 'preact' ? 'preact/hooks' : lib,
  )
  const isReact19 = lib === 'react' && version >= 19
  let refName = ''
  if (isReact19) {
    if (root.params[0]?.type === 'ObjectPattern') {
      for (const prop of root.params[0].properties) {
        if (
          prop.type === 'ObjectProperty' &&
          prop.key.type === 'Identifier' &&
          prop.key.name === 'ref'
        ) {
          refName =
            prop.value.type === 'Identifier' ? prop.value.name : prop.key.name
          break
        }
      }
    } else {
      refName = `${propsName}.ref`
    }
  } else {
    const forwardRef = importHelperFn(
      s,
      0,
      'forwardRef',
      lib === 'preact' ? 'preact/compat' : lib,
    )
    if (root.type === 'FunctionDeclaration' && root.id) {
      s.appendLeft(root.start!, `const ${root.id.name} = `)
    }
    s.appendLeft(root.start!, `${forwardRef}(`)

    refName = root.params[1]
      ? s.sliceNode(root.params[1])
      : `${HELPER_PREFIX}ref`
    if (!root.params[0]) {
      s.appendRight(getParamsStart(root, s.original), `, ${refName}`)
    } else if (!root.params[1]) {
      s.appendLeft(root.params[0].end!, `, ${refName}`)
    }
    s.appendRight(root.end!, `)`)
  }

  s.overwrite(
    node.start!,
    node.arguments[0].start!,
    `${useImperativeHandle}(${refName}, () =>(`,
  )
  const result = new Set()
  walkIdentifiers(
    node.arguments[0],
    (id, _, parentStack, ___, isLocal) => {
      if (!isLocal) {
        let res: Node | null = id
        for (let i = parentStack.length - 1; i >= 0; i--) {
          if (
            ['MemberExpression', 'OptionalMemberExpression'].includes(
              parentStack[i].type,
            )
          ) {
            res = parentStack[i]
          } else {
            if (
              ['CallExpression', 'OptionalCallExpression'].includes(
                parentStack[i].type,
              )
            ) {
              res = null
            }
            break
          }
        }
        if (res) result.add(s.sliceNode(res))
      }
    },
    false,
  )
  s.appendRight(
    node.arguments[0].end!,
    `), ${`[${result.size ? [...result] : ''}]`}`,
  )
}
