import { Fragment, h } from 'vue'
import type { NativeElements } from './jsx-runtime/dom'

function jsx(type: any, props: any, key: any): ReturnType<typeof h> {
  const { children } = props
  delete props.children
  if (arguments.length > 2) {
    props.key = key
  }
  return h(type, props, children)
}

export { Fragment, jsx, jsx as jsxDEV, jsx as jsxs }

type VNode = import('vue').VNode
type ReservedProps = import('vue').ReservedProps
type AllowedComponentProps = import('vue').AllowedComponentProps
type ComponentCustomProps = import('vue').ComponentCustomProps

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface Element extends VNode {}
    interface ElementClass {
      $props: {}
    }
    interface ElementAttributesProperty {
      $props: {}
    }
    interface IntrinsicElements extends NativeElements {
      [name: string]: any
    }

    interface IntrinsicAttributes
      extends ReservedProps,
        AllowedComponentProps,
        ComponentCustomProps {}
  }
}
