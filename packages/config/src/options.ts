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
/* eslint perfectionist/sort-interfaces: ["error", { ignorePattern: ["OptionsCommon"] }] */
/* eslint perfectionist/sort-objects: ["error", { partitionByNewLine: true }] */

import process from 'node:process'
import { loadConfig } from './config'
import { loadConfigAsync } from './config-worker'

import type { Options as OptionsBetterDefine } from '@vue-macros/better-define'
import type { Options as OptionsBooleanProp } from '@vue-macros/boolean-prop'
import type { Options as OptionsChainCall } from '@vue-macros/chain-call'
import {
  detectVueVersion,
  type BaseOptions,
  type FilterOptions,
} from '@vue-macros/common'
import type { Options as OptionsDefineEmit } from '@vue-macros/define-emit'
import type { Options as OptionsDefineModels } from '@vue-macros/define-models'
import type { Options as OptionsDefineProp } from '@vue-macros/define-prop'
import type { Options as OptionsDefineProps } from '@vue-macros/define-props'
import type { Options as OptionsDefinePropsRefs } from '@vue-macros/define-props-refs'
import type { Options as OptionsDefineRender } from '@vue-macros/define-render'
import type { Options as OptionsDefineSlots } from '@vue-macros/define-slots'
import type { Options as OptionsDefineStyleX } from '@vue-macros/define-stylex'
import type { Options as OptionsExportExpose } from '@vue-macros/export-expose'
import type { Options as OptionsExportProps } from '@vue-macros/export-props'
import type { Options as OptionsExportRender } from '@vue-macros/export-render'
import type { Options as OptionsHoistStatic } from '@vue-macros/hoist-static'
import type { Options as OptionsJsxDirective } from '@vue-macros/jsx-directive'
import type { Options as OptionsJsxMacros } from '@vue-macros/jsx-macros'
import type { Options as OptionsNamedTemplate } from '@vue-macros/named-template'
import type { Options as OptionsReactivityTransform } from '@vue-macros/reactivity-transform'
import type { Options as OptionsScriptLang } from '@vue-macros/script-lang'
import type { Options as OptionsSetupBlock } from '@vue-macros/setup-block'
import type { Options as OptionsSetupComponent } from '@vue-macros/setup-component'
import type { Options as OptionsSetupSFC } from '@vue-macros/setup-sfc'
import type { Options as OptionsShortBind } from '@vue-macros/short-bind'
import type { Options as OptionsShortEmits } from '@vue-macros/short-emits'
import type { Options as OptionsShortVmodel } from '@vue-macros/short-vmodel'
import type { Options as OptionsDefineOptions } from 'unplugin-vue-define-options'

export interface OptionsCommon extends Omit<BaseOptions, keyof FilterOptions> {
  root?: string
  plugins?: {
    vue?: any
    vueJsx?: any
    vueRouter?: any
  }
  /** @internal */
  nuxtContext?: {
    isClient?: boolean
  }
}

