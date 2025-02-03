import { createPlugin, type PluginReturn } from 'ts-macro'
import jsxDirective from './jsx-directive'
import jsxMacros from './jsx-macros'
import jsxRef from './jsx-ref'
import type { Options } from '@vue-macros/config'

const jsxPlugins = {
  jsxDirective,
  jsxMacros,
  jsxRef,
}

type JSXOptions = {
  jsxDirective?: Options['jsxDirective']
  jsxMacros?: Options['jsxMacros']
  jsxRef?: Options['jsxRef']
}

const plugin: PluginReturn<JSXOptions | undefined> = createPlugin(
  (ctx, userOptions) =>
    Object.entries(jsxPlugins).flatMap(([name, plugin]) => {
      const options = userOptions?.[name as keyof JSXOptions] ?? ({} as any)
      if (!options) return []
      return plugin(options === true ? {} : options)(ctx)
    }),
)

export default plugin
