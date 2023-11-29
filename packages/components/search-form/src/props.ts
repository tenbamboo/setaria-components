import { schemaFormProps } from '@setaria-components/components/schema-form'
import { buildProps } from '@setaria-components/utils'
import type { ExtractPropTypes, PropType } from 'vue'

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
} as const)

export type SearchFormProps = ExtractPropTypes<typeof searchFormProps>
