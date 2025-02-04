import { importHelperFn, type MagicStringAST } from '@vue-macros/common'
import { restructure } from '@vue-macros/jsx-directive/api'
import { walkIdentifiers } from '@vue/compiler-core'
import { importHelper } from '../common'
import { withDefaultsHelperId } from '../helper'
import type { FunctionalNode, RootMapValue } from '..'
import type { OptionsResolved } from '../..'
import { transformAwait } from './await'
import { transformReturn } from './return'
import type { ObjectExpression, Program } from '@babel/types'

export function transformDefineComponent(
  root: FunctionalNode,
  propsName: string,
  map: RootMapValue,
  s: MagicStringAST,
  ast: Program,
  options: OptionsResolved,
): void {
  if (!map.defineComponent) return
  importHelper({ s, ast, local: options.defineComponent.alias[0] })

  let hasRestProp = false
  const props: Record<string, string | null> = {}
  if (root.params[0]) {
    if (root.params[0].type === 'Identifier') {
      getWalkedIds(root, propsName).forEach((id) => (props[id] = null))
    } else {
      const restructuredProps = restructure(s, root, {
        withDefaultsFrom: withDefaultsHelperId,
        generateRestProps: (restPropsName, index, list) => {
          if (index === list.length - 1) {
            hasRestProp = true
            const useAttrs = importHelperFn(s, 0, 'useAttrs', 'vue')
            return `const ${restPropsName} = ${useAttrs}()`
          }
        },
      })
      for (const prop of restructuredProps) {
        if (prop.path.endsWith('props') && !prop.isRest) {
          props[prop.name] = prop.isRequired ? '{ required: true }' : null
        }
      }
    }
  }

  for (const { expression, isRequired } of map.defineModel || []) {
    const modelOptions =
      expression.arguments[0]?.type === 'ObjectExpression'
        ? expression.arguments[0]
        : expression.arguments[1]?.type === 'ObjectExpression'
          ? expression.arguments[1]
          : undefined
    const options: any = {}
    if (isRequired) options.required = true
    for (const prop of modelOptions?.properties || []) {
      if (
        prop.type === 'ObjectProperty' &&
        prop.key.type === 'Identifier' &&
        ['validator', 'type', 'required'].includes(prop.key.name)
      ) {
        options[prop.key.name] = s.sliceNode(prop.value)
      }
    }
    const propName =
      expression.arguments[0]?.type === 'StringLiteral'
        ? expression.arguments[0].value
        : 'modelValue'
    props[propName] = Object.keys(options).length
      ? `{ ${Object.entries(options)
          .map(([key, value]) => `${key}: ${value}`)
          .join(', ')} }`
      : null
    props[`onUpdate:${propName}`] = null
    props[`${propName === 'modelValue' ? 'model' : propName}Modifiers`] = null
  }

  const propsString = Object.entries(props)
    .map(([key, value]) => `'${key}': ${value}`)
    .join(', ')
  if (propsString) {
    const argument = map.defineComponent.arguments[1]
    if (!argument) {
      s.appendRight(
        root.end!,
        `, {${hasRestProp ? 'inheritAttrs: false,' : ''} props: { ${propsString} } }`,
      )
    } else if (argument.type === 'ObjectExpression') {
      prependObjectExpression(argument, 'props', `{ ${propsString} }`, s)
      if (hasRestProp) {
        prependObjectExpression(argument, 'inheritAttrs', 'false', s)
      }
    }
  }

  transformAwait(root, s)
  transformReturn(root, s, options.lib)
}

function prependObjectExpression(
  argument: ObjectExpression,
  name: string,
  value: string,
  s: MagicStringAST,
) {
  if (
    !argument.properties?.find(
      (prop) =>
        prop.type === 'ObjectProperty' &&
        prop.key.type === 'Identifier' &&
        prop.key.name === name,
    )
  ) {
    s.appendRight(argument.start! + 1, `${name}: ${value},`)
  }
}

function getWalkedIds(root: FunctionalNode, propsName: string) {
  const walkedIds = new Set<string>()
  walkIdentifiers(
    root.body,
    (id, parent) => {
      if (
        id.name === propsName &&
        (parent?.type === 'MemberExpression' ||
          parent?.type === 'OptionalMemberExpression')
      ) {
        const prop =
          parent.property.type === 'Identifier'
            ? parent.property.name
            : parent.property.type === 'StringLiteral'
              ? parent.property.value
              : ''
        if (prop) walkedIds.add(prop)
      }
    },
    false,
  )
  return walkedIds
}
