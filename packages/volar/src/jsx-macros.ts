import { createFilter } from '@vue-macros/common'
import { createPlugin, type PluginReturn } from 'ts-macro'
import {
  getGlobalTypes,
  getRootMap,
  transformJsxMacros,
} from './jsx-macros/index'
import type { OptionsResolved } from '@vue-macros/config'

const plugin: PluginReturn<OptionsResolved['jsxMacros'] | undefined> =
  createPlugin(
    (
      { ts, vueCompilerOptions },
      userOptions = vueCompilerOptions?.vueMacros?.jsxMacros === true
        ? {}
        : (vueCompilerOptions?.vueMacros?.jsxMacros ?? {}),
    ) => {
      if (!userOptions) return []

      const filter = createFilter(userOptions)
      const lib = userOptions.lib ?? 'vue'
      const macros = {
        defineComponent: {
          alias: userOptions.defineComponent?.alias ?? ['defineComponent'],
        },
        defineModel: {
          alias: userOptions.defineModel?.alias ?? ['defineModel'],
        },
        defineExpose: {
          alias: userOptions.defineExpose?.alias ?? ['defineExpose'],
        },
        defineSlots: {
          alias: userOptions.defineSlots?.alias ?? ['defineSlots'],
        },
        defineStyle: {
          alias: userOptions.defineStyle?.alias ?? ['defineStyle'],
        },
      }

      return {
        name: 'vue-macros-jsx-macros',
        resolveVirtualCode(virtualCode) {
          const { filePath, languageId, codes } = virtualCode
          if (!filter(filePath) || !['jsx', 'tsx'].includes(languageId)) return

          const options = {
            ...virtualCode,
            ts,
            lib,
            ...macros,
          }
          const rootMap = getRootMap(options)
          if (rootMap.size) {
            transformJsxMacros(rootMap, options)
            codes.push(getGlobalTypes(options))
          }
        },
      }
    },
  )
export default plugin