export interface FeatureOptionsMap {
  /**
   * @see {@link https://vue-macros.dev/features/better-define.html}
   * @default true
   */
  betterDefine: OptionsBetterDefine
  /**
   * @see {@link https://vue-macros.dev/features/boolean-prop.html}
   * @default false
   */
  booleanProp: OptionsBooleanProp
  /**
   * @see {@link https://vue-macros.dev/macros/chain-call.html}
   * @default true
   */
  chainCall: OptionsChainCall
  /**
   * @see {@link https://vue-macros.dev/macros/define-emit.html}
   * @default true
   */
  defineEmit: OptionsDefineEmit
  /**
   * @see {@link https://vue-macros.dev/volar/define-generic.html}
   * @default true
   */
  defineGeneric: FilterOptions
  /**
   * @see {@link https://vue-macros.dev/macros/define-models.html}
   * @default true
   */
  defineModels: OptionsDefineModels
  /**
   * @see {@link https://vue-macros.dev/macros/define-options.html}
   * @default vueVersion < 3.3
   */
  defineOptions: OptionsDefineOptions
  /**
   * @see {@link https://vue-macros.dev/macros/define-prop.html}
   * @default true
   */
  defineProp: OptionsDefineProp
  /**
   * @see {@link https://vue-macros.dev/macros/define-props.html}
   * @default true
   */
  defineProps: OptionsDefineProps
  /**
   * @see {@link https://vue-macros.dev/macros/define-props-refs.html}
   * @default true
   */
  definePropsRefs: OptionsDefinePropsRefs
  /**
   * @see {@link https://vue-macros.dev/macros/define-render.html}
   * @default true
   */
  defineRender: OptionsDefineRender
  /**
   * @see {@link https://vue-macros.dev/macros/define-slots.html}
   * @default vueVersion < 3.3
   */
  defineSlots: OptionsDefineSlots
  /**
   * @see {@link https://vue-macros.dev/macros/define-stylex.html}
   * @default false
   */
  defineStyleX: OptionsDefineStyleX
  /**
   * @see {@link https://vue-macros.dev/features/export-expose.html}
   * @default false
   */
  exportExpose: OptionsExportExpose
  /**
   * @see {@link https://vue-macros.dev/features/export-props.html}
   * @default false
   */
  exportProps: OptionsExportProps
  /**
   * @see {@link https://vue-macros.dev/features/export-render.html}
   * @default false
   */
  exportRender: OptionsExportRender
  /**
   * @see {@link https://vue-macros.dev/features/hoist-static.html}
   * @default true
   */
  hoistStatic: OptionsHoistStatic
  /**
   * @see {@link https://vue-macros.dev/features/jsx-directive.html}
   * @default true
   */
  jsxDirective: OptionsJsxDirective
  /**
   * @see {@link https://vue-macros.dev/features/jsx-macros.html}
   * @default false
   */
  jsxMacros: OptionsJsxMacros
  /**
   * @see {@link https://vue-macros.dev/features/jsx-ref.html}
   * @default false
   */
  jsxRef: FilterOptions & { alias?: string[] }
  /**
   * @see {@link https://vue-macros.dev/features/named-template.html}
   * @default false
   * @deprecated Not actively maintained now. Try [createReusableTemplate](https://vueuse.org/core/createReusableTemplate/) instead.
   */
  namedTemplate: OptionsNamedTemplate
  /**
   * @see {@link https://vue-macros.dev/features/reactivity-transform.html}
   * @default true
   */
  reactivityTransform: OptionsReactivityTransform
  /**
   * @see {@link https://vue-macros.dev/features/script-lang.html}
   * @default false
   */
  scriptLang: OptionsScriptLang
  /**
   * @see {@link https://vue-macros.dev/volar/script-sfc.html}
   * @default false
   */
  scriptSFC: FilterOptions
  /**
   * **experimental**: unpublished feature
   * @default false
   */
  setupBlock: OptionsSetupBlock
  /**
   * @see {@link https://vue-macros.dev/macros/setup-component.html}
   * @default true
   */
  setupComponent: OptionsSetupComponent
  /**
   * @see {@link https://vue-macros.dev/volar/setup-jsdoc.html}
   * @default true
   */
  setupJsdoc: FilterOptions
  /**
   * @see {@link https://vue-macros.dev/macros/setup-sfc.html}
   * @default false
   */
  setupSFC: OptionsSetupSFC
  /**
   * @see {@link https://vue-macros.dev/features/short-bind.html}
   * @default vueVersion < 3.4
   */
  shortBind: OptionsShortBind
  /**
   * @see {@link https://vue-macros.dev/macros/short-emits.html}
   * @default vueVersion < 3.3
   */
  shortEmits: OptionsShortEmits
  /**
   * @see {@link https://vue-macros.dev/macros/short-vmodel.html}
   * @default true
   */
  shortVmodel: OptionsShortVmodel
}
export type FeatureName = keyof FeatureOptionsMap
export type FeatureOptions = FeatureOptionsMap[FeatureName]

