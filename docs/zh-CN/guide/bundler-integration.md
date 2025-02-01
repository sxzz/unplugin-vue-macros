# 构建工具集成 <PackageVersion name="unplugin-vue-macros" />

## 安装

::: tip

完全支持 Vite 和 Rollup，其他构建工具支持有限。

:::

::: code-group

```bash [npm]
npm i -D unplugin-vue-macros
```

```bash [yarn]
yarn add -D unplugin-vue-macros
```

```bash [pnpm]
pnpm add -D unplugin-vue-macros
```

:::

::: code-group

```ts [Vite]
// vite.config.ts
import Vue from '@vitejs/plugin-vue'
import VueMacros from 'unplugin-vue-macros/vite'
// import VueJsx from '@vitejs/plugin-vue-jsx'
// import VueRouter from 'unplugin-vue-router/vite'

export default defineConfig({
  plugins: [
    VueMacros({
      plugins: {
        vue: Vue(),
        // vueJsx: VueJsx(), // 如有需要
        // vueRouter: VueRouter({ // 如有需要
        //   extensions: ['.vue', '.setup.tsx']
        // })
      },
      // 覆盖插件选项
    }),
  ],
})
```

```ts [Rollup]
// rollup.config.js
import VueMacros from 'unplugin-vue-macros/rollup'
import Vue from 'unplugin-vue/rollup'
// import VueRouter from 'unplugin-vue-router/rollup'

export default {
  plugins: [
    VueMacros({
      plugins: {
        vue: Vue(),
        // vueJsx: VueJsx(), // 如有需要
        // vueRouter: VueRouter({ // 如有需要
        //   extensions: ['.vue', '.setup.tsx']
        // })
      },
      // 覆盖插件选项
    }),
  ],
}
```

```js [esbuild]
// esbuild.config.js
import { build } from 'esbuild'
// import VueRouter from 'unplugin-vue-router/esbuild'

build({
  plugins: [
    require('unplugin-vue-macros/esbuild')({
      plugins: {
        vue: require('unplugin-vue/esbuild')(),
        // vueJsx: VueJsx(), // 如有需要
        // vueRouter: VueRouter({ // 如有需要
        //   extensions: ['.vue', '.setup.tsx']
        // })
      },
      // 覆盖插件选项
    }),
  ],
})
```

```js [Webpack]
// webpack.config.js
module.exports = {
  /* ... */
  plugins: [
    require('unplugin-vue-macros/webpack')({
      // 覆盖插件选项
    }),
  ],
}
```

```js [Rspack]
// rspack.config.js
module.exports = {
  /* ... */
  plugins: [
    require('unplugin-vue-macros/rspack')({
      // 覆盖插件选项
    }),
  ],
}
```

```js [Rsbuild]
// rsbuild.config.js
module.exports = {
  // ...
  tools: {
    rspack: {
      plugins: [
        require('unplugin-vue-macros/rspack')({
          // 覆盖插件选项
        }),
      ],
    },
  },
}
```

```js [Vue CLI]
// vue.config.js
const { defineConfig } = require('@vue/cli-service')
const VueMacros = require('unplugin-vue-macros/webpack')

module.exports = defineConfig({
  // ...
  // ⚠️ 重要
  parallel: false,
  configureWebpack: {
    plugins: [
      VueMacros({
        // 覆盖插件选项
      }),
    ],
  },
})
```

:::

## 配置

详情请参阅 [配置](./configurations.md)。

```ts twoslash [vue-macros.config.ts]
import { defineConfig } from 'unplugin-vue-macros'
export default defineConfig({
  // 选项
})
```

## TypeScript 支持

```json {0}
// tsconfig.json
{
  "compilerOptions": {
    // ...
    "types": ["unplugin-vue-macros/macros-global" /* ... */]
  }
}
```

## Volar 支持

详细配置请参阅具体宏的描述。

```jsonc [tsconfig.json]
{
  "vueCompilerOptions": {
    "plugins": ["unplugin-vue-macros/volar"],
  },
}
```

### 作用域插件

`exportExpose`、`exportProps` 和 `exportRender` 插件不能同时使用，除非提供作用域。

```ts twoslash [vue-macros.config.ts]
import { defineConfig } from 'unplugin-vue-macros'
export default defineConfig({
  exportExpose: {
    include: ['**/export-expose/**'],
  },
  exportProps: {
    include: ['**/export-props/**'],
  },
  exportRender: {
    include: ['**/export-render/**'],
  },
})
```

---

:tada: 恭喜！你已成功设置 Vue Macros。

想了解更多关于宏的信息，请访问 [所有宏](/macros/) :laughing:.
