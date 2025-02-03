/* eslint perfectionist/sort-imports: ["error", {
  customGroups: {
    "value": {
      "vue-macros": ["@vue-macros/.*", "unplugin-vue-define-options"]
    },
  },
  groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'vue-macros'],
  internalPattern: ['#.*'],
  newlinesBetween: 'ignore',
}] */

import {
  createCombinePlugin,
  type OptionsPlugin,
  type UnpluginCombineInstance,
} from 'unplugin-combine'
import { generatePluginName } from '#macros' with { type: 'macro' }
import { excludeDepOptimize } from './core/exclude-macros'
import { resolvePlugin } from './core/plugin'

import VueBetterDefine from '@vue-macros/better-define'
import VueBooleanProp from '@vue-macros/boolean-prop'
import VueChainCall from '@vue-macros/chain-call'
import { resolveOptionsAsync, type Options } from '@vue-macros/config'
import VueDefineEmit from '@vue-macros/define-emit'
import VueDefineModels from '@vue-macros/define-models'
import VueDefineProp from '@vue-macros/define-prop'
import VueDefineProps from '@vue-macros/define-props'
import VueDefinePropsRefs from '@vue-macros/define-props-refs'
import VueDefineRender from '@vue-macros/define-render'
import VueDefineSlots from '@vue-macros/define-slots'
import VueDefineStyleX from '@vue-macros/define-stylex'
import { Devtools } from '@vue-macros/devtools'
import VueExportExpose from '@vue-macros/export-expose'
import VueExportProps from '@vue-macros/export-props'
import VueExportRender from '@vue-macros/export-render'
import VueHoistStatic from '@vue-macros/hoist-static'
import VueJsxDirective from '@vue-macros/jsx-directive'
import VueJsxMacros from '@vue-macros/jsx-macros'
import VueNamedTemplate from '@vue-macros/named-template'
import VueReactivityTransform from '@vue-macros/reactivity-transform'
import VueScriptLang from '@vue-macros/script-lang'
import VueSetupBlock from '@vue-macros/setup-block'
import VueSetupComponent from '@vue-macros/setup-component'
import VueSetupSFC from '@vue-macros/setup-sfc'
import VueShortBind from '@vue-macros/short-bind'
import VueShortEmits from '@vue-macros/short-emits'
import VueShortVmodel from '@vue-macros/short-vmodel'
import VueDefineOptions from 'unplugin-vue-define-options'

export {
  defineConfig,
  resolveOptions,
  resolveOptionsAsync,
  type Options,
} from '@vue-macros/config'

const name = generatePluginName()
const plugin: UnpluginCombineInstance<Options | undefined> =
  createCombinePlugin<Options | undefined>((userOptions = {}, meta) => {
    return {
      name,
      plugins: (async () => {
        const options = await resolveOptionsAsync(userOptions)

        const framework = meta.framework!
        const setupComponentPlugins = resolvePlugin(
          VueSetupComponent,
          framework,
          options.setupComponent,
        )
        const namedTemplatePlugins = resolvePlugin(
          VueNamedTemplate,
          framework,
          options.namedTemplate,
        )

        const plugins: OptionsPlugin[] = [
          resolvePlugin(VueSetupSFC, framework, options.setupSFC),
          setupComponentPlugins?.[0],
          resolvePlugin(VueSetupBlock, framework, options.setupBlock),
          resolvePlugin(VueScriptLang, framework, options.scriptLang),
          options.plugins.vueRouter,
          namedTemplatePlugins?.[0],

          // props
          resolvePlugin(VueChainCall, framework, options.chainCall),
          resolvePlugin(VueDefineProps, framework, options.defineProps),
          resolvePlugin(VueDefinePropsRefs, framework, options.definePropsRefs),
          resolvePlugin(VueExportProps, framework, options.exportProps),

          // emits
          resolvePlugin(VueDefineEmit, framework, options.defineEmit),
          resolvePlugin(VueShortEmits, framework, options.shortEmits),

          // both props & emits
          resolvePlugin(VueDefineModels, framework, options.defineModels),

          // convert to runtime props & emits
          resolvePlugin(VueBetterDefine, framework, options.betterDefine),

          // runtime props
          resolvePlugin(VueDefineProp, framework, options.defineProp),

          resolvePlugin(VueDefineSlots, framework, options.defineSlots),
          resolvePlugin(VueDefineStyleX, framework, options.defineStyleX),
          resolvePlugin(VueExportRender, framework, options.exportRender),
          resolvePlugin(VueExportExpose, framework, options.exportExpose),
          resolvePlugin(VueJsxDirective, framework, options.jsxDirective),
          resolvePlugin(
            VueReactivityTransform,
            framework,
            options.reactivityTransform,
          ),
          resolvePlugin(VueHoistStatic, framework, options.hoistStatic),
          resolvePlugin(VueDefineOptions, framework, options.defineOptions),

          ...(framework === 'vite' ||
          framework === 'rollup' ||
          framework === 'rolldown'
            ? [
                resolvePlugin(
                  // VueBooleanProp is not an unplugin, by now
                  VueBooleanProp as any,
                  framework,
                  options.booleanProp,
                ),
                resolvePlugin(
                  // VueShortBind is not an unplugin, by now
                  VueShortBind as any,
                  framework,
                  options.shortBind,
                ),
                resolvePlugin(
                  // VueShortVmodel is not an unplugin, by now
                  VueShortVmodel as any,
                  framework,
                  options.shortVmodel,
                ),
              ]
            : []),

          options.plugins.vue,
          resolvePlugin(VueJsxMacros, framework, options.jsxMacros),
          options.plugins.vueJsx,
          resolvePlugin(VueDefineRender, framework, options.defineRender),
          setupComponentPlugins?.[1],
          namedTemplatePlugins?.[1],
          framework === 'vite'
            ? Devtools({ nuxtContext: options.nuxtContext })
            : undefined,
          framework === 'vite' ? excludeDepOptimize() : undefined,
        ].filter(Boolean)

        return plugins
      })(),
    }
  })
export default plugin
