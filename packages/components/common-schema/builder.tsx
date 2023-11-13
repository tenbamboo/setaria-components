import {
  ElCol,
  ElDatePicker,
  ElFormItem,
  ElIcon,
  ElInput,
  ElOption,
  ElRow,
  ElSelect,
  ElTimePicker,
  ElTooltip,
} from 'element-plus'
import { Warning } from '@element-plus/icons-vue'
import { useLocale } from '@setaria-components/hooks'
import type { FormItemRule } from 'element-plus'
import type { Slot, Slots, VNode } from 'vue'
import type {
  AllowSchemaFormatTypeForDatePicker,
  SchemaProperties,
  SchemaProps,
  SchemaUiProps,
} from './schema.type'
// import El from ''
import type { Arrayable } from '@setaria-components/utils'

declare interface ElInputEvent {
  formatter: (value: string) => string
  parser: (value: string) => string
}

// 不同组件渲染时的提示信息
export function getComponentPlaceholder(property: SchemaProperties) {
  const { t } = useLocale()
  if (
    property.oneOf ||
    property.anyOf ||
    property.format === 'date' ||
    property.format === 'datetime' ||
    property.format === 'time'
    // property.requiredTip === 'select'
  ) {
    return t('sc.schemaForm.placeholderBySelect', { title: property.title })
  }
  return t('sc.schemaForm.placeholder', { title: property.title })
}
// 创建布局内容(这里处理了ui中的 visible 内容)
export function createLayoutWrapper(
  componentList: VNode[],
  uiSchema: Record<string, SchemaUiProps>,
  slots: Slots,
  columns: number,
  labelWidth: string | number
): VNode {
  const getSpan = (colspan?: any) => {
    let uiColspan = colspan || ''

    uiColspan = +uiColspan > columns ? columns : uiColspan
    return (uiColspan =
      typeof uiColspan === 'number' ? (24 / columns) * uiColspan : 24 / columns)
  }
  const getColList = () => {
    return componentList.map((component) => {
      const key = component?.props?.prop
      const uiSchemaItem = uiSchema[key] || {}
      const span = getSpan(uiSchemaItem.colspan)
      return (
        <ElCol
          span={span}
          xs={24}
          style={{ display: uiSchemaItem.visible === false ? 'none' : '' }}
        >
          {component}
        </ElCol>
      )
    }) as VNode[]
  }

  let colList = getColList()

  if (slots?.row) {
    colList = colList.concat(slots.row({ span: getSpan() }))
  }

  return (<ElRow gutter={labelWidth ? 10 : 20}>{colList}</ElRow>) as VNode

  // for (let index = 0; index < formItemArray.length; index += 1) {
  //   const formItem = formItemArray[index];
  //   const itemUISchema = this.uiSchema[formItem.id] || {};
  //   let uiColspan = itemUISchema[JSON_UI_SCHEMA.UI_COLSPAN];
  //   uiColspan = uiColspan > self.columns ? self.columns : uiColspan;
  //   let spanProp = null;
  //   const span = typeof uiColspan === 'number' ? ((24 / self.columns) * uiColspan) : (24 / self.columns);
  //   // 考虑columns属性为5的场合
  //   if (self.columns === 5) {
  //     switch (uiColspan) {
  //       case 1:
  //         spanProp = '4-8';
  //         break;
  //       case 2:
  //         spanProp = '9-6';
  //         break;
  //       case 3:
  //         spanProp = '14-4';
  //         break;
  //       case 4:
  //         spanProp = '19-2';
  //         break;
  //       case 5:
  //         spanProp = '24';
  //         break;
  //       default:
  //         spanProp = '4-8';
  //     }
  //   } else {
  //     spanProp = span;
  //   }
  //   let isDisplay = itemUISchema[JSON_UI_SCHEMA.UI_HIDDEN];
  //   if (typeof itemUISchema[JSON_UI_SCHEMA.UI_HIDDEN] === 'function') {
  //     isDisplay = itemUISchema[JSON_UI_SCHEMA.UI_HIDDEN](model);
  //   }
  //   let column = h(
  //     `${componentPrefix}-col`,
  //     {
  //       props: {
  //         span: spanProp,
  //         xs: 24
  //       },
  //       style: {
  //         display: isDisplay ? 'none' : ''
  //       }
  //     },
  //     [formItem.component]
  //   );
  //   colArray.push(column);
  // }
}
// 创建表单的校验
export function createSchemaFormRules(
  schema: SchemaProps,
  sourceRules: Partial<Record<string, Arrayable<FormItemRule>>> | undefined,
  requiredTriggerType = 'blur'
) {
  const { required = [], properties = {} } = schema
  const { t } = useLocale()
  return Object.keys(properties).reduce((res: any, key: string) => {
    let rule: any = []
    const propItem = properties[key]

    if (required.includes(key)) {
      rule.push({
        required: true,
        message: getComponentPlaceholder(propItem),
        trigger: requiredTriggerType,
      })
    }
    if (propItem.type === 'string') {
      const { minLength, maxLength } = propItem
      const lengthRule = {
        trigger: 'blur',
      } as Record<string, any>
      if (typeof minLength === 'number') {
        lengthRule.min = minLength
        lengthRule.message = t('sc.schemaForm.validate1', { minLength })
      }
      if (typeof maxLength === 'number') {
        lengthRule.max = maxLength
        if (typeof minLength === 'number') {
          lengthRule.message = t('sc.schemaForm.validate2', {
            minLength,
            maxLength,
          })
        } else {
          lengthRule.message = t('sc.schemaForm.validate3', { maxLength })
        }
      }

      // 处理类型为数字的相关内容
      // if (propItem.type === 'number') {
      //   lengthRule.type = propItem.type
      // }
      if (lengthRule.message) {
        // if (propItem.type === 'number') {
        //   rule.unshift(lengthRule)
        // } else {
        rule.push(lengthRule)
        // }
      }
    }

    if (sourceRules?.[key]) {
      rule = [...rule, ...(sourceRules[key] as any[])]
    }

    res[key] = rule

    return res
  }, {})
}

