<script setup>
import { version } from 'vue-tsc/package.json'
</script>

# 入门指南

Vue Macros 是一个实现 Vue 非官方提案和想法的库，探索并扩展了其功能和语法。

在继续之前，我们假设你已经熟悉 Vue 的基本用法。

## 要求

- Node.js `>= v20.18.0`
- Vue `>= v2.7` 或 Vue `>= v3.0`
  - 某些功能需要 Vue `>= v3.2.25`
- VSCode 扩展 [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) 和 `vue-tsc` 为 <code>v{{ version }}</code>
  - Vue Macros 会持续尽快适配最新版本，旧版本可能不受支持

::: warning
不支持 WebStorm。
:::

## 创建 Vue Macros 项目

### 安装

::: code-group

```bash [npm]
npm i -g @vue-macros/cli
```

```bash [yarn]
yarn global add @vue-macros/cli
```

```bash [pnpm]
pnpm add -g @vue-macros/cli
```

:::

此命令将安装 [@vue-macros/cli](https://github.com/vue-macros/vue-macros-cli)，这是官方的 Vue Macros 脚手架工具。

### 初始化

::: code-group

```bash [npm]
npm create vite@latest my-vue-macros -- --template vue-ts
cd my-vue-macros
vue-macros init
```

```bash [yarn]
yarn create vite my-vue-macros --template vue-ts
cd my-vue-macros
vue-macros init
```

```bash [pnpm]
pnpm create vite my-vue-macros --template vue-ts
cd my-vue-macros
vue-macros init
```

你将会看到一些可选的实验性功能提示。

:::

## 模板

- [Vite](https://github.com/vue-macros/vite)
- [Nuxt](https://github.com/vue-macros/nuxt)
- [Rsbuild](https://github.com/vue-macros/vue3-rsbuild)

🌟 欢迎更多模板！

## Nuxt 集成

如果你使用 [Nuxt](https://nuxt.com/)，请阅读 [Nuxt 集成](./nuxt-integration.md)。

## 构建工具集成

如果你使用 [Vite](https://vitejs.dev/)、[Rollup](https://rollupjs.org/)、[esbuild](https://esbuild.github.io/)、[Webpack](https://webpack.js.org/)、或 [Rspack](https://www.rspack.dev/)，请阅读 [构建工具集成](./bundler-integration.md)。
