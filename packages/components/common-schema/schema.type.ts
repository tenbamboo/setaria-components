export declare type AllowScehmaTypeType = 'string' | 'number' | 'index'

export declare type AllowSchemaFormatType =
  | 'currency' // type为 number 时可用
  | 'date' // type为string时可用
  | 'datetime' // type为string时可用
  | 'time' // type为string时可用

export declare type AllowSchemaFormatTypeForDatePicker = 'date' | 'datetime'

export declare type EnumType = {
  const: any
  title: any
  disabled: boolean
}
export declare interface SchemaProperties {
  title: string
  type: AllowScehmaTypeType
  format: AllowSchemaFormatType
  description: string
  oneOf: Array<EnumType>
  anyOf: Array<EnumType>
  scale: number
  pattern: RegExp | string
  minLength: number
  maxLength: number
}

export declare interface SchemaProps {
  required: Array<string>
  properties: Record<string, SchemaProperties>
}
