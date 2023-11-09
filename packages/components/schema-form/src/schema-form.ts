import { formProps } from 'element-plus'
import { buildProps } from '@setaria-components/utils'
// import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '@setaria-components/constants'
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
  // columnMaxLabelLength: Number,
  // rules: Object,
  // labelSuffix: String,
  // requiredTriggerType: {
  //   type: String,
  //   default: 'change',
  // },
  // submitPropagation: {
  //   type: Boolean,
  //   default: true,
  // },
} as const)

// export const rateEmits = {
//   [CHANGE_EVENT]: (value: number) => isNumber(value),
//   [UPDATE_MODEL_EVENT]: (value: number) => isNumber(value),
// }

export type SchemaFormProps = ExtractPropTypes<typeof schemaFormProps>
