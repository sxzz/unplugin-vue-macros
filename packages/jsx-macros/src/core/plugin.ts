import {
  createFilter,
  detectVueVersion,
  FilterFileType,
  getFilterPattern,
  normalizePath,
  REGEX_NODE_MODULES,
  REGEX_SETUP_SFC,
  type BaseOptions,
  type MarkRequired,
} from '@vue-macros/common'
import { generatePluginName } from '#macros' with { type: 'macro' }
import {
  helperPrefix,
  useExposeHelperCode,
  useExposeHelperId,
  useModelHelperCode,
  useModelHelperId,
  withDefaultsHelperCode,
  withDefaultsHelperId,
} from './helper'
import { transformStyle } from './style'
import { transformJsxMacros } from '.'
import type { UnpluginContextMeta, UnpluginFactory } from 'unplugin'

export type Options = BaseOptions & {
  lib?: 'vue' | 'vue/vapor' | 'react' | 'preact'
  defineComponent?: { alias: string[] }
  defineModel?: { alias: string[] }
  defineExpose?: { alias: string[] }
  defineSlots?: { alias: string[] }
  defineStyle?: { alias: string[] }
}
export type OptionsResolved = MarkRequired<
  Options,
  | 'include'
  | 'version'
  | 'lib'
  | 'defineComponent'
  | 'defineModel'
  | 'defineExpose'
  | 'defineSlots'
  | 'defineStyle'
>

function resolveOptions(
  options: Options,
  framework: UnpluginContextMeta['framework'],
): OptionsResolved {
  const version = options.version || detectVueVersion()
  const lib = options.lib || 'vue'
  const include = getFilterPattern([FilterFileType.SRC_FILE], framework)
  return {
    include,
    exclude: [REGEX_SETUP_SFC, REGEX_NODE_MODULES],
    ...options,
    version,
    lib,
    defineComponent: {
      alias: options?.defineComponent?.alias ?? ['defineComponent'],
    },
    defineModel: { alias: options?.defineModel?.alias ?? ['defineModel'] },
    defineSlots: { alias: options?.defineSlots?.alias ?? ['defineSlots'] },
    defineExpose: { alias: options?.defineExpose?.alias ?? ['defineExpose'] },
    defineStyle: { alias: options?.defineStyle?.alias ?? ['defineStyle'] },
  }
}

const name = generatePluginName()

export const plugin: UnpluginFactory<Options | undefined> = (
  userOptions: Options = {},
  meta = { framework: 'vite' },
) => {
  const { framework } = meta
  const options = resolveOptions(userOptions, framework)
  const filter = createFilter(options)
  const importMap = new Map()

  return {
    name,
    enforce: 'pre',

    resolveId(id) {
      if (normalizePath(id).startsWith(helperPrefix)) return id
    },
    loadInclude(id) {
      return normalizePath(id).startsWith(helperPrefix)
    },
    load(_id) {
      const id = normalizePath(_id)
      if (id === useExposeHelperId) return useExposeHelperCode
      else if (id === useModelHelperId) return useModelHelperCode
      else if (id === withDefaultsHelperId) return withDefaultsHelperCode
      else if (importMap.get(id)) return importMap.get(id)
    },

    transformInclude(id) {
      if (importMap.get(id)) return true
      return filter(id)
    },
    transform(code, id) {
      if (importMap.get(id)) return transformStyle(code, id, options)
      return transformJsxMacros(code, id, importMap, options)
    },
  }
}
