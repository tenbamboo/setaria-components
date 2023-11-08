---
title: 开发常见问题
lang: zh-CN
---

# 开发常见问题

这里是开发方面容易遇到的问题

## 如果你遇到依赖相关问题

```shell
rm -rf node_modules
pnpm i
```

## 链接本地依赖

```shell
# 获取构建结果
pnpm build
cd dist/setaria-components
# set cur setaria-components to global `node_modules`
pnpm link --global
# for esm we also need link setaria-components for dist
pnpm link --global setaria-components

# 进入你的项目, 链接到 `setaria-components`
cd your-project
pnpm link --global setaria-components
```

> 更多信息查看 [pnpm link](https://pnpm.io/cli/link)

## 主题

我们不应在scss文件中写入中文注释

那将会在 vite 构建下的 css 文件开头生成警告信息 `@charset "UTF-8";`

> 更多信息见 [#3219](https://github.com/setaria-components/setaria-components/issues/3219)
