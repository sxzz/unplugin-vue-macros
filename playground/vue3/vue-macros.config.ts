import { defineConfig } from 'unplugin-vue-macros'

export default defineConfig({
  booleanProp: true,
  defineEmit: true,
  defineGeneric: true,
  defineOptions: true,
  defineProp: true,
  defineSlots: true,
  defineStyleX: true,
  exportExpose: {
    include: [/export-expose.*\.vue$/],
  },
  exportProps: {
    include: [/export-props.*\.vue$/],
  },
  exportRender: {
    include: [/export-render.*\.vue$/, /\.setup\.tsx?$/],
  },
  hoistStatic: true,
  jsxMacros: true,
  jsxRef: true,
  namedTemplate: false,
  reactivityTransform: true,
  scriptLang: true,
  scriptSFC: {
    include: [/vue3\/.*\.tsx$/],
  },
  setupBlock: true,
  setupSFC: true,
  shortBind: true,
  shortEmits: true,
})
