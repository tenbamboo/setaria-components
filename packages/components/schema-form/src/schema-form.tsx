import {
  // Fragment,
  // computed,
  defineComponent,
  // inject,
  // nextTick,
  // onBeforeUnmount,
  // onMounted,
  // onUpdated,
  // ref,
  // watch,
  ref,
} from 'vue'
// import { useResizeObserver } from '@vueuse/core'
// import { throwError } from '@element-plus/utils'
// import { useNamespace } from '@setaria-components/hooks'
// import { formContextKey, formItemContextKey } from './constants'
import { ElForm } from 'element-plus'
import { createSchemaFormItem } from '../../common-schema/builder'
import { schemaFormProps } from './schema-form'
import type { VNode } from 'vue'

export default defineComponent({
  name: 'ScSchemaForm',
  props: schemaFormProps,

  setup(props, { slots, emit }) {
    const createForm = () => {
      const { schema } = props

      const componentList: VNode[] = []
      Object.keys(schema.properties).forEach((key) => {
        const schemaItem = schema.properties[key]
        componentList.push(
          createSchemaFormItem(
            props.modelValue,
            key,
            schemaItem,
            emit,
            slots,
            props.labelSuffix
          )
        )
      })

      return (
        <ElForm class="sc-schema-form" {...props} model={props.modelValue}>
          {componentList}
        </ElForm>
      )
    }

    return () => {
      // if (!slots) return null

      // const { isAutoWidth } = props
      // if (isAutoWidth) {
      //   const autoLabelWidth = formContext?.autoLabelWidth
      //   const hasLabel = formItemContext?.hasLabel
      //   const style: CSSProperties = {}
      //   if (hasLabel && autoLabelWidth && autoLabelWidth !== 'auto') {
      //     const marginWidth = Math.max(
      //       0,
      //       Number.parseInt(autoLabelWidth, 10) - computedWidth.value
      //     )
      //     const marginPosition =
      //       formContext.labelPosition === 'left' ? 'marginRight' : 'marginLeft'
      //     if (marginWidth) {
      //       style[marginPosition] = `${marginWidth}px`
      //     }
      //   }
      //   return (
      //     <div ref={el} class={[ns.be('item', 'label-wrap')]} style={style}>
      //       {slots.default?.()}
      //     </div>
      //   )
      // } else {
      // return <div>123123{slots.default?.()}!!!!!</div>
      // }
      return createForm()
    }
  },
})
