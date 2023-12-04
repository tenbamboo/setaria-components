import { computed, ref } from 'vue'
import type { Ref } from 'vue'
import type { VxeGridInstance, VxeTableEvents } from 'vxe-table'
export const useSelection = (
  props: any,
  // eslint-disable-next-line @typescript-eslint/ban-types
  emit: Function,
  xTable: Ref<VxeGridInstance | undefined>
) => {
  const selectionList = ref<any[]>([])
  const innerSelectionConfig = computed(() => {
    return {
      reserve: props.isReserve,
      trigger: props.labelMode !== false ? 'row' : null,
      ...props.selectionConfig,
    }
  })

  const handlerRadioChange: VxeTableEvents.RadioChange = (val) => {
    if (props.selectionType === 'radio') {
      handlerSelectionChange([val.row], val.row)
    }
  }

  const handlerCheckboxChange: VxeTableEvents.CheckboxChange = (val) => {
    if (props.selectionType === 'checkbox' && xTable.value) {
      let records = xTable.value.getCheckboxRecords()

      if (props.isReserve) {
        const reserveArray = xTable.value.getCheckboxReserveRecords()
        records = [...records, ...reserveArray]
      }

      handlerSelectionChange(records, val.row)
      // console.log(checked ? '勾选事件' : '取消事件', records)
    }
  }

  // 所有的都被check
  const handlerCheckboxAll: VxeTableEvents.CheckboxAll = (val) => {
    if (val.checked) {
      if (xTable.value) {
        const records = xTable.value.getCheckboxRecords()
        handlerSelectionChange(records)
        emit('selection-all', records)
      }
    } else {
      handlerSelectionChange([])
      emit('selection-all', [])
    }
  }

  const handlerSelectionChange = (list: any[], currentOperItem?: any) => {
    selectionList.value = list
    emit('selection-change', list, currentOperItem)
  }

  // 外部方法，设置选中
  const setSelection = (data: any, checked = true) => {
    // let selection = []
    if (props.selectionType === 'checkbox') {
      xTable.value?.setCheckboxRow(data, checked)
    } else if (props.selectionType === 'radio') {
      if (!checked) {
        xTable.value?.clearRadioRow()
      } else {
        xTable.value?.setRadioRow(data)
      }
    }
    // this.emitSelectionChange(selection, data);
  }

  const clearSelection = () => {
    if (props.selectionType === 'checkbox') {
      xTable.value?.clearCheckboxRow()
      xTable.value?.clearCheckboxReserve()
    } else if (props.selectionType === 'radio') {
      xTable.value?.clearRadioRow()
      xTable.value?.clearRadioReserve()
    }
  }

  const getSelection = () => {
    if (props.selectionType === 'checkbox') {
      if (props.isReserve) {
        return [
          ...(xTable.value?.getCheckboxRecords() || []),
          ...(xTable.value?.getCheckboxReserveRecords() || []),
        ]
      }
      return xTable.value?.getCheckboxRecords()
    } else if (props.selectionType === 'radio') {
      return xTable.value?.getRadioRecord()
    }
    return null
  }

  return {
    selectionList,
    innerSelectionConfig,
    handlerRadioChange,
    handlerCheckboxChange,
    handlerCheckboxAll,
    handlerSelectionChange,
    clearSelection,
    setSelection,
    getSelection,
  }
}
