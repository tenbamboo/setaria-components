---
title: SchemaTable
lang: zh-CN
---

# SchemaTable

此组件基于`JsonSchema`逻辑来使用的

## 基础用法

:::demo

schema-table/basic

:::

## 列宽

:::demo 可通过设置`ui-schema`中的`width`，也可通过`column-width`来统一设置列宽（如同时设置，则 ui-schema 中的`width`优先级高）

schema-table/width

:::

## 内容自动换行

:::demo 需要注意的是，当开启`virtualScroll`为`true`时，此功能失效

schema-table/auto-br

:::

## 内容溢出省略号

:::demo 通过属性`show-overflow`即可开启功能

schema-table/overflow

:::

## 单选

:::demo 可通过设置`selection-type`为`radio`

schema-table/selection-radio

:::

## 多选

:::demo 可通过设置`selection-type`为`checkbox`

schema-table/selection-checkbox

:::

## 排序

:::demo 可通过设置`ui-schema`中的`sortable`属性来开启列排序功能

schema-table/sort

:::

## 自定义格式化内容

:::demo 可通过设置`ui-schema`中的`formatter`属性来自定义内容

schema-table/formatter

:::

## 固定列

:::demo 可通过设置`ui-schema`中的`fixed`属性来自定义内容

schema-table/fixed

:::

## 隐藏列

:::demo 可通过设置`ui-schema`中的`visible`属性或者`columnVisible`来设置(需要注意的是`visible`将隐藏表格列和表单项 2 个维度的内容)

schema-table/table-column-visible

:::

## 设置原生属性

:::demo 可通过设置`ui-schema`中的`options`属性来透传参数到底层的 vxecolumn 组件，此 demo 请关注`options.align`内容

schema-table/inject-options

:::

## 合并单元格

:::demo 可通过设置`merge-cells`属性

schema-table/merge-cells

:::

## 显示页脚

:::demo 可通过设置`show-footer`属性与`footer-method`来自定义页脚内容

schema-table/footer

:::

## 单元格样式

:::demo 可通过设置`row-class-name`属性或`cell-class-name`来自定义样式

schema-table/class-name

:::

## 树形展示

:::demo 可通过设置`tree-config`属性(需同时指定 treeNode 内容)

schema-table/tree

:::

## 自定义插槽

:::demo 可通过设置`[字段名]`插槽来自定义显示，并配合`scope.data`获取当前行的相关数据

schema-table/slots

:::

## 分页器

- 通过设置`show-page`来显示分页功能
- 通过`page-num` `page-size` `page-total` 三个属性来指定当前第几页，一页多少条数据，当前有多少条数据
- 通过`page-sizes`来设置分页器中的一页多少条数据

:::demo

schema-table/pager

:::

## 虚拟 Y 轴滚动

:::demo 有时数据量过大时，可通过`virtual-scroll`属性来开启虚拟滚动，同时需要指定`height`高度属性

schema-table/virtual-scroll

:::

## 操作按钮列

- 通过设置`show-oper`来显示分页功能
- 通过`oper-width` 来控制操作列的宽度
- 通过`oper-max-display-count`来设置操作列中按钮可显示多少按钮
- 通过`oper-buttons`来返回自定义按钮中的内容

:::demo

schema-table/oper-buttons

:::

## 列设置功能

- 通过`show-column-setting`属性开启列设置-显示功能
- 通过`column-setting-draggable`属性开启列设置-调整列顺序功能
- 通过`table-id`属性来指定当前表格唯一 ID 后，可开启以上设置的`localStorage`缓存功能

:::demo 列设置功能，用户可自行调整列的显示与否或调整列的顺序

schema-table/column-setting

:::

## SchemaTable API

### SchemaTable Attributes

