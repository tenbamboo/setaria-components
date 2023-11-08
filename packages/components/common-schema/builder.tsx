import {
  ElDatePicker,
  ElFormItem,
  ElIcon,
  ElInput,
  ElOption,
  ElSelect,
  ElTimePicker,
  ElTooltip,
} from 'element-plus'
import { Warning } from '@element-plus/icons-vue'
// import type { Slots } from 'element-plus'

import type { Slot, Slots } from 'vue'
import type {
  AllowSchemaFormatTypeForDatePicker,
  SchemaProperties,
} from './schema.type'
// import El from ''

// export const useCreateSchemaItem = (schemaItem: SchemaProps) => {}
declare interface ElInputEvent {
  formatter: (value: string) => string
  parser: (value: string) => string
}

export const createSchemaFormItem = (
  model: Record<string, any>,
  schemaKey: string,
  schemaItem: SchemaProperties,
  // eslint-disable-next-line @typescript-eslint/ban-types
  emit: Function,
  slots: Slots,
  labelSuffix: string
) => {
  const getComponent = () => {
    let component = null
    const handlerInput = (val: string) => {
      const newVal = val
      model[schemaKey] = newVal
      emit('input', schemaKey, newVal, model)
    }
    const handlerChange = (val: any) => {
      emit('change', schemaKey, val, model)
    }

    const commonProps = {
      'model-value': model?.[schemaKey],
      'onUpdate:modelValue': handlerInput,
      onInput: handlerInput,
      onChange: handlerChange,
    }
    if (slots[schemaKey]) {
      // 自定义插槽内容
      // const method: Slot = slots[schemaKey] as Slot
      component = (slots[schemaKey] as Slot)(model)
    } else if (schemaItem.oneOf?.length || schemaItem.anyOf?.length) {
      let optionList = schemaItem.oneOf
      let isMultiple = false
      if (schemaItem.anyOf?.length) {
        optionList = schemaItem.anyOf
        isMultiple = true
      }

      component = (
        <ElSelect
          {...commonProps}
          multiple={isMultiple}
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
            {...commonProps}
          />
        )
      } else if (schemaItem.format === 'time') {
        component = <ElTimePicker {...commonProps} />
      } else {
        component = <ElInput {...commonProps}></ElInput>
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
          {...commonProps}
          {...currencyProps}
          onBlur={handlerBlur}
        ></ElInput>
      )
    }
    return component
  }

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
  )
}
