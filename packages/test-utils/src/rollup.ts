import {
  rollupBuild as _rollupBuild,
  RollupEscapeNullCharacterPlugin,
} from '@sxzz/test-utils'
import ViteVueJsx, {
  type Options as VueJsxOptions,
} from '@vitejs/plugin-vue-jsx'
import type { InputPluginOption, Plugin } from 'rollup'

export { default as RollupEsbuildPlugin } from 'rollup-plugin-esbuild'
export { default as RollupVue } from 'unplugin-vue/rollup'
export const RollupVueJsx = ViteVueJsx as (options?: VueJsxOptions) => Plugin

export { default as RollupJson } from '@rollup/plugin-json'
export { nodeResolve as RollupNodeResolve } from '@rollup/plugin-node-resolve'

export const RollupRemoveVueFilePathPlugin = (): Plugin => {
  const REGEX = [
    /\[["']__file["'],\s*["'](.*?)["']\]/g,
    /__component__\.options\.__file.*/,
  ]
  return {
    name: 'remove-vue-filepath',
    transform(code: string) {
      const transformed = code
        .replaceAll(REGEX[0], '__FILE__')
        .replace(REGEX[1], '__FILE__')
      if (code !== transformed) return transformed
    },
  }
}

export async function rollupBuild(
  file: string,
  plugins: InputPluginOption,
): Promise<string> {
  const { snapshot } = await _rollupBuild(file, plugins, {
    external: ['vue', '@vueuse/core', /^\0.*/, /^\/vue-macros\/.*/],
    plugins: [
      RollupEscapeNullCharacterPlugin(),
      RollupRemoveVueFilePathPlugin(),
    ],
  })
  return snapshot
}
