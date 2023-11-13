---
title: SchemaForm
lang: zh-CN
---

# SchemaForm

此组件基于`JsonSchema`逻辑来使用的

## 基础用法

:::demo 通过`schema`属性来控制表单中的内容

schema-form/basic

:::

## 表单校验

:::demo 可通过`schema.required`属性来控制表单中的必填项，也可通过`rules`属性来自定义校验规则

schema-form/validation

:::

## SchemaUi 属性

- 可通过`schema-ui`属性来控制表单项的相关 UI 操作
- 可通过`schema-ui`中的`options`属性来自行设置对应原始组件中的属性
- 可通过`columns`属性来控制表单项的列布局

:::demo

schema-form/schema-ui

:::

## 事件相关

- 可通过`@change`事件来监控表单项中的值变更
- 可通过`@submit`事件来监控用户在输入框中按`回车`的事件

:::demo

schema-form/event

:::

## 插槽

:::demo

schema-form/slots

:::

## SchemaForm API

### SchemaForm Attributes

此组件支持所有`el-form`中的属性，详细属性可[查看](https://element-plus.org/zh-CN/component/form.html#form-attributes)

| 名称                | 说明               | 类型                           | 默认值 | 必填 |
| ------------------- | ------------------ | ------------------------------ | ------ | ---- |
| schema              | 表单项描述         | ^[Object]`SchemaProps`         | —      | 是   |
| modelValue(v-model) | 表单项值           | ^[Object]`Record<string, any>` | —      | 是   |
| ui-schema           | 表单项 UI 相关描述 | ^[Object]`Record<string, any>` | —      | 否   |
| rules               | 表单项验证规则     | ^[Object]`FormRules`           | —      | 否   |
| columns             | 表单项的列数       | Number                         | 5      | 否   |

### SchemaForm Events

| 名称        | 说明                 | 类型                                         |
| ----------- | -------------------- | -------------------------------------------- |
| data-change | 表单项数据值变更触发 | ^[Function]`(schemaKey, val, model) => void` |

### SchemaForm Exposes

| 方法名        | 说明                                                          | 类型                                                                                                                              |
| ------------- | ------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| validate      | 对整个表单的内容进行验证。 接收一个回调函数，或返回 Promise。 | ^[Function]`(callback?: FormValidateCallback) => Promise<void>`                                                                   |
| validateField | 验证具体的某个字段。                                          | ^[Function]`(props?: Arrayable<FormItemProp> \| undefined, callback?: FormValidateCallback \| undefined) => FormValidationResult` |
| resetFields   | 重置该表单项，将其值重置为初始值，并移除校验结果              | ^[Function]`(props?: Arrayable<FormItemProp> \| undefined) => void`                                                               |
| scrollToField | 滚动到指定的字段                                              | ^[Function]`(prop: FormItemProp) => void`                                                                                         |
| clearValidate | 清理某个字段的表单验证信息。                                  | ^[Function]`(props?: Arrayable<FormItemProp> \| undefined) => void`                                                               |

### SchemaForm Slots

| 插槽名   | 说明                 |
| -------- | -------------------- |
| [字段名] | 对应表单项自定义插槽 |
| row      | 对应 ElRow 下的插槽  |
