---
title: HelloWould
lang: zh-CN
---

# HelloWould

我的第一个自定义组件

## 基础用法

我是第一个自定义组件

:::demo 测试自定义测试

hello-would/basic

:::


## HelloWould API

### HelloWould Attributes

| 名称         | 说明             | 类型                          | 默认值     | 必填 |
| ---------- | -------------- | --------------------------- | ------- | -- |
| `p1`   | 偏移距离           | ^[number]                   | `0`     | 否  |

### HelloWould Events

| 名称       | 说明               | 类型                                                                     |
| -------- | ---------------- | ---------------------------------------------------------------------- |
| `change` | fixed 状态改变时触发的事件 | ^[Function]`(fixed: boolean) => void`                               |
| `scroll` | 滚动时触发的事件         | ^[Function]`(value: { scrollTop: number, fixed: boolean }) => void` |

### HelloWould Exposes

| 方法名          | 说明            | 类型                         |
| ------------ | ------------- | -------------------------- |
| `update`     | 手动更新固钉状态      | ^[Function]`() => void` |
| `updateRoot` | 手动更新根元素的盒模型信息 | ^[Function]`() => void` |

### HelloWould Slots

| 插槽名       | 说明      |
| --------- | ------- |
| `default` | 自定义默认内容 |
