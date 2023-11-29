import {
  // Fragment,
  // computed,
  // defineExpose,
  defineComponent,
  ref,
} from 'vue'
// import { useResizeObserver } from '@vueuse/core'
// import { throwError } from '@element-plus/utils'
// import { useNamespace } from '@setaria-components/hooks'
// import { formContextKey, formItemContextKey } from './constants'
import { ElForm } from 'element-plus'

// import { buildProps } from '@setaria-components/utils'
import {
  createLayoutWrapper,
  createSchemaFormItem,
  createSchemaFormRules,
} from '../../common-schema/builder'
// import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '@setaria-components/constants'

import { schemaFormProps } from './props'
import type { VNode } from 'vue'
import type {
  FormInstance,
  FormItemProp,
  FormValidateCallback,
} from 'element-plus'

export default defineComponent({
  name: 'ScSchemaForm',
  props: schemaFormProps,
  emits: ['input', 'data-change'],

  setup(props, { slots, emit, expose }) {
    const formRef = ref<FormInstance>()
    const createForm = () => {
      const { schema, rules, uiSchema, labelSuffix, labelWidth, inline } = props

      let componentList: VNode[] = []
      Object.keys(schema.properties).forEach((key) => {
        componentList.push(
          createSchemaFormItem(
            props.modelValue,
            key,
            schema?.properties[key],
            uiSchema,
            emit,
            slots,
            labelSuffix
          )
        )
      })

      if (!inline) {
        componentList = [
          createLayoutWrapper(
            componentList,
            uiSchema,
            slots,
            +props.columns,
            labelWidth
          ),
        ]
      }

      const excludeMyCompProps = Object.keys(props).reduce((res, key) => {
        if (!['schema', 'uiSchema', 'columns', 'modelvalue'].includes(key)) {
          res[key as keyof typeof props] = props[key as keyof typeof props]
        }
        return res
      }, {} as any)

      return (
        <ElForm
          class="sc-schema-form"
          ref={formRef}
          {...excludeMyCompProps}
          model={props.modelValue}
          rules={createSchemaFormRules(schema, rules)}
          // on={{
          //   submit: handlerSubmit,
          //   // withModifiers(() => {
          //   //   handlerSubmit()
          //   //   // ...
          //   // }, ['prevent']),
          // }}
          //   {
          //     submit:(withModifiers(() => {
          //       handlerSubmit()
          //       // ...
          //     }, ['prevent'])})
          //   }
          // }
          // onSubmit={withModifiers(() => {
          //   handlerSubmit()
          //   // ...
          // }, ['prevent'])}
        >
          {componentList}
          {slots.default?.()}
        </ElForm>
      )
    }

    const validate = (callback?: FormValidateCallback) => {
      return formRef?.value?.validate(callback)
    }
    const validateField = (modelProps = [], callback: FormValidateCallback) => {
      return formRef?.value?.validateField(modelProps, callback)
    }
    const resetFields = (properties = []) => {
      return formRef?.value?.resetFields(properties)
    }

    const clearValidate = (props = []) => {
      return formRef?.value?.clearValidate(props)
    }
    const scrollToField = (prop: FormItemProp) => {
      return formRef?.value?.scrollToField(prop)
    }

    expose({
      validate,
      validateField,
      resetFields,
      clearValidate,
      scrollToField,
    })

    return () => {
      return createForm()
    }
  },
})