| 名称                     | 说明                                                       | 类型                                                                                                             | 默认值 | 必填 |
| ------------------------ | ---------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ------ | ---- |
| schema                   | 表格（表单）项描述                                         | ^[Object]`SchemaProps`                                                                                           | —      | 是   |
| ui-schema                | 表格（表单）项 UI 相关描述                                 | ^[Object]`Record<string, any>`                                                                                   | —      | 否   |
| data                     | 表格值                                                     | Array                                                                                                            | —      | 是   |
| column-width             | 列宽                                                       | String,Number                                                                                                    | —      | 否   |
| border                   | 是否带有边框                                               | Boolean                                                                                                          | true   | 否   |
| table-id                 | 表格 ID，主要用于对表格的配置进行缓存                      | String                                                                                                           | —      | 否   |
| stripe                   | 是否带有斑马纹                                             | Boolean                                                                                                          | true   | 否   |
| show-overflow            | 当内容过长时显示为省略号                                   | Boolean                                                                                                          | —      | 否   |
| height                   | 表格高度                                                   | String,Number                                                                                                    | —      | 否   |
| max-height               | 表格最大高度                                               | String,Number                                                                                                    | —      | 否   |
| selection-type           | 勾选模式                                                   | ^[String]`radio \| checkbox`                                                                                     | —      | 否   |
| selection-config         | 勾选相关配置，具体可查看 radio-config checkbox-config 内容 | Object                                                                                                           | —      | 否   |
| label-mode               | 是否只读模式                                               | Boolean                                                                                                          | true   | 否   |
| is-reserve               | 是否保留 CheckBox 选中状态                                 | Boolean                                                                                                          | true   | 否   |
| virtual-scroll           | 是否开启虚拟 Y 轴滚动                                      | Boolean                                                                                                          | false  | 否   |
| merge-cells              | 合并指定的单元格                                           | ^[Array]`Array<{ row: number, col: number, rowspan: number, colspan: number }>`                                  | —      | 否   |
| show-footer              | 是否显示页脚                                               | Boolean                                                                                                          | false  | 否   |
| footer-method            | 表尾的数据获取方法，返回一个二维数组                       | ^[Function]`({ columns, data }) => any[][]`                                                                      | —      | 否   |
| row-config               | 行配置信息, 可查看 vxe-table 文档                          | Object                                                                                                           | —      | 否   |
| tree-config              | 树形模式相关配置，可查看 vxe-table 文档                    | Object                                                                                                           | —      | 否   |
| sort-config              | 排序相关配置，可查看 vxe-table 文档                        | Object                                                                                                           | —      | 否   |
| seq-config               | 序号相关配置，可查看 vxe-table 文档                        | Object                                                                                                           | —      | 否   |
| seq-column               | 是否显示序号列                                             | Boolean                                                                                                          | false  | 否   |
| row-class-name           | 行附加 className                                           | ^[Function]`(({ row, rowIndex, $rowIndex }) => any)`                                                             | —      | 否   |
| cell-class-name          | 单元格附加 className                                       | ^[Function]`(({ row, rowIndex, $rowIndex, column, columnIndex, $columnIndex }) => any)`                          | —      | 否   |
| show-page                | 是否显示分页功能                                           | Boolean                                                                                                          | false  | 否   |
| page-layouts             | 分页的格式                                                 | ^[String[]]`PrevJump, PrevPage, Number, JumpNumber, NextPage, NextJump, Sizes, Jump, FullJump, PageCount, Total` | —      | 否   |
| page-num                 | 分页信息，当前页号                                         | Number                                                                                                           | —      | 否   |
| page-size                | 分页信息，当前一页多少条                                   | page                                                                                                             | —      | 否   |
| page-sizes               | 分页信息，分页器                                           | Array                                                                                                            | —      | 否   |
| page-total               | 分页信息，当前数据共多少条                                 | Number                                                                                                           | —      | 否   |
| show-oper                | 是否显示操作列                                             | Boolean                                                                                                          | false  | 否   |
| oper-width               | 操作列的宽度                                               | Number, String                                                                                                   | 120px  | 否   |
| oper-max-display-count   | 操作列中最多能显示多少个按钮（其他的将放入更多按钮中）     | Number, String                                                                                                   | 3      | 否   |
| oper-buttons             | 操作列自定义按钮                                           | ^[Function]`(({ row, rowIndex, column, columnIndex }) => any[])`                                                 | —      | 否   |
| show-column-setting      | 是否显示列设置功能                                         | Boolean                                                                                                          | false  | 否   |
| column-setting-draggable | 列设置是否开启可拖拽功能                                   | Boolean                                                                                                          | false  | 否   |
| row-key                  | 数据行唯一标识字段                                         | String                                                                                                           | —      | 否   |

