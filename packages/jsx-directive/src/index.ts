import {
  createFilter,
  FilterFileType,
  getFilterPattern,
  REGEX_NODE_MODULES,
  REGEX_SETUP_SFC,
  type BaseOptions,
  type MarkRequired,
} from '@vue-macros/common'
import { detectVueVersion } from '@vue-macros/common/dep'
import { generatePluginName } from '#macros' with { type: 'macro' }
import {
  createUnplugin,
  type UnpluginContextMeta,
  type UnpluginInstance,
} from 'unplugin'
import { transformJsxDirective } from './core'

export type Options = BaseOptions & { prefix?: string }
export type OptionsResolved = MarkRequired<Options, 'version'>

function resolveOptions(
  options: Options,
  framework: UnpluginContextMeta['framework'],
): OptionsResolved {
  const version = options.version || detectVueVersion(undefined, 0)
  const include = getFilterPattern(
    [FilterFileType.VUE_SFC, FilterFileType.SRC_FILE],
    framework,
  )
  return {
    include,
    exclude: [REGEX_NODE_MODULES, REGEX_SETUP_SFC],
    ...options,
    version,
  }
}

const name = generatePluginName()

const plugin: UnpluginInstance<Options | undefined, false> = createUnplugin(
  (userOptions = {}, { framework }) => {
    const options = resolveOptions(userOptions, framework)
    const filter = createFilter(options)

    return {
      name,
      enforce: 'pre',

      transformInclude: filter,
      transform(code, id) {
        return transformJsxDirective(code, id, options.version, options.prefix)
      },
    }
  },
)
export default plugin
