import { computed, defineComponent, nextTick, ref, watch } from 'vue'

import { VxeGrid } from 'vxe-table'
import { isEmpty, merge } from 'lodash-unified'
import { isFunction } from '@setaria-components/utils'
import { createSchemaTableColumns } from '../../common-schema/builder'
import { SchemaTableEditType, schemaTableProps } from './props'
import { usePager } from './pager'
import { useSelection } from './selection'
import { useColumnSetting } from './column-setting'
import { useEditable } from './editable'

import type {
  VxeGridInstance,
  VxeTableEvents,
  VxeTablePropTypes,
} from 'vxe-table'

export default defineComponent({
  name: 'ScSchemaTable',
  props: schemaTableProps,
  emits: [
    // 'input',
    // 'update:modelValue',
    'data-change',
    'selection-change',
    'selection-all',
    'sort-change',
    'page-change',
    'update:pageSize',
    'update:pageNum',
    'cell-click',
    'oper-button-click',
    'column-setting-show',
    'column-setting-hide',
    'column-setting-visible-change',
    'column-setting-sort-change',
  ],

  setup(props, { slots, emit, expose }) {
    // start
    const xTable = ref<VxeGridInstance>()
    const innerDataList = ref<any[]>([])
    // const detailVisible = ref<boolean>(false)
    const columnsBySchema = ref<any[]>([])
    watch(
      () => props.data,
      () => {
        innerDataList.value = props.data || []
      },
      {
        deep: true,
        immediate: true,
      }
    )
    const innerDataListExcluedDel = computed<VxeTablePropTypes.Data<any>>(
      () => {
        const { changeModeField } = props
        // if (isEmpty(props.modelValue)) {
        //   return []
        // }
        return (
          innerDataList.value?.filter(
            (item: any) => item[changeModeField] !== SchemaTableEditType.DELETE
          ) || []
        )
      }
    )
    // watchEffect(() => {
    //   console.log('bingogogogo', innerDataList.value)
    // })

    const {
      innerSelectionConfig,
      handlerRadioChange,
      handlerCheckboxChange,
      handlerCheckboxAll,
      handlerSelectionChange,
      clearSelection,
      setSelection,
      getSelection,
      selectionList,
    } = useSelection(props, emit, xTable)

    const { columnSettingRender, columnsBySchemaSorted, initColumnSetting } =
      useColumnSetting(xTable, props, emit)

    const { setOperColumn, detailFormRender, topButtonRender } = useEditable(
      props,
      emit,
      slots,
      xTable,
      selectionList,
      innerDataList
    )

    watch(
      () => [props.schema, props.uiSchema],
      () => {
        const list = createSchemaTableColumns(
          props.schema,
          props.uiSchema,
          slots,
          emit,
          props
        )
        // 设置操作列
        setOperColumn(list)

        columnsBySchema.value = list
        nextTick().then(() => {
          // 初始化列设置
          initColumnSetting(columnsBySchema.value)
          xTable.value?.refreshColumn()
        })
      },
      {
        deep: true,
        immediate: true,
      }
    )

    // const columnsBySchema = computed<any[]>(() => {
    //   const list = createSchemaTableColumns(
    //     props.schema,
    //     props.uiSchema,
    //     slots,
    //     emit,
    //     props
    //   )
    //   // 设置操作列
    //   setOperColumn(list)

    //   return list
    // })

    // watch(
    //   () => props.uiSchema,
    //   () => {
    //     console.log('bingogogo', columnsBySchema.value)
    //   },
    //   {
    //     deep: true,
    //   }
    // )
    const isEditOnRow = computed<boolean>(() => {
      const editableColumnCount = 0
      // vxeColumns.forEach((column) => {
      //   const { field } = column;
      //   const { editable } = innerSchema.properties[field];
      //   if (editable !== false) {
      //     editableColumnCount += 1;
      //   }
      // });
      // return editableColumnCount;

      return editableColumnCount <= props.maxEditOnRow
    })
    const innerEditConfig = computed(() => {
      // const { editConfig } = props
      const defaultConfig = {
        mode: 'row',
        showIcon: false,
        autoClear: false,
        showAsterisk: false,
      }
      if (isEditOnRow.value) {
        // 是否显示必填字段的红色星号
        defaultConfig.showAsterisk = true
        // 是否显示列头编辑图标
        defaultConfig.showIcon = true
      }
      return defaultConfig
    })

    const innerSortConfig = computed(() => {
      return {
        trigger: 'cell',
        orders: ['asc', 'desc'],
        remote: true,
        ...props.sortConfig,
      }
    })

    const innerCustomConfig = computed(() => {
      const isStorageConfig = !isEmpty(props.tableId)
      return {
        storage: {
          visible: isStorageConfig,
          resizable: isStorageConfig,
        },
      }
    })
    const innerScrollY = computed(() => {
      return {
        enabled: props.virtualScroll,
        gt: 20,
      }
    })

    const innerMergeCells = computed(() => {
      const { mergeCells } = props
      if (isFunction(mergeCells)) {
        return mergeCells(innerDataList.value)
      }
      return null
    })

    const innerColumnConfig = computed(() => {
      return {
        resizable: true,
      }
    })

    const innerRowConfig = computed(() => {
      return merge(
        {
          isCurrent: true,
          isHover: true,
        },
        props.rowConfig
      )
    })

    const innerSeqConfig = computed(() => {
      // const {
      //   innerCurrentPage,
      //   innerPageSize,
      //   innerTableColumns,
      //   seqConfig,
      //   showPagination,
      //   uiSchema
      // } = this;
      // const startIndex = showPagination
      //   ? (innerCurrentPage - 1) * innerPageSize
      //   : 0;
      const defaultConfig = {
        seqMethod: ({ rowIndex }: any) => {
          return rowIndex
        },
      }
      // const index = _.findIndex(
      //   innerTableColumns,
      //   (item) => item.type === 'seq'
      // );
      if (props.seqColumn) {
        return merge(defaultConfig, props.seqConfig)
      }
      return {}
    })

    const handlerSortChange: VxeTableEvents.SortChange = (val) => {
      emit('sort-change', val)
    }

    const handerCellClick: VxeTableEvents.CellClick = (val) => {
      emit('cell-click', val)
    }

    const { pagerRender } = usePager(props, emit, handlerSelectionChange)

    expose({
      setSelection,
      clearSelection,
      getSelection,
    })

    return () => {
      return (
        <div class="sc-schema-table">
          <div class="sc-schema-table_top-area">
            {topButtonRender()}
            {columnSettingRender()}
          </div>
          <VxeGrid
            // 比较重点的内容
            // edit-rules={innerRules}
            ref={xTable}
            data={innerDataListExcluedDel.value}
            columns={columnsBySchemaSorted.value}
            //直接继承props的
            id={props.tableId}
            border={props.border}
            stripe={props.stripe}
            auto-resize
            keep-source
            show-overflow={props.showOverflow}
            tree-config={props.treeConfig}
            height={props.height}
            max-height={props.maxHeight}
            show-footer={props.showFooter}
            footer-method={props.footerMethod}
            row-class-name={props.rowClassName}
            cell-class-name={props.cellClassName}
            // 内部默认定义的
            size="mini"
            row-config={innerRowConfig.value}
            edit-config={innerEditConfig.value}
            checkbox-config={innerSelectionConfig.value}
            radio-config={innerSelectionConfig.value}
            sort-config={innerSortConfig.value}
            custom-config={innerCustomConfig.value}
            column-config={innerColumnConfig.value}
            scroll-y={innerScrollY.value}
            merge-cells={innerMergeCells.value}
            seq-config={innerSeqConfig.value}
            // 事件相关
            onCellClick={handerCellClick}
            onRadioChange={handlerRadioChange}
            onCheckboxChange={handlerCheckboxChange}
            onCheckboxAll={handlerCheckboxAll}
            onSortChange={handlerSortChange}

            //
            // expand-config={innerExpandConfig}
            // tree-config={innerTreeConfig}
            // on-filter-change={onFilterChange}
            // menu-config={menuConfig}
            // export-config={innerExportConfig}
            // valid-config={validConfig}
            // row-id={innerRowKey}
            // scroll-x={scrollX}
            // merge-footer-items={mergeFooterItems}
            // nativeOnClick={onGridNativeClick}
            // row-class-name={rowClassName}
            // cell-class-name={cellClassName}
            // on-cell-dblclick={onCellDblClick}
            // on-cell-mouseenter={onCellMouseenter}
            // on-cell-mouseleave={onCellMouseleave}
            // on-edit-actived={onTableRowEditorActive}
            // on-edit-closed={onTableRowEditorClose}
            // on-valid-error={handleValidError}
          />
          {pagerRender()}
          {detailFormRender()}
        </div>
      )
    }
  },
})
