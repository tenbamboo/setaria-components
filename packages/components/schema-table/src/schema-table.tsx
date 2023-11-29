import { computed, defineComponent, ref, watch } from 'vue'

import { VxeGrid } from 'vxe-table'
import { isEmpty, merge } from 'lodash-unified'
import { isFunction } from '@setaria-components/utils'
import { createSchemaTableColumns } from '../../common-schema/builder'
import { SchemaTableEditType, schemaTableProps } from './props'
import { usePager } from './pager'
import { useSelection } from './selection'
import { useColumnSetting } from './column-setting'

import type {
  VxeGridInstance,
  VxeTableEvents,
  VxeTablePropTypes,
} from 'vxe-table'

export default defineComponent({
  name: 'ScSchemaTable',
  props: schemaTableProps,
  emits: [
    'input',
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

    const columnsBySchema = computed<any[]>(() => {
      return createSchemaTableColumns(
        props.schema,
        props.uiSchema,
        slots,
        emit,
        props
      )
    })

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

    const innerDataList = computed<VxeTablePropTypes.Data<any>>(() => {
      const { data, changeModeField } = props
      if (isEmpty(data)) {
        return []
      }
      return (
        data?.filter(
          (item: any) => item[changeModeField] !== SchemaTableEditType.DELETE
        ) || []
      )
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

    const {
      innerSelectionConfig,
      handlerRadioChange,
      handlerCheckboxChange,
      handlerCheckboxAll,
      handlerSelectionChange,
      clearSelection,
      setSelection,
      getSelection,
    } = useSelection(props, emit, xTable)

    const { pagerRender } = usePager(props, emit, handlerSelectionChange)

    const { columnSettingRender, columnsBySchemaSorted } = useColumnSetting(
      xTable,
      props,
      emit,
      columnsBySchema.value
    )

    expose({
      setSelection,
      clearSelection,
      getSelection,
    })

    return () => {
      return (
        <div class="sc-schema-table">
          {columnSettingRender()}
          <VxeGrid
            // 比较重点的内容
            // edit-rules={innerRules}
            ref={xTable}
            data={innerDataList.value}
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
        </div>
      )
    }
  },
})
