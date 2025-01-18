# 配置

## 插件选项

以下功能除外，默认情况下将启用所有功能。

#### 默认关闭

- `exportExpose`
- `exportProps`
- `exportRender`
- `setupSFC`
- `booleanProp`
- `shortBind`

#### Vue >= 3.3 默认关闭

- `defineOptions`
- `defineSlots`
- `hoistStatic`
- `shortEmits`

你可以通过将选项设置为 `true` 来重新启用它们。

```ts twoslash [vue-macros.config.ts(js|ts|json)]
// vue-macros.config.[js,ts,json]

import { defineConfig } from 'unplugin-vue-macros'
export default defineConfig({
  root: '/your-project-path',

  /**
   * Vue 版本，2, 3, 3.3 等。
   *
   * 可选，自动检测版本
   */
  version: 3,

  /** 默认 true  */
  defineModels: {
    // ...
  },

  // 开启功能
  defineOptions: true,

  // 关闭功能
  hoistStatic: false,

  // ...更多功能
})
```

有关每个功能的配置选项，请参考对应的页面。
