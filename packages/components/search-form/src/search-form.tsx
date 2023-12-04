import {
  // Fragment,
  computed,
  // defineExpose,
  defineComponent,
  // reactive,
  // nextTick,
  // onBeforeUnmount,
  // onMounted,
  // onUpdated,
  // computed,
  ref,
  watch,
} from 'vue'
import { isFunction } from '@vue/shared'
// import { useResizeObserver } from '@vueuse/core'
// import { throwError } from '@element-plus/utils'
// import { useNamespace } from '@setaria-components/hooks'
// import { formContextKey, formItemContextKey } from './constants'
// import { ElForm } from 'element-plus'
//
import { ElButton, ElCol, ElIcon, ElLink } from 'element-plus'
import {
  ArrowDown,
  ArrowUp,
  RefreshLeft,
  Search,
} from '@element-plus/icons-vue'
import { cloneDeep, isEmpty } from 'lodash-unified'

// import {
//   createLayoutWrapper,
//   createSearchFormItem,
//   createSearchFormRules,
// } from '../../common-search/builder'
import { useLocale } from '@setaria-components/hooks'
import ScSchemaForm from '@setaria-components/components/schema-form'

import { searchFormProps } from './props'
import type {
  SchemaFormInstance,
  SlotRowProps,
} from '@setaria-components/components/schema-form'
import type { FormItemProp, FormValidateCallback } from 'element-plus'
import type { SchemaUiProps } from '../../common-schema/schema.type'

// import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '@setaria-components/constants'

export default defineComponent({
  name: 'ScSearchForm',
  props: searchFormProps,
  emits: [
    'input',
    'data-change',
    'data-submit',
    'collapse-change',
    'data-reset',
  ],

  setup(props, { expose, slots, emit }) {
    const formRef = ref<SchemaFormInstance>()
    const { t } = useLocale()
    const isLoaing = ref(false)
    const innerExpand = ref(false)
    const totalColSpan = ref(0)

    const innerUiSchema = computed(() => {
      innerExpand.value
      const ret = {} as Record<string, SchemaUiProps>
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      totalColSpan.value = 0
      let currentDisplayTotalColSpan = 0
      const { columns, schema, uiSchema, forceCollapseItems } = props
      const innerColumns = +columns
      Object.keys(schema.properties).forEach((schemaKey, index) => {
        let uiProperty = cloneDeep(uiSchema[schemaKey])
        if (isEmpty(uiSchema[schemaKey])) {
          uiProperty = {}
        }
        let propertyColspan = uiProperty.colspan
        propertyColspan = (
          typeof propertyColspan === 'number' ? propertyColspan : 1
        ) as number

        const isCurrentRowEnough =
          innerColumns - (currentDisplayTotalColSpan % innerColumns) <
          propertyColspan
        if (propertyColspan > innerColumns) {
          propertyColspan = innerColumns
        }

        // 如果业务端未定义的情况下的话
        if (!(typeof uiProperty.visible === 'boolean')) {
          // 收起的场合
          if (!innerExpand.value) {
            if (innerColumns === 1 && index === 0) {
              // 只显示一行表单项目，其余的隐藏
              uiProperty.visible = true
            } else if (forceCollapseItems && forceCollapseItems >= index + 1) {
              // 强制在收起模式下显示几个字段
              uiProperty.visible = true
            } else if (
              currentDisplayTotalColSpan + propertyColspan + 1 >
              innerColumns
            ) {
              uiProperty.visible = false
            } else {
              uiProperty.visible = true
            }
            // 展开的场合
          } else {
            uiProperty.visible = true
          }
        }

        // 隐藏的项目不统计
        if (uiProperty.visible === true) {
          if (isCurrentRowEnough) {
            // 如果当前行空余位置放不下，那么折行
            currentDisplayTotalColSpan +=
              innerColumns - (currentDisplayTotalColSpan % innerColumns)
          }
          currentDisplayTotalColSpan += propertyColspan
        }

        // else {
        //   propertyColspan = 0;
        // }
        if (isCurrentRowEnough) {
          totalColSpan.value +=
            innerColumns - (totalColSpan.value % innerColumns)
        }
        totalColSpan.value += propertyColspan

        ret[schemaKey] = uiProperty
      })
      return ret
    })

    const handleSubmit = () => {
      validate((valid) => {
        if (valid) {
          if (isFunction(props.submitting)) {
            if (!isLoaing.value) {
              isLoaing.value = true
              props.submitting(props.modelValue).finally(() => {
                isLoaing.value = false
              })
            }
          }
          emit('data-submit', props.modelValue)
        }
      })
    }

    const handlerChange = (key: string, value: any, model: any) => {
      emit('data-change', key, value, model)
    }

    const handleReset = () => {
      resetFields()
      emit('data-reset')
    }

    const handleCollapse = () => {
      innerExpand.value = !innerExpand.value
      emit('collapse-change', innerExpand.value)
    }

    const getButtonSlot = (scope: SlotRowProps) => {
      const getExpandTextLabel = () => {
        return innerExpand.value ? (
          <div>
            <ElIcon>
              <ArrowUp />
            </ElIcon>
            <span>{t('sc.searchForm.collapse')}</span>
          </div>
        ) : (
          <div>
            <ElIcon>
              <ArrowDown />
            </ElIcon>
            <span>{t('sc.searchForm.expand')}</span>
          </div>
        )
      }

      const buttonTemplate = {
        // 搜索
        search: (
          <ElButton
            type="primary"
            onClick={handleSubmit}
            loading={isLoaing.value}
            icon={Search}
          >
            {t('sc.searchForm.search')}
          </ElButton>
        ),
        // 搜索重置
        searchReset: (
          <ElButton icon={RefreshLeft} onClick={handleReset}>
            {t('sc.searchForm.reset')}
          </ElButton>
        ),
        // 重置
        reset: (
          <ElButton onClick={handleReset}>{t('sc.searchForm.reset')}</ElButton>
        ),
        // 提交
        submit: (
          <ElButton
            type="primary"
            onClick={handleSubmit}
            loading={isLoaing.value}
          >
            {t('sc.searchForm.submit')}
          </ElButton>
        ),
        //  额外插槽
        slot: slots.button ? slots.button() : null,
        // 收起展开按钮
        collapse:
          props.collapse && totalColSpan.value >= +props.columns ? (
            <ElLink
              class="sc-expand-button"
              type="primary"
              underline={false}
              onClick={handleCollapse}
            >
              {getExpandTextLabel()}
              {/* {totalColSpan >= this.columns ? getExpandTextLabel() : null} */}
            </ElLink>
          ) : null,
      }

      return (
        <ElCol class="sc-search-form-button-area" span={scope.span}>
          {props.buttonLayout.map((key: keyof typeof buttonTemplate) => {
            return buttonTemplate[key]
          })}
        </ElCol>
      )
    }

    const createForm = () => {
      return (
        <ScSchemaForm
          ref={formRef}
          class="sc-search-form"
          {...props}
          uiSchema={innerUiSchema.value}
          onData-change={handlerChange}
        >
          {{
            ...slots,
            row: getButtonSlot,
          }}
        </ScSchemaForm>
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

    watch(
      () => props.expand,
      () => {
        innerExpand.value = props.expand
      }
    )

    return () => {
      return createForm()
    }
  },
})
