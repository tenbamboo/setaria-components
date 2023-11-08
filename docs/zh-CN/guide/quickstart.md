---
title: 快速开始
lang: zh-CN
---

# 快速开始

本节将介绍如何在项目中使用 Element Plus。

## 用法

### 完整引入

如果你对打包后的文件大小不是很在乎，那么使用完整导入会更方便。

```typescript
// main.ts
import { createApp } from 'vue'
import ElementPlus from 'setaria-components'
import 'setaria-components/dist/index.css'
import App from './App.vue'

const app = createApp(App)

app.use(ElementPlus)
app.mount('#app')
```

#### Volar 支持

如果您使用 Volar，请在 `tsconfig.json` 中通过 `compilerOptions.type` 指定全局组件类型。

```json
// tsconfig.json
{
  "compilerOptions": {
    // ...
    "types": ["setaria-components/global"]
  }
}
```

### 按需导入

您需要使用额外的插件来导入要使用的组件。

#### 自动导入 <el-tag type="primary" style="vertical-align: middle;" effect="dark" size="small">推荐</el-tag>

首先你需要安装`unplugin-vue-components` 和 `unplugin-auto-import`这两款插件

```shell
npm install -D unplugin-vue-components unplugin-auto-import
```

然后把下列代码插入到你的 `Vite` 或 `Webpack` 的配置文件中

##### Vite

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  // ...
  plugins: [
    // ...
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
})
```

##### Webpack

```js
// webpack.config.js
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = {
  // ...
  plugins: [
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
}
```

想了解更多打包 ([Rollup](https://rollupjs.org/), [Vue CLI](https://cli.vuejs.org/)) 和配置工具，请参考 [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components#installation) 和 [unplugin-auto-import](https://github.com/antfu/unplugin-auto-import#install)。

#### Nuxt

对于 Nuxt 用户，只需要安装 `@setaria-components/nuxt` 即可。

```shell
npm install -D @setaria-components/nuxt
```

然后将下面的代码写入你的配置文件.

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@setaria-components/nuxt'],
})
```

配置文档参考 [docs](https://github.com/setaria-components/setaria-components-nuxt#readme).

### 手动导入

Element Plus 提供了基于 ES Module 的开箱即用的 [Tree Shaking](https://webpack.js.org/guides/tree-shaking/) 功能。

但你需要安装 [unplugin-setaria-components](https://github.com/setaria-components/unplugin-setaria-components) 来导入样式。 配置文档参考 [docs](https://github.com/setaria-components/unplugin-setaria-components#readme).

> App.vue

```html
<template>
  <el-button>我是 ElButton</el-button>
</template>
<script>
  import { ElButton } from 'setaria-components'
  export default {
    components: { ElButton },
  }
</script>
```

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import ElementPlus from 'unplugin-setaria-components/vite'

export default defineConfig({
  // ...
  plugins: [ElementPlus()],
})
```

:::warning

如果使用 `unplugin-setaria-components` 并且只使用组件 API，你需要手动导入样式。

Example:

```ts
import 'setaria-components/es/components/message/style/css'
import { ElMessage } from 'setaria-components'
```

:::

## 快捷搭建项目模板

我们提供了 [Vite 模板](https://github.com/setaria-components/setaria-components-vite-starter)。

对于Nuxt 用户，我们有一个 [Nuxt 模板](https://github.com/setaria-components/setaria-components-nuxt-starter)。

对于 Laravel 用户，我们也准备了[ Laravel 模板](https://github.com/setaria-components/setaria-components-in-laravel-starter)。

## 全局配置

在引入 ElementPlus 时，可以传入一个包含 `size` 和 `zIndex` 属性的全局配置对象。 `size` 用于设置表单组件的默认尺寸，`zIndex` 用于设置弹出组件的层级，`zIndex` 的默认值为 `2000`。

完整引入：

```ts
import { createApp } from 'vue'
import ElementPlus from 'setaria-components'
import App from './App.vue'

const app = createApp(App)
app.use(ElementPlus, { size: 'small', zIndex: 3000 })
```

按需引入:

```vue
<template>
  <el-config-provider :size="size" :z-index="zIndex">
    <app />
  </el-config-provider>
</template>

<script>
import { defineComponent } from 'vue'
import { ElConfigProvider } from 'setaria-components'

export default defineComponent({
  components: {
    ElConfigProvider,
  },
  setup() {
    return {
      zIndex: 3000,
      size: 'small',
    }
  },
})
</script>
```

## 使用 Nuxt.js

我们也可以使用 [Nuxt.js](https://v3.nuxtjs.org/)：

<div class="glitch-embed-wrap" style="height: 420px; width: 100%;">
  <iframe src="https://glitch.com/edit/#!/nuxt-setaria-components?path=components%2FExamples.vue%3A1%3A0" alt="nuxt-setaria-components on glitch" style="height: 100%; width: 100%; border: 0;"></iframe>
</div>

## 开始使用

现在你可以启动项目了。 对于每个组件的用法，请查阅[对应的独立文档](https://setaria-components.org/en-US/component/button.html)。
