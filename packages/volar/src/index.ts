import booleanProp from './boolean-prop'
import { getVolarOptions } from './common'
import defineEmit from './define-emit'
import defineGeneric from './define-generic'
import defineModels from './define-models'
import defineOptions from './define-options'
import defineProp from './define-prop'
import defineProps from './define-props'
import definePropsRefs from './define-props-refs'
import defineSlots from './define-slots'
import exportExpose from './export-expose'
import exportProps from './export-props'
import exportRender from './export-render'
import jsxDirective from './jsx-directive'
import jsxMacros from './jsx-macros'
import jsxRef from './jsx-ref'
import scriptLang from './script-lang'
import scriptSFC from './script-sfc'
import setupJsdoc from './setup-jsdoc'
import setupSFC from './setup-sfc'
import shortBind from './short-bind'
import shortVmodel from './short-vmodel'
import type { VueLanguagePlugin } from '@vue/language-core'

const plugins = {
  defineOptions,
  defineModels,
  defineProps,
  definePropsRefs,
  shortBind,
  shortVmodel,
  defineSlots,
  jsxDirective,
  booleanProp,
  exportRender,
  exportProps,
  exportExpose,
  defineProp,
  defineEmit,
  defineGeneric,
  setupJsdoc,
  setupSFC,
  scriptSFC,
  scriptLang,
  jsxRef,
  jsxMacros,
}

const plugin: VueLanguagePlugin = (ctx) =>
  Object.entries(plugins).flatMap(([name, plugin]) => {
    const options = getVolarOptions(ctx, name as keyof typeof plugins)
    if (!options) return []
    ;(ctx.vueCompilerOptions.vueMacros ??= {})[name as keyof typeof plugins] ??=
      options as any
    return plugin(ctx, options as any) as ReturnType<VueLanguagePlugin>
  })

export default plugin
