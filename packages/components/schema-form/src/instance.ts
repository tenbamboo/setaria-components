import type SchemaForm from './schema-form'
import type {
  FormItemProp,
  FormValidateCallback,
  FormValidationResult,
} from 'element-plus'
import type { Arrayable } from '@setaria-components/utils'

export type SchemaFormInstance = InstanceType<typeof SchemaForm> & {
  validate: (
    callback?: FormValidateCallback | undefined
  ) => FormValidationResult

  validateField: (
    props?: Arrayable<FormItemProp> | undefined,
    callback?: FormValidateCallback | undefined
  ) => FormValidationResult

  resetFields: (props?: Arrayable<FormItemProp> | undefined) => void
  clearValidate: (props?: Arrayable<FormItemProp> | undefined) => void
  scrollToField: (prop: FormItemProp) => void
}
