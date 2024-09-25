import {
  addNormalScript,
  DEFINE_STYLEX,
  generateTransform,
  isCallOf,
  MagicStringAST,
  parseSFC,
  walkAST,
  type CodeTransform,
} from '@vue-macros/common'
import {
  createTransformContext,
  NodeTypes,
  traverseNode,
  type DirectiveNode,
  type NodeTransform,
} from '@vue/compiler-dom'
import type { Node } from '@babel/types'

const STYLEX_CREATE = '_stylex_create'
const STYLEX_ATTRS = '_stylex_attrs'

export function transformDirective(s?: MagicStringAST): NodeTransform {
  return (node) => {
    if (!(node.type === NodeTypes.ELEMENT)) return
    const i = node.props.findIndex(
      (item) => item.type === NodeTypes.DIRECTIVE && item.name === 'stylex',
    )
    if (i === -1) return
    const directiveVStyleX = node.props[i] as DirectiveNode
    if (directiveVStyleX.exp?.type !== NodeTypes.SIMPLE_EXPRESSION)
      throw new Error('`v-stylex` must be passed a expression')

    node.props[i] = {
      ...directiveVStyleX,
      name: 'bind',
      exp: {
        ...directiveVStyleX.exp,
        content: `${STYLEX_ATTRS}(${directiveVStyleX.exp.content})`,
      },
    } // For volar

    s?.overwrite(
      directiveVStyleX.loc.start.offset,
      directiveVStyleX.loc.end.offset,
      `v-bind="${STYLEX_ATTRS}(${directiveVStyleX.exp.content})"`,
    )
  }
}

export function transformDefineStyleX(
  code: string,
  id: string,
): CodeTransform | undefined {
  if (!code.includes(DEFINE_STYLEX)) return
  const sfc = parseSFC(code, id)
  const { scriptSetup, getSetupAst, template } = sfc
  if (!scriptSetup || !template) return

  let scriptOffset: number | undefined
  const setupOffset = scriptSetup.loc.start.offset

  const s = new MagicStringAST(code)
  const normalScript = addNormalScript(sfc, s)

  function moveToScript(decl: Node, prefix: 'const ' | '' = '') {
    if (scriptOffset === undefined) scriptOffset = normalScript.start()

    const text = `\n${prefix}${s.sliceNode(decl, { offset: setupOffset })}`
    s.appendRight(scriptOffset, text)

    s.removeNode(decl, { offset: setupOffset })
  }

  const setupAST = getSetupAst()!

  walkAST<Node>(setupAST, {
    enter(node) {
      if (node.type !== 'VariableDeclaration') return
      node.declarations.forEach((decl) => {
        if (!isCallOf(decl.init, DEFINE_STYLEX)) return
        s.overwriteNode(decl.init.callee, STYLEX_CREATE, {
          offset: setupOffset,
        })
      })
      moveToScript(node)
    },
  })

  if (scriptOffset !== undefined) normalScript.end()

  const ctx = createTransformContext(template.ast!, {
    nodeTransforms: [transformDirective(s)],
  })

  traverseNode(template.ast!, ctx)

  return generateTransform(s, id)
}
