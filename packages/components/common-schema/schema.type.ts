import type { VxeColumnPropTypes } from 'vxe-table'

export declare type AllowScehmaTypeType = 'string' | 'number' | 'index'

export declare type AllowSchemaFormatType =
  | 'currency' // type为 number 时可用
  | 'date' // type为string时可用
  | 'datetime' // type为string时可用
  | 'time' // type为string时可用

export declare type AllowSchemaFormatTypeForDatePicker = 'date' | 'datetime'

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

// export const JSON_UI_SCHEMA = {
//   UI_WIDGET: 'ui:widget',
//   UI_OPTIONS: 'ui:options',
//   UI_DISABLED: 'ui:disabled',
//   UI_HIDDEN: 'ui:hidden',
//   UI_FORM_ITEM_HIDDEN: 'ui:formItemHidden',
//   UI_FORMAT: 'ui:format',
//   UI_ON: 'ui:on',
//   UI_NATIVE_ON: 'ui:nativeOn',
//   UI_PARENT_COLUMN_ID: 'ui:parentColumnId',
//   UI_RULES: 'ui:rules',
//   UI_PLACEHOLDER: 'ui:placeholder',
//   UI_COLSPAN: 'ui:colspan',
//   UI_RULE: 'ui:rules',
//   UI_RENDER: 'ui:render',
//   UI_WRAPPER_OPTIONS: 'ui:wrapperOptions',
//   UI_DISABLE_COLUMN_CONTROL: 'ui:disableColumnControl',
// }
