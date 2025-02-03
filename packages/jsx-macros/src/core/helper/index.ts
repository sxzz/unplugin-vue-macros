import { VIRTUAL_ID_PREFIX } from '@vue-macros/common'

export const helperPrefix: '/vue-macros/jsx-macros' = `${VIRTUAL_ID_PREFIX}/jsx-macros`

export const useExposeHelperId: '/vue-macros/jsx-macros/use-expose' = `${helperPrefix}/use-expose`
export { default as useExposeHelperCode } from './use-expose?raw'

export const useModelHelperId: '/vue-macros/jsx-macros/use-model' = `${helperPrefix}/use-model`
export { default as useModelHelperCode } from './use-model?raw'

export const withDefaultsHelperId: '/vue-macros/jsx-macros/with-defaults' = `${helperPrefix}/with-defaults`
export { withDefaultsHelperCode } from '@vue-macros/jsx-directive/api'
