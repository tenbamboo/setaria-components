---
title: Quick Start
lang: en-US
---

# Quick Start

This section describes how to use Element Plus in your project.

## Usage

### Full Import

If you don’t care about the bundle size so much, it’s more convenient to use full import.

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

#### Volar support

If you use volar, please add the global component type definition to `compilerOptions.types` in `tsconfig.json`.

```json
// tsconfig.json
{
  "compilerOptions": {
    // ...
    "types": ["setaria-components/global"]
  }
}
```

### On-demand Import

You need to use an additional plugin to import components you used.

#### Auto import <el-tag type="primary" style="vertical-align: middle;" effect="dark" size="small">Recommend</el-tag>

First you need to install `unplugin-vue-components` and `unplugin-auto-import`.

```shell
npm install -D unplugin-vue-components unplugin-auto-import
```

Then add the code below into your `Vite` or `Webpack` config file.

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

For more bundlers ([Rollup](https://rollupjs.org/), [Vue CLI](https://cli.vuejs.org/)) and configs please reference [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components#installation) and [unplugin-auto-import](https://github.com/antfu/unplugin-auto-import#install).

#### Nuxt

For Nuxt users, you only need to install `@setaria-components/nuxt`.

```shell
npm install -D @setaria-components/nuxt
```

Then add the code below into your config file.

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@setaria-components/nuxt'],
})
```

Refer to the [docs](https://github.com/setaria-components/setaria-components-nuxt#readme) for how to configure it.

### Manually import

Element Plus provides out of box [Tree Shaking](https://webpack.js.org/guides/tree-shaking/)
functionalities based on ES Module.

But you need install [unplugin-setaria-components](https://github.com/setaria-components/unplugin-setaria-components) for style import.
And refer to the [docs](https://github.com/setaria-components/unplugin-setaria-components#readme) for how to configure it.

> App.vue

```html
<template>
  <el-button>I am ElButton</el-button>
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

You need to manually import the styles if you're using `unplugin-setaria-components` and only used the component API.

Example:

```ts
import 'setaria-components/es/components/message/style/css'
import { ElMessage } from 'setaria-components'
```

:::

## Starter Template

We provide a [Vite Template](https://github.com/setaria-components/setaria-components-vite-starter).

For Nuxt users we have a [Nuxt Template](https://github.com/setaria-components/setaria-components-nuxt-starter).

For Laravel users we have a [Laravel Template](https://github.com/setaria-components/setaria-components-in-laravel-starter).

## Global Configuration

When registering Element Plus, you can pass a global config object with `size` and
`zIndex` to set the default `size` for form components, and `zIndex` for
popup components, the default value for `zIndex` is `2000`.

Full import:

```ts
import { createApp } from 'vue'
import ElementPlus from 'setaria-components'
import App from './App.vue'

const app = createApp(App)
app.use(ElementPlus, { size: 'small', zIndex: 3000 })
```

On-demand:

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

## Using Nuxt.js

We can also use [Nuxt.js](https://v3.nuxtjs.org/)：

<div class="glitch-embed-wrap" style="height: 420px; width: 100%;">
  <iframe src="https://glitch.com/edit/#!/nuxt-setaria-components?path=components%2FExamples.vue%3A1%3A0" alt="nuxt-setaria-components on glitch" style="height: 100%; width: 100%; border: 0;"></iframe>
</div>

## Let's Get Started

You can bootstrap your project from now on. For each components usage, please
refer to [the individual component documentation](https://setaria-components.org/en-US/component/button.html).
