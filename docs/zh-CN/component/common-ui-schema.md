---
title: UiSchema
lang: zh-CN
---

# UiSchema

此章节介绍 UiSchema 下的相关属性

## 基础用法

:::demo

common-schema/ui-schema

:::

## Schema API

### Schema Attributes

| 名称            | 说明                                                      | 类型                                                          | 默认值 |
| --------------- | --------------------------------------------------------- | ------------------------------------------------------------- | ------ |
| disabled        | 字段是否不可用                                            | Boolean                                                       | —      |
| readonly        | 字段是否只读                                              | Boolean                                                       | —      |
| visible         | 字段是否显示（优先级高于 formItemVisible、columnVisible） | Boolean                                                       | —      |
| colspan         | 字段栅格化，逻辑继承 Element                              | Nubmer                                                        | —      |
| options         | 字段对应动态组件透传数据                                  | ^[Object<any>]                                                | —      |
| width           | 表格组件专属，宽度                                        | ^[String \| Nubmer]                                           | —      |
| sortable        | 表格组件专属，是否可排序                                  | Boolean                                                       | —      |
| fixed           | 表格组件专属，左侧固定活右侧固定                          | ^[VxeColumnPropTypes.Fixed]` 'left' \| 'right' \| '' \| null` | —      |
| formatter       | 表格组件专属，表格列是否显示                              | ^[Formatter<D = VxeTableDataRow>]                             | —      |
| columnVisible   | 表格组件专属，表格状态列是否显示                          | Boolean                                                       | —      |
| formItemVisible | 表格组件专属，表单状态表单项是否显示                      | Boolean                                                       | —      |

### 类型声明

<details>
  <summary>显示类型声明</summary>

```ts
export declare type AllowScehmaTypeType =
  | 'string'
  | 'number'
  | 'index'
  | 'integer'

export declare type AllowSchemaFormatType =
  | 'currency' // type为 number 时可用
  | 'date' // type为string时可用
  | 'date-time' // type为string时可用
  | 'time' // type为string时可用
  | 'int32' // 暂未实现
  | 'int64' // 暂未实现
  | 'bigdecimal' //暂未实现

export declare type EnumType = {
  const?: any
  title?: any
  disabled?: boolean
}
export declare interface SchemaProperties {
  title: string
  type?: AllowScehmaTypeType
  format?: AllowSchemaFormatType
  description?: string
  oneOf?: Array<EnumType>
  anyOf?: Array<EnumType>
  scale?: number
  // pattern: RegExp | string
  minLength?: number
  maxLength?: number
}

export declare interface SchemaProps {
  required?: Array<string>
  properties: Record<string, SchemaProperties>
}

export declare interface SchemaUiProps {
  disabled?: boolean
  readonly?: boolean
  visible?: boolean
  colspan?: number
  options?: Record<string, any>
}

export declare interface SchemaUiPropsByTable extends SchemaUiProps {
  width?: number | string
  sortable?: boolean
  fixed?: VxeColumnPropTypes.Fixed
  formatter?: VxeColumnPropTypes.Formatter
  columnVisible?: boolean
  formItemVisible?: boolean
}
```

</details>
