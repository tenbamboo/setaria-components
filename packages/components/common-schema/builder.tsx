/* eslint-disable @typescript-eslint/ban-types */
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
import { isEmpty, isNumber } from 'lodash-unified'
import XEUtils from 'xe-utils'
import dayjs from 'dayjs'
import { useLocale } from '@setaria-components/hooks'
import { type Arrayable, isFunction } from '@setaria-components/utils'
import type { VxeColumnProps, VxeColumnSlots } from 'vxe-table'
import type { FormItemRule } from 'element-plus'
import type { Slot, Slots, VNode } from 'vue'
import type {
  AllowSchemaFormatTypeForDatePicker,
  SchemaProperties,
  SchemaProps,
  SchemaUiProps,
  SchemaUiPropsByTable,
} from './schema.type'

const visibleStorageKey = 'VXE_TABLE_CUSTOM_COLUMN_VISIBLE'

declare interface ElInputEvent {
  formatter: (value: string) => string
  parser: (value: string) => string
}

interface VxeColumnPropsByCustom extends VxeColumnProps {
  slots: VxeColumnSlots
}

interface SlotFunction {
  (scope: any): any // 定义插槽函数的参数和返回值类型
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
    let component: VNode | null = null

    if (slots[schemaKey]) {
      // 自定义插槽内容
      // const method: Slot = slots[schemaKey] as Slot
      const slotFunction = slots[schemaKey] as Slot
      const result = slotFunction(model)
      if (Array.isArray(result)) {
        // 如果结果是一个数组，选择第一个元素赋值给component
        component = result[0]
      } else {
        // 如果结果不是数组，直接赋值给component
        component = result
      }
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
      ) as VNode
    } else if (schemaItem.type === 'string') {
      if (['date', 'datetime'].includes(schemaItem.format ?? '')) {
        component = (
          <ElDatePicker
            type={schemaItem.format as AllowSchemaFormatTypeForDatePicker}
            // value-format={
            //   schemaItem.format === 'date'
            //     ? 'YYYY-MM-DD'
            //     : 'YYYY-MM-DD HH:mm:ss'
            // }
            {...getCommonProps('2')}
          />
        ) as VNode
      } else if (schemaItem.format === 'time') {
        component = (<ElTimePicker {...getCommonProps('2')} />) as VNode
      } else {
        component = (<ElInput {...getCommonProps('1')}></ElInput>) as VNode
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
        currencyProps.formatter = formatterByCurrency
        currencyProps.parser = (value: string) => value.replace(/(,*)/g, '')
      }

      component = (
        <ElInput
          {...getCommonProps('1')}
          {...currencyProps}
          onBlur={handlerBlur}
        ></ElInput>
      ) as VNode
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

function byteLength(str = '') {
  let length = 0
  Array.from(str).forEach((char) => {
    if (char.charCodeAt(0) > 255) {
      // 字符编码大于255，说明是双字节字符
      length += 2
    } else {
      length += 1
    }
  })

  return length
}

function formatterByCurrency(value: string) {
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

// function formatDate(odataDate: string, format: string) {
//   if (!odataDate) {
//     return ''
//   }
//   const temp = odataDate.match(/^\/Date\((.*)\)\/$/)
//   if (!temp || !temp[1]) {
//     return odataDate
//   }
//   const timestamp = temp[1]
//   if (!timestamp) {
//     return ''
//   }
//   return dayjs(timestamp).format(format)
// }

// function dateFormatter(params: any) {
//   return formatDate(params.cellValue, 'YYYY-MM-DD')
// }

// function dateTimeFormatter(params: any) {
//   return formatDate(params.cellValue, 'YYYY-MM-DD HH:mm:ss')
// }

/**
 * 设置默认formatter
 */
function createFormatter(property: SchemaProperties) {
  const {
    format,
    oneOf,
    anyOf,
    // type,
    // precision,
    // 小数位
    scale,
  } = property
  // if (type === 'boolean') {
  //   return function formatter(value) {
  //     return value ? t('el.schema.yes') : t('el.schema.no')
  //   }
  // }
  if (format === 'time') {
    return function formatter(value: any) {
      if (!value) {
        return ''
      }
      return dayjs(value).format('HH:mm:ss')
    }
  }

  if (format === 'date') {
    return function formatter(value: any) {
      if (!value) {
        return ''
      }
      return dayjs(value).format('YYYY-MM-DD')
    }
  }
  if (format === 'datetime') {
    return function formatter(value: any) {
      if (!value) {
        return ''
      }
      return dayjs(value).format('YYYY-MM-DD HH:mm:ss')
    }
  }
  if (format === 'currency') {
    return function formatter(value: any) {
      // 对于null值，不显示任何值
      if (!value || Number.isNaN(value)) {
        return value
      }
      // const config = {}
      // let scaleNum = +scale
      // if (typeof scaleNum === 'number' && !isNaN(scaleNum)) {
      //   config.maximumFractionDigits = scaleNum
      // } else {
      //   scaleNum = 0
      // }
      let val = value

      if (scale !== 0 && isNumber(scale)) {
        val = val.toFixed(scale)
      }
      return formatterByCurrency(val)
      // if (scale === 0) {
      //   return displayVal
      // }
      // 因numeral在输入框内格式化值存在问题，且inputnumber组件会默认对小数位进行处理
      // 所以此处只处理只读状态下label的显示值
      //   if (
      //     (isNumber(displayVal) && !Number.isNaN(displayVal)) ||
      //     (!isEmpty(displayVal) && displayVal !== 'NaN')
      //   ) {
      //     let digitVal = numeral(displayVal).value()
      //     digitVal = `${digitVal.toFixed(scale)}`
      //     return `${displayVal.split('.')[0]}.${digitVal.split('.')[1]}`
      //   }
      //   return value
      // }
    }
  }
  // 枚举值处理
  const dictList = oneOf || anyOf
  if (!isEmpty(dictList)) {
    const getDisplayDictLabel = (val: string) => {
      const dict = dictList?.find((item) => item.const === val)
      return dict ? dict.title : val
    }
    return function formatter(value: any) {
      if (Array.isArray(value)) {
        const res = value
          .map((cv) => {
            const displayDictLabel = getDisplayDictLabel(cv)
            return displayDictLabel
          })
          .join(', ')
        return res
      } else if (typeof value === 'number' || typeof value === 'string') {
        return getDisplayDictLabel(`${value}`)
      }
      return value
    }
  }
}
// 设置列宽
function setColumnWidth(
  column: VxeColumnPropsByCustom,
  uiProperty: SchemaUiPropsByTable,
  columnWidth?: string
) {
  let { width } = uiProperty
  if (!isEmpty(width) && `${width}`.indexOf('px')) {
    width = `${width}`.replace('px', '')
    // 根据字符数量计算列的宽度 FIXME 列和标题字数较少时的处理
  } else if (columnWidth === 'auto') {
    let defaultMinWidth = byteLength(column.title) * 20
    if (defaultMinWidth < 100) {
      defaultMinWidth = 100
    }
    column.minWidth = `${defaultMinWidth}px`
  } else if (!width && columnWidth) {
    width = columnWidth
  }

  if (width) {
    column.width = `${width}`
  }
}
// 设置列格式化器
function setColumnFormatter(
  column: VxeColumnPropsByCustom,
  property: SchemaProperties,
  uiProperty: SchemaUiPropsByTable
) {
  const { formatter } = uiProperty
  // if (property.type !== COLUMN_TYPE.INDEX) {
  if (isFunction(formatter)) {
    // eslint-disable-next-line no-shadow
    column.formatter = (val) => formatter(val)
  } else {
    // 设置默认formatter
    const formatter = createFormatter(property)
    if (formatter) {
      column.formatter = ({ cellValue }) => {
        return formatter(cellValue)
      }
    }
  }
}
// 设置column底层的相关透传属性
function setColumnNaviveOptions(
  column: VxeColumnPropsByCustom,
  uiProperty: SchemaUiPropsByTable
) {
  if (uiProperty.options) {
    Object.keys(uiProperty.options).forEach((optionKey) => {
      column[optionKey as keyof VxeColumnPropsByCustom] = uiProperty?.options?.[
        optionKey
      ] as VxeColumnPropsByCustom[keyof VxeColumnPropsByCustom]
    })
  }
}
// 设置插槽
function setColumnSlot(column: VxeColumnPropsByCustom, slots: Slots) {
  const key = column.field
  if (key && slots[key]) {
    // column.hasCustomSlot = true

    const defaultSlot = (scope: any) => {
      const s = scope
      s.data = s.row
      s.status = 'default'
      const render = (slots as Record<string, SlotFunction>)[key](s)
      return render
    }
    const editSlot = (scope: any) => {
      const s = scope
      s.data = s.row
      s.status = 'edit'
      const render = (slots as Record<string, SlotFunction>)[key](s)
      return render
    }
    // 单元格内容渲染配置项
    column.slots = {
      default: defaultSlot,
      // srScopedDefault: defaultSlot,
      // 默认设置编辑状态插槽
      // 默认插槽内容可通过formatter进行设置
      edit: editSlot,
      // srScopedEdit: editSlot,
    } as VxeColumnSlots
  }
}
// 设置其他列内容，比如勾选，序号
function setOtherColumns(ret: any[], props: any) {
  const { t } = useLocale()
  // 创建序号区域区域内容
  if (props.seqColumn) {
    ret.unshift({
      type: 'seq',
      title: t('sc.schemaTable.no'),
      width: 50,
    })
  }
  // 创建勾选区域内容
  if (props.selectionType) {
    ret.unshift({
      type: props.selectionType,
      title: '',
      width: 40,
      align: 'center',
      fixed: 'left',
      field: '',
    })
  }
}

function getCustomStorageMap(key: string) {
  // const version = GlobalConfig.version
  const rest = XEUtils.toStringJSON(localStorage.getItem(key))
  return rest
  // return rest && rest._v === version ? rest : { _v: version }
}
// 设置列格式化器
function setColumnVisible(
  column: VxeColumnPropsByCustom,
  uiProperty: SchemaUiPropsByTable,
  props?: any
) {
  // 是否显示
  column.visible = !(
    uiProperty.visible === false || uiProperty.columnVisible === false
  )

  const columnVisibleStorage =
    getCustomStorageMap(visibleStorageKey)[props.tableId]

  if (columnVisibleStorage) {
    // vxetable底层获取数据
    const colVisibles = columnVisibleStorage.split('|')
    const colHides = colVisibles[0] ? colVisibles[0].split(',') : []
    // const colShows = colVisibles[1] ? colVisibles[1].split(',') : []

    // checkedKeys.forEach((item) => {
    if (colHides.includes(column.field)) {
      column.visible = false
    }
    // if (colShows.includes(column.field)) {
    //   column.visible = true
    // }
  }
}
// 创建表格项
export const createSchemaTableColumns = (
  schema: SchemaProps,
  uiSchema: Record<string, SchemaUiPropsByTable>,
  slots: Slots,
  emit: Function,
  props?: any
): any[] => {
  const ret = [] as any[]
  const { properties } = schema
  if (!properties) {
    return ret
  }

  Object.keys(properties).forEach((key) => {
    const property = properties[key]
    const uiProperty = uiSchema?.[key] || {}

    if (property) {
      const column = {} as VxeColumnPropsByCustom
      // 列字段名
      column.field = key
      // 头部对其
      column.headerAlign = 'left'
      // 列标题
      column.title = property.title
      // 是否排序
      column.sortable = !!uiProperty.sortable
      // 是否固定左边或者右边
      column.fixed = uiProperty.fixed
      // 是否显示

      setColumnVisible(column, uiProperty, props)
      // column.visible = !(
      //   uiProperty.visible === false || uiProperty.columnVisible === false
      // )

      // 列提示
      if (property.description) {
        column.titlePrefix = {
          content: property.description,
        }
      }

      // 列宽度
      setColumnWidth(column, uiProperty, props.columnWidth)
      // 自定义格式化功能
      setColumnFormatter(column, property, uiProperty)

      // 设置VxeColumn底层的内容
      setColumnNaviveOptions(column, uiProperty)
      // 设置插槽内容
      setColumnSlot(column, slots)

      ret.push(column)
    }
  })
  // 设置其他默认列
  setOtherColumns(ret, props)
  return ret
}
