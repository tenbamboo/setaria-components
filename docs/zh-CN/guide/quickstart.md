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
import ElementPlus from 'element-plus'
import VXETable from 'vxe-table'
import SetariaComponents from 'setaria-components'

import 'vxe-table/lib/style.css'
import 'element-plus/dist/index.css'
import 'setaria-components/dist/index.css'
import App from './App.vue'

const app = createApp(App)

app.use(ElementPlus).use(VXETable).use(SetariaComponents)
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