type OptionalSubOptions<T> = boolean | Omit<T, keyof OptionsCommon> | undefined
export type Options = OptionsCommon & {
  [K in keyof FeatureOptionsMap]?: OptionalSubOptions<FeatureOptionsMap[K]>
}

export type OptionsResolved = Required<OptionsCommon> & {
  [K in keyof FeatureOptionsMap]: false | FeatureOptionsMap[K]
}

export function resolveOptions(
  options?: Options,
  cwd: string = process.cwd(),
  config?: Omit<Options, 'plugins'>,
): OptionsResolved {
  config ||= loadConfig(cwd)

  let { isProduction, nuxtContext, plugins, root, version, ...subOptions } = {
    ...config,
    ...options,
  }

  root = root || cwd
  version = version || detectVueVersion(root)
  isProduction = isProduction ?? process.env.NODE_ENV === 'production'

  const globalOptions = { isProduction, root, version }
  return {
    isProduction,
    nuxtContext: nuxtContext || {},
    plugins: plugins || {},
    root,
    version,

    betterDefine: resolveSubOptions('betterDefine'),
    booleanProp: resolveSubOptions('booleanProp', false),
    chainCall: resolveSubOptions('chainCall'),
    defineEmit: resolveSubOptions('defineEmit'),
    defineGeneric: resolveSubOptions('defineGeneric'),
    defineModels: resolveSubOptions('defineModels'),
    defineOptions: resolveSubOptions('defineOptions', 3.3),
    defineProp: resolveSubOptions('defineProp'),
    defineProps: resolveSubOptions('defineProps'),
    definePropsRefs: resolveSubOptions('definePropsRefs'),
    defineRender: resolveSubOptions('defineRender'),
    defineSlots: resolveSubOptions('defineSlots', 3.3),
    defineStyleX: resolveSubOptions('defineStyleX', false),
    exportExpose: resolveSubOptions('exportExpose', false),
    exportProps: resolveSubOptions('exportProps', false),
    exportRender: resolveSubOptions('exportRender', false),
    hoistStatic: resolveSubOptions('hoistStatic'),
    jsxDirective: resolveSubOptions('jsxDirective'),
    jsxMacros: resolveSubOptions('jsxMacros', false),
    jsxRef: resolveSubOptions('jsxRef', false),
    namedTemplate: resolveSubOptions('namedTemplate'),
    reactivityTransform: resolveSubOptions('reactivityTransform'),
    scriptLang: resolveSubOptions('scriptLang', false),
    scriptSFC: resolveSubOptions('scriptSFC', false),
    setupBlock: resolveSubOptions('setupBlock', false),
    setupComponent: resolveSubOptions('setupComponent'),
    setupJsdoc: resolveSubOptions('setupJsdoc'),
    setupSFC: resolveSubOptions('setupSFC', false),
    shortBind: resolveSubOptions('shortBind', 3.4),
    shortEmits: resolveSubOptions('shortEmits', 3.3),
    shortVmodel: resolveSubOptions('shortVmodel'),
  }

  function resolveSubOptions<K extends FeatureName>(
    name: K,
    belowVersion: boolean | number = true,
  ): FeatureOptionsMap[K] | false {
    const defaultEnabled =
      typeof belowVersion === 'boolean' ? belowVersion : version! < belowVersion
    const options: OptionalSubOptions<FeatureOptionsMap[K]> =
      subOptions[name] ?? defaultEnabled
    if (!options) return false
    return {
      ...globalOptions,
      ...(options === true ? {} : options),
    }
  }
}

export async function resolveOptionsAsync(
  options?: Options,
  cwd: string = process.cwd(),
): Promise<OptionsResolved> {
  const config = await loadConfigAsync(cwd)
  return resolveOptions(options, cwd, config)
}
