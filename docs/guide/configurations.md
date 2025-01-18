# Configurations

## Plugin Options

All features are enabled by default except the following.

#### Disabled by Default

- `exportExpose`
- `exportProps`
- `exportRender`
- `setupSFC`
- `booleanProp`
- `shortBind`
- `defineStyleX`

#### Disabled by Default when Vue >= 3.3

- `defineOptions`
- `defineSlots`
- `hoistStatic`
- `shortEmits`

You can re-enable them by setting the option to `true`.

```ts twoslash [vue-macros.config.(ts,js,json)]
import { defineConfig } from 'unplugin-vue-macros'
export default defineConfig({
  root: '/your-project-path',

  /**
   * Vue version, 2 or 3.
   *
   * optional, detecting automatically.
   */
  version: 3,

  /** Defaults to true */
  defineModels: {
    // ...
  },

  // Enable features
  defineOptions: true,

  // Disable features
  hoistStatic: false,

  // ... more features
})
```

Refer to the macros and features page for available options.
