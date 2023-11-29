---
title: SearchForm
lang: zh-CN
---

# SearchForm

此组件基于`SehemaForm`组件的 Pro 版本，一般用于表格搜索等场景下使用

使用此组件前应先了解`SehemaForm`组件相关属性和事件等

## 基础用法

:::demo

search-form/basic

:::

## 校验

:::demo 可通过`schema.required`属性来控制表单中的必填项，也可通过`rules`属性来自定义校验规则

search-form/validation

## 收起时控制强制显示内容

:::demo 通过`force-collapse-items`属性来控制表单收起时强制显示几个列

search-form/force-columns

:::

## 自定义按钮区域

:::demo 通过`button-layout`属性来控制表单按钮区域的内容

search-form/custom-button

:::

## 事件相关

:::demo

search-form/event

:::

## SearchForm API

### SearchForm Attributes

此组件支持所有`el-form`与`scehma-form`中的属性，详细属性可[查看](https://element-plus.org/zh-CN/component/form.html#form-attributes)

| 名称                 | 说明                                                  | 类型     | 默认值 | 必填 |
| -------------------- | ----------------------------------------------------- | -------- | ------ | ---- |
| collapse             | 是否开启折叠功能                                      | Boolean  | true   | 否   |
| expand               | 折叠功能的状态                                        | Boolean  | false  | 否   |
| force-collapse-items | 当被折叠时，强制显示几个表单项                        | N        | —      | 否   |
| submitting           | 表单提交时的回调，需要返回 Promise 来告知是否处理完成 | Functoin | —      | 否   |

### SearchForm Events

| 名称            | 说明                     | 类型                                         |
| --------------- | ------------------------ | -------------------------------------------- |
| data-change     | 表单项值变更触发         | ^[Function]`(schemaKey, val, model) => void` |
| data-reset      | 点击重置按钮的回调       | ^[Function]`() => void`                      |
| data-submit     | 点击搜索或提交按钮的回调 | ^[Function]`(model) => void`                 |
| collapse-change | 折叠状态变更触发         | ^[Function]`(expand) => void`                |

### SearchForm Exposes

| 方法名        | 说明                                                          | 类型                                                                                                                              |
| ------------- | ------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| validate      | 对整个表单的内容进行验证。 接收一个回调函数，或返回 Promise。 | ^[Function]`(callback?: FormValidateCallback) => Promise<void>`                                                                   |
| validateField | 验证具体的某个字段。                                          | ^[Function]`(props?: Arrayable<FormItemProp> \| undefined, callback?: FormValidateCallback \| undefined) => FormValidationResult` |
| resetFields   | 重置该表单项，将其值重置为初始值，并移除校验结果              | ^[Function]`(props?: Arrayable<FormItemProp> \| undefined) => void`                                                               |
| scrollToField | 滚动到指定的字段                                              | ^[Function]`(prop: FormItemProp) => void`                                                                                         |
| clearValidate | 清理某个字段的表单验证信息。                                  | ^[Function]`(props?: Arrayable<FormItemProp> \| undefined) => void`                                                               |

### SearchForm Slots

| 插槽名   | 说明                                               |
| -------- | -------------------------------------------------- |
| [字段名] | 对应表单项自定义插槽                               |
| button   | 按钮区域自定义插槽，需要配合 buton-layout 一起使用 |
