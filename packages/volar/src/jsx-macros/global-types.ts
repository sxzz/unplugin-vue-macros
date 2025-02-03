import { HELPER_PREFIX } from '@vue-macros/common'
import type { TransformOptions } from '.'

export function getGlobalTypes(options: TransformOptions): string {
  return `
const { defineModel${options.defineModel.alias[0] !== 'defineModel' ? `: ${options.defineModel.alias[0]}` : ''} } = await import('vue')
declare function ${HELPER_PREFIX}${options.defineComponent.alias[0]}<T extends ((props?: any) => any)>(setup: T, options?: Pick<import('vue').ComponentOptions, 'name' | 'inheritAttrs' | 'components' | 'directives'> & { props?: import('vue').ComponentObjectPropsOptions }): T;
declare function ${options.defineSlots.alias[0]}<T extends Record<string, any>>(): Partial<T>;
declare function ${options.defineSlots.alias[0]}<T extends Record<string, any>>(slots: T): T;
declare function ${options.defineExpose.alias[0]}<Exposed extends Record<string, any> = Record<string, any>>(exposed?: Exposed): Exposed;
declare const ${options.defineStyle.alias[0]}: { <T>(...args: ${HELPER_PREFIX}StyleArgs): T; scss: <T>(...args: ${HELPER_PREFIX}StyleArgs)=> T; sass: <T>(...args: ${HELPER_PREFIX}StyleArgs)=> T; stylus: <T>(...args: ${HELPER_PREFIX}StyleArgs)=> T; less: <T>(...args: ${HELPER_PREFIX}StyleArgs)=> T; postcss: <T>(...args: ${HELPER_PREFIX}StyleArgs)=> T };
type ${HELPER_PREFIX}StyleArgs = [style: string, options?: { scoped?: boolean }];
type ${HELPER_PREFIX}PrettifyLocal<T> = { [K in keyof T]: T[K]; } & {};
`
}
