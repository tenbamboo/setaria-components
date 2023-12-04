import { formProps } from 'element-plus'
import { buildProps } from '@setaria-components/utils'
import type { ExtractPropTypes, PropType } from 'vue'
import type {
  SchemaProps,
  SchemaUiProps,
} from '../../common-schema/schema.type'

export const schemaFormProps = buildProps({
  ...formProps,
  modelValue: {
    type: Object as PropType<Record<string, any>>,
    required: true,
  },
  schema: {
    type: Object as PropType<SchemaProps>,
    required: true,
  },
  uiSchema: {
    type: Object as PropType<Record<string, SchemaUiProps>>,
    default() {
      return {}
    },
  },
  columns: {
    type: [String, Number],
    default: () => {
      return 4
    },
  },
} as const)

export type SchemaFormProps = ExtractPropTypes<typeof schemaFormProps>

export declare interface SlotRowProps {
  span?: number
}
