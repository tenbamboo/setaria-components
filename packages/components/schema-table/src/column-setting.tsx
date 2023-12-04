/* eslint-disable @typescript-eslint/ban-types */
import { computed, nextTick, reactive, ref } from 'vue'
import { ElCheckbox, ElIcon, ElLink, ElPopover, ElTree } from 'element-plus'
import { Rank, Setting } from '@element-plus/icons-vue'
import { remove, uniq } from 'lodash-unified'
import XEUtils from 'xe-utils'
import { useLocale } from '@setaria-components/hooks'
import type { CheckboxValueType } from 'element-plus'
import type { Ref } from 'vue'
import type { VxeGridInstance } from 'vxe-table'

const visibleStorageKey = 'VXE_TABLE_CUSTOM_COLUMN_VISIBLE'
const dragSortStorageKey = 'VXE_TABLE_CUSTOM_COLUMN_DRAG_SORT'

export const useColumnSetting = (
  xTable: Ref<VxeGridInstance | undefined>,
  props: any,
  emit: Function
  // columnsBySchema: any[]
) => {
  const { t } = useLocale()
  const isIndeterminate = ref<boolean>(false)
  const isAllChecked = ref<boolean>(false)
  let checkedKeys = reactive<Array<any>>([])
  const columnsBySchemaSorted = ref<any[]>([]) //reactive<Array<any>>([])
  let columnsBySchema: any[] = []
  const treeRef = ref<InstanceType<typeof ElTree>>()

  // 获取当前列的是否可见
  const getColumnVisible = (field: string) => {
    if (xTable.value) {
      const column = xTable.value.getColumnByField(field)
      if (column) {
        return column.visible
      }
    }

    const findObj = columnsBySchema.find((item) => item.field === field)
    if (findObj) {
      return findObj.visible
    }

    return null
  }
  // 改变勾选状态
  const toggleChecked = (field: string, checked: boolean) => {
    if (checked) {
      checkedKeys.push(field)
      checkedKeys = [...new Set(checkedKeys)]
    } else {
      remove(checkedKeys, (item: string) => {
        return item === field
      })
    }
    emit('column-setting-visible-change', checkedKeys)
    saveCustomVisible(
      props.tableId,
      xTable.value?.getTableColumn()?.collectColumn
    )
  }
  // 刷新勾选所有的状态
  const refreshCheckAllStatus = () => {
    const settingColumnTotalCount = treeData.value.length
    const visibleColumnCount = treeData.value.reduce((count, item: any) => {
      if (getColumnVisible(item.field)) {
        count += 1
      }

      return count
    }, 0)

    // 更新checkbox indeterminate 状态
    isIndeterminate.value =
      visibleColumnCount > 0 && visibleColumnCount < settingColumnTotalCount

    // 更新checkbox选中状态
    isAllChecked.value = visibleColumnCount === settingColumnTotalCount
  }

  const getCustomStorageMap = (key: string) => {
    // const version = GlobalConfig.version
    const rest = XEUtils.toStringJSON(localStorage.getItem(key))
    return rest
    // return rest && rest._v === version ? rest : { _v: version }
  }

  function saveCustomDragSort(tableId: string, list: any[]) {
    if (tableId) {
      const columnDragSortStorageMap = getCustomStorageMap(dragSortStorageKey)
      columnDragSortStorageMap[tableId] = list.join(',')
      localStorage.setItem(
        dragSortStorageKey,
        XEUtils.toJSONString(columnDragSortStorageMap)
      )
    }
  }

  function saveCustomVisible(tableId: string, collectColumn?: any[]) {
    // const { id, collectColumn, customConfig, customOpts } = this
    // const { checkMethod, storage } = customOpts
    // const isAllStorage = customOpts.storage === true
    // const isVisible = isAllStorage || (storage && storage.visible)
    if (tableId) {
      const columnVisibleStorageMap = getCustomStorageMap(visibleStorageKey)
      const colHides: any[] = []
      const colShows: any[] = []
      XEUtils.eachTree(collectColumn, (column) => {
        if (column.field) {
          if (column.visible === false) {
            colHides.push(column.field)
          } else if (column.visible) {
            colShows.push(column.field)
          }
        }
      })
      columnVisibleStorageMap[tableId] =
        [uniq(colHides).join(',')]
          .concat(colShows.length ? [colShows.join(',')] : [])
          .join('|') || undefined
      localStorage.setItem(
        visibleStorageKey,
        XEUtils.toJSONString(columnVisibleStorageMap)
      )
    }
  }

  // 设置schemaBySort的内容
  const setSchemaBySort = (sortKeys?: any[]) => {
    if (sortKeys && sortKeys.length) {
      const newSchema: any[] = []
      sortKeys.forEach((field: string) => {
        const findObj = columnsBySchema.find(
          (item: any) => item.field === field
        )
        if (findObj) {
          newSchema.push(findObj)
        }
      })
      const operColumn = columnsBySchema.find((item: any) =>
        ['operation'].includes(item.type)
      )
      if (operColumn) {
        newSchema.push(operColumn)
      }

      const selectionColumn = columnsBySchema.find((item: any) =>
        ['checkbox', 'radio'].includes(item.type)
      )
      if (selectionColumn) {
        newSchema.unshift(selectionColumn)
      }

      const seqColumn = columnsBySchema.find((item: any) =>
        ['seq'].includes(item.type)
      )
      if (seqColumn) {
        newSchema.unshift(seqColumn)
      }

      columnsBySchemaSorted.value = newSchema
    } else {
      columnsBySchemaSorted.value = columnsBySchema
    }
  }

  // 初始化排序内容
  const initColumnSetting = (_columnsBySchema: any) => {
    columnsBySchema = _columnsBySchema

    checkedKeys = columnsBySchema
      .filter((item: any) => item.visible)
      .map((item: any) => item.field)

    if (props.tableId) {
      const sortKeys = getCustomStorageMap(dragSortStorageKey)[props.tableId]
      if (sortKeys) {
        setSchemaBySort(sortKeys.split(','))
      } else {
        setSchemaBySort()
      }
    } else {
      setSchemaBySort()
    }
    nextTick().then(() => {
      refreshCheckAllStatus()
    })
  }
  const treeData = computed<Array<any>>(() => {
    return columnsBySchemaSorted.value.filter(
      // 把序号列和操作列和勾选功能隐藏
      (item: any) =>
        !['operation', 'seq', 'checkbox', 'radio'].includes(item.type)
    )
  })

  // watch(
  //   () => columnsBySchema,
  //   (val) => {

  //     initColumnSetting()

  //   },
  //   {
  //     immediate: true,
  //     deep: true,
  //   }
  // )

  const columnSettingAllowDrop = (
    draggingNode: any,
    dropNode: any,
    type: string
  ) => {
    if (type === 'inner') {
      return false
    }
    return true
  }
  const handlerColumnSettingShow = () => {
    emit('column-setting-show')
  }

  const handlerColumnSettingHide = () => {
    emit('column-setting-hide')
  }
  const hanlderAllCheckChanged = (val: CheckboxValueType) => {
    const checked = val as boolean
    treeData.value.forEach(({ field }: any) => {
      const column = xTable.value?.getColumnByField(field)
      if (column) {
        column.visible = checked
      }
      toggleChecked(field, checked)
    })

    treeRef.value?.setCheckedKeys(checkedKeys, checked)
  }

  const handlerColumnSettingNodeDragEnd = () => {
    const list = treeData.value.map((item: any) => {
      return item.field
    })

    setSchemaBySort(list)
    // // 保存自定义的拖拽表格列信息
    saveCustomDragSort(props.tableId, list)
    emit('column-setting-sort-change', list)
    // xTable.value?.refreshColumn()
  }

  const handlerColumnSettingTreeNodeCheck = (
    data: any,
    checked: boolean,
    indeterminate: boolean
  ) => {
    const { field } = data
    // // 忽略父节点
    if (indeterminate) {
      return
    }
    const targetTableColumn = xTable.value?.getColumnByField(field)
    if (targetTableColumn) {
      targetTableColumn.visible = checked
      toggleChecked(field, checked)

      xTable.value?.refreshColumn().then(() => {
        refreshCheckAllStatus()
      })
    }
  }

  const renderContent = (h: any, { node }: any) => {
    const ret = (
      <div class="sc-schema-table_column-setting-tree-node">
        <span>{node.data.title}</span>
        <ElIcon>
          <Rank />
        </ElIcon>
      </div>
    )
    return ret
  }

  // initColumnSetting()

  return {
    columnsBySchemaSorted,
    initColumnSetting,
    columnSettingRender: () => {
      if (props.showColumnSetting) {
        return (
          <div>
            <ElPopover
              placement="bottom"
              class="sc-schema-table_column-setting"
              width="240"
              trigger="click"
              popper-class="sc-schema-table_column-setting-tree"
              onBefore-enter={handlerColumnSettingShow}
              onBefore-leave={handlerColumnSettingHide}
              v-slots={{
                reference: () => {
                  return (
                    <ElLink
                      class="sc-schema-table_column-setting-trigger"
                      icon={Setting}
                      type="primary"
                      underline={false}
                    >
                      {t('sc.schemaTable.settingColumns')}
                    </ElLink>
                  )
                },
              }}
            >
              <div class="sc-schema-table_column-setting-check-all">
                <ElCheckbox
                  indeterminate={isIndeterminate.value}
                  v-model={isAllChecked.value}
                  onChange={hanlderAllCheckChanged}
                >
                  {t('sc.schemaTable.allColumns')}
                </ElCheckbox>
                {/* <el-button
                type="text"
                class="column-setting__reset-button"
                on-click={onReset}
              >
                {t('el.proform.reset')}
              </el-button> */}
              </div>
              <ElTree
                ref={treeRef}
                data={treeData.value}
                show-checkbox
                node-key="field"
                default-expand-all={true}
                expand-on-click-node={false}
                draggable={props.columnSettingDraggable}
                check-on-click-node={!props.columnSettingDraggable}
                default-checked-keys={checkedKeys}
                allow-drop={columnSettingAllowDrop}
                // on-check={onColumnSettingCheck}
                onCheck-change={handlerColumnSettingTreeNodeCheck}
                onNode-drag-end={handlerColumnSettingNodeDragEnd}
                render-content={renderContent}
              />
            </ElPopover>
          </div>
          // <VxePager
          //   size="small"
          //   background
          //   current-page={innerCurrentPage.value}
          //   layouts={props.pageLayouts}
          //   page-size={innerPageSize.value}
          //   page-sizes={innerPageSizes.value}
          //   total={innerPageTotal.value}
          //   onPageChange={onPageChange}
          //   {...{
          //     'onUpdate:pageSize': (val: any) => {
          //       innerPageSize.value = val
          //       emit('update:pageSize', val)
          //     },
          //     'onUpdate:currentPage': (val: any) => {
          //       innerCurrentPage.value = val
          //       emit('update:pageNum', val)
          //     },
          //   }}
          // />
        )
      }
      return null
    },
  }
}
