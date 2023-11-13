import { schemaFormProps } from '@setaria-components/components/schema-form/index'
import { buildProps } from '@setaria-components/utils'
// import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '@setaria-components/constants'
import type { ExtractPropTypes, PropType } from 'vue'
// import type {
//   SchemaProps,
//   SchemaUiProps,
// } from '../../common-schema/schema.type'

export const searchFormProps = buildProps({
  ...schemaFormProps,
  // modelValue: {
  //   type: Object as PropType<Record<string, any>>,
  //   required: true,
  // },
  buttonLayout: {
    type: Array as PropType<
      Array<'search' | 'searchReset' | 'collapse' | 'reset' | 'submit' | 'slot'>
    >,
    default: () => {
      return ['search', 'searchReset', 'collapse']
    },
  },

  collapse: {
    type: Boolean,
    default: true,
  },
  expand: {
    type: Boolean,
    default: false,
  },
  forceCollapseItems: {
    type: Number,
  },
  submitting: {
    type: Function,
  },
  // uiSchema: {
  //   type: Object as PropType<Record<string, SchemaUiProps>>,
  //   default() {
  //     return {}
  //   },
  // },
  // forceCollapseItems: {
  //   type: [String, Number],
  //   default: () => {
  //     return 4
  //   },
  // },
} as const)

export type SearchFormProps = ExtractPropTypes<typeof searchFormProps>
