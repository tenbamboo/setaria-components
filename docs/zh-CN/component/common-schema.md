---
title: Schema
lang: zh-CN
---

# Schema

此章节介绍 Schema 下的相关属性

## 基础用法

:::demo

common-schema/schema

:::

## Schema API

### Schema Attributes

| 名称        | 说明                         | 类型                                             | 默认值 | 必填 |
| ----------- | ---------------------------- | ------------------------------------------------ | ------ | ---- |
| title       | 字段名称                     | String                                           | —      | 是   |
| type        | 字段类型                     | ^[String]`string \| number \| index \| integer`  | —      | 是   |
| format      | 格式化字段组件为相关展示组件 | ^[String]`currency \| date \| date-time \| time` | —      | 否   |
| description | 字段增强描述功能             | String                                           | —      | 否   |
| oneOf       | 单选功能时的 Options 选项    | ^[Array<EnumType>]                               | true   | 否   |
| anyOf       | 多选功能时的 Options 选项    | ^[Array<EnumType>]                               | true   | 否   |
| scale       | 字段数值类型时，四舍五入位数 | Nubmer                                           | —      | 否   |
| minLength   | 字段最小输入位数             | Nubmer                                           | —      | 否   |
| maxLength   | 字段最大输入位数             | Nubmer                                           | —      | 否   |

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