### SchemaTable Events

| 名称                          | 说明                               | 类型                                                                                                                                                              |
| ----------------------------- | ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| data-change                   | 表单项数据值变更触发               | ^[Function]`(schemaKey, val, model) => void`                                                                                                                      |
| selection-change              | 勾选项数据值变更触发               | ^[Function]`(selectionList, currentOperItem) => void`                                                                                                             |
| selection-all                 | 勾选所有数据值变更触发             | ^[Function]`(selectionList) => void`                                                                                                                              |
| sort-change                   | 排序项变更触发                     | ^[Function]`({ column, property, order, sortBy, sortList, $event }) => void`                                                                                      |
| page-change                   | 分页变更触发                       | ^[Function]`({ type, currentPage, pageSize, $event }) => void`                                                                                                    |
| cell-click                    | 单元格被点击时会触发该事件         | ^[Function]`({ row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, triggerRadio, triggerCheckbox, triggerTreeNode, triggerExpandNode, $event }) => void` |
| oper-button-click             | 操作列按钮被点击时会触发该事件     | ^[Function]`(key, scope) => void`                                                                                                                                 |
| oper-button-click             | 操作列按钮被点击时会触发该事件     | ^[Function]`(key, scope) => void`                                                                                                                                 |
| column-setting-show           | 列设置显示时会触发该事件           | ^[Function]`() => void`                                                                                                                                           |
| column-setting-hide           | 列设置隐藏时会触发该事件           | ^[Function]`() => void`                                                                                                                                           |
| column-setting-visible-change | 列设置中内容勾选变更时会触发该事件 | ^[Function]`(checkedKeys) => void`                                                                                                                                |
| column-setting-sort-change    | 列设置中内容排序变更时会触发该事件 | ^[Function]`(sortKeys) => void`                                                                                                                                   |

### SchemaTable Exposes

| 方法名         | 说明                                                          | 类型                                                                                                                              |
| -------------- | ------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| setSelection   | 设置选中                                                      | ^[Function]`(row: Row) => void`                                                                                                   |
| clearSelection | 手动清空用户的选择                                            | ^[Function]`() => void`                                                                                                           |
| getSelection   | 获取用户选中的数据                                            | ^[Function]`() => Array<any>`                                                                                                     |
| validate       | 对整个表单的内容进行验证。 接收一个回调函数，或返回 Promise。 | ^[Function]`(callback?: FormValidateCallback) => Promise<void>`                                                                   |
| validateField  | 验证具体的某个字段。                                          | ^[Function]`(props?: Arrayable<FormItemProp> \| undefined, callback?: FormValidateCallback \| undefined) => FormValidationResult` |
| resetFields    | 重置该表单项，将其值重置为初始值，并移除校验结果              | ^[Function]`(props?: Arrayable<FormItemProp> \| undefined) => void`                                                               |
| scrollToField  | 滚动到指定的字段                                              | ^[Function]`(prop: FormItemProp) => void`                                                                                         |
| clearValidate  | 清理某个字段的表单验证信息。                                  | ^[Function]`(props?: Arrayable<FormItemProp> \| undefined) => void`                                                               |

### SchemaTable Slots

| 插槽名   | 说明                 |
| -------- | -------------------- |
| [字段名] | 对应表单项自定义插槽 |