// 创建表单项VNode
export const createSchemaFormItem = (
  model: Record<string, any>,
  schemaKey: string,
  schemaItem: SchemaProperties,
  uiSchema: Record<string, SchemaUiProps>,
  // eslint-disable-next-line @typescript-eslint/ban-types
  emit: Function,
  slots: Slots,
  labelSuffix: string
): VNode => {
  const { t } = useLocale()
  // 获取组件上的通用属性
  const getCommonProps = (placeholderType: string) => {
    const handlerInput = (val: string) => {
      const newVal = val
      model[schemaKey] = newVal
      emit('input', schemaKey, newVal, model)
    }

    return {
      'model-value': model?.[schemaKey],
      'onUpdate:modelValue': handlerInput,
      onInput: handlerInput,
      onChange: (val: any) => {
        emit('data-change', schemaKey, val, model)
      },
      disabled: uiSchema?.[schemaKey]?.disabled,
      readonly: uiSchema?.[schemaKey]?.readonly,
      placeholder: t(
        placeholderType === '1'
          ? 'sc.schemaForm.placeholder'
          : 'sc.schemaForm.placeholderBySelect',
        {
          title: schemaItem.title,
        }
      ),
      ...uiSchema?.[schemaKey]?.options,
    }
  }

  // 获取组件的VNode内容
  const getComponent = () => {
    let component = null

    if (slots[schemaKey]) {
      // 自定义插槽内容
      // const method: Slot = slots[schemaKey] as Slot
      component = (slots[schemaKey] as Slot)(model)
    } else if (schemaItem.oneOf?.length || schemaItem.anyOf?.length) {
      let optionList = schemaItem.oneOf || []
      let isMultiple = false
      if (schemaItem.anyOf?.length) {
        optionList = schemaItem.anyOf
        isMultiple = true
      }

      component = (
        <ElSelect
          multiple={isMultiple}
          {...getCommonProps('2')}

          // collapse-tags
          // collapse-tags-tooltip
        >
          {optionList.map((option) => {
            return (
              <ElOption
                label={option.title}
                value={option.const}
                disabled={option.disabled}
              />
            )
          })}
        </ElSelect>
      )
    } else if (schemaItem.type === 'string') {
      if (['date', 'datetime'].includes(schemaItem.format ?? '')) {
        component = (
          <ElDatePicker
            type={schemaItem.format as AllowSchemaFormatTypeForDatePicker}
            {...getCommonProps('2')}
          />
        )
      } else if (schemaItem.format === 'time') {
        component = <ElTimePicker {...getCommonProps('2')} />
      } else {
        component = <ElInput {...getCommonProps('1')}></ElInput>
      }
    } else if (schemaItem.type === 'number') {
      const currencyProps = {} as ElInputEvent
      const handlerBlur = () => {
        const val = model[schemaKey]
        let newVal: any = val
        if (val) {
          newVal = +val as number
          if (Number.isNaN(newVal)) {
            newVal = +val.replace(/[^\d.]+|(?<=\..*)\./g, '')
          }

          if (schemaItem.scale) {
            newVal = newVal.toFixed(schemaItem.scale)
          }
        }
        model[schemaKey] = newVal
        emit('input', schemaKey, newVal, model)
      }

      if (schemaItem.format === 'currency') {
        const formatterByCurrency = (value: string) => {
          const format = (v: string) => {
            const ret = v.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            return ret
          }
          if (value) {
            const strVal = `${value}`
            if (strVal.indexOf('.')) {
              const arr: Array<string> = strVal.split('.')
              arr[0] = format(arr[0])
              return arr.join('.')
            }
            return format(strVal)
          }
          return value
        }
        currencyProps.formatter = formatterByCurrency
        currencyProps.parser = (value: string) => value.replace(/(,*)/g, '')
      }

      component = (
        <ElInput
          {...getCommonProps('1')}
          {...currencyProps}
          onBlur={handlerBlur}
        ></ElInput>
      )
    }
    return component
  }
  // 获取表单项Label
  const getLabel = () => {
    return () => (
      <span>
        {schemaItem.title}
        {schemaItem.description ? (
          <ElTooltip
            class="box-item"
            effect="dark"
            content={schemaItem.description}
            placement="top"
          >
            <ElIcon>
              <Warning />
            </ElIcon>
          </ElTooltip>
        ) : null}

        {labelSuffix}
      </span>
    )
  }

  return (
    <ElFormItem
      v-slots={{
        label: getLabel(),
      }}
      prop={schemaKey}
    >
      {getComponent()}
    </ElFormItem>
  ) as VNode
}
