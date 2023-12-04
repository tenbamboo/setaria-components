---
title: SchemaTableEdit
lang: zh-CN
---

# SchemaTable

此组件与`SchemaTable`的属性、事件等内容一致，本页面内容是与编辑状态下的相关 Demo 演示

## 基础用法

:::demo 如想开启编辑模式需`label-mode`设置为`false`

schema-table-edit/basic

:::

## 新增&修改之前格式化数据

- 可通过`before-add-row`方法来返回一个对象来直接初始化详情表单中的值
- 可通过`before-update-row`方法来返回一个对象来直接修改详情表单中的值

:::demo

schema-table-edit/before-oper-data

:::

## 详情表单校验

- 可通过`schema.required`中添加必填校验字段
- 可通过`form-rules`来自定义校验内容

:::demo

schema-table-edit/form-rules

:::

## 自定义插槽

- 插槽可通过字段名来自定义
- 插槽分为两种模式，一种为编辑模式`scope.status === 'edit'`另外一种为默认显示模式`scope.status === 'default'`
- 插槽中可从`scope.data`中获取数据
- 需要注意的是：插槽内容中如有多个 Dom 内容，需用 Div 包裹一层

:::demo

schema-table-edit/slots

:::

## 详情表单保存回调

- 可通过`form-save`方法来获取用户操作的数据，并返回一个 Promise 对象来告知可处理或者处理成功

:::demo

schema-table-edit/form-save

:::

## 控制相关按钮

<!-- 查看按钮逻辑 -->

- 可通过`can-add`来控制是否显示`新增数据`按钮
- 可通过`can-update`来控制是否显示`修改`按钮
- 可通过`can-delete`来控制是否显示`删除`按钮
- 可通过`can-view`来控制是否显示`查看`按钮
- 可通过`can-update-row`的行级别控制是否显示`修改`按钮
- 可通过`can-delete-row`的行级别控制是否显示`删除`按钮
- 可通过`can-view-row`的行级别控制是否显示`查看`按钮
- 可通过`is-show-top-button`来控制顶部所有按钮是否显示

:::demo

schema-table-edit/control-button

:::

## 详情表单展示载体与透传属性

- 可通过`form-wrap-component`属性修改详情表单的展示载体为`drawer`(默认为`dialog`)
- 可通过`form-wrap-component-props`属性来透传底层组件的相关属性
- 可通过`form-props`属性来透传至详情表单属性

:::demo

schema-table-edit/form-wrap-component

:::

## SchemaUi 相关

- 可通过`schema-ui`属性来控制表单项的相关 UI 操作

:::demo

schema-table-edit/schema-ui

:::

## SchemaTable API

### SchemaTable Attributes

- 相关基础属性请查看`SchemaTable`组件
- 这里只罗列编辑状态下的属性

| 名称                     | 说明                                                                                              | 类型                                      | 默认值 | 必填 |
| ------------------------ | ------------------------------------------------------------------------------------------------- | ----------------------------------------- | ------ | ---- |
| can-add                  | 是否显示`添加`数据相关按钮（需同时设置 label-mode 为 false）                                      | Boolean                                   | true   | 否   |
| can-update               | 是否显示`修改`数据相关按钮（需同时设置 label-mode 为 false）                                      | Boolean                                   | true   | 否   |
| can-delete               | 是否显示`删除`数据相关按钮（需同时设置 label-mode 为 false）                                      | Boolean                                   | true   | 否   |
| can-delete               | 是否显示`查看`数据相关按钮（需同时设置 label-mode 为 false）                                      | Boolean                                   | false  | 否   |
| can-update-row           | 通过`行级别`控制是否显示`修改`数据相关按钮（需同时设置 label-mode 为 false）--需返回 Boolean 告知 | ^[Function]`(scope) => boolean`           | —      | 否   |
| can-delete-row           | 通过`行级别`控制是否显示`删除`数据相关按钮（需同时设置 label-mode 为 false）--需返回 Boolean 告知 | ^[Function]`(scope) => boolean`           | —      | 否   |
| can-view-row             | 通过`行级别`控制是否显示`查看`数据相关按钮（需同时设置 label-mode 为 false）--需返回 Boolean 告知 | ^[Function]`(scope) => boolean`           | —      | 否   |
| is-show-top-button       | 是否显示表格顶部的按钮区域内容                                                                    | Boolean                                   | true   | 否   |
| before-add-row           | 添加一行按钮点击时的回调函数，用于对添加数据进行默认值设定                                        | ^[Function]`(scope) => any`               | —      | 否   |
| before-update-row        | 编辑一行按钮点击时的回调函数，用于对编辑数据进行默认值设定                                        | ^[Function]`(scope) => any`               | —      | 否   |
| form-save                | 用户操作数据之后的回调，需返回 Promise 对象告知是否处理完成                                       | ^[Function]`(scope,flag) => Promise`      | —      | 否   |
| form-rules               | 表单项验证规则                                                                                    | ^[Object]`FormRules`                      | —      | 否   |
| data-add-position        | 数据成功添加到表格的 d 位置                                                                       | ^[String]`'end' \| 'begin' \| '' \| null` | end    | 否   |
| form-props               | 详情表单透传属性，详情可查看`SchemaForm`相关属性内容                                              | Object                                    | —      | 否   |
| form-wrap-componen-props | 详情表单外部包裹组件的透传属性，详情可查看`ElDialog`或`ElDrawer`相关属性内容                      | Object                                    | —      | 否   |
| form-wrap-componen       | 详情表单外部包裹组件                                                                              | ^[String]`'dialog' \| 'drawer' `          | dialog | 否   |

### SchemaTable Events

- 相关基础事件请查看`SchemaTable`组件

  | 名称 | 说明 | 类型 |
  | ---- | ---- | ---- |

### SchemaTable Exposes

- 相关基础方法请查看`SchemaTable`组件

| 方法名 | 说明 | 类型 |
| ------ | ---- | ---- |

### SchemaTable Slots

- 相关基础插槽请查看`SchemaTable`组件

| 插槽名 | 说明 |
| ------ | ---- |
