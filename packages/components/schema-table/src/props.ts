// import { ElForm, formProps } from 'element-plus'
import { buildProps, definePropType } from '@setaria-components/utils'
import type { VxeTablePropTypes } from 'vxe-table'
import type { ExtractPropTypes, PropType } from 'vue'
import type {
  SchemaProps,
  SchemaUiPropsByTable,
} from '../../common-schema/schema.type'

export const schemaTableProps = buildProps({
  schema: {
    type: Object as PropType<SchemaProps>,
    required: true,
  },
  uiSchema: {
    type: Object as PropType<Record<string, SchemaUiPropsByTable>>,
    default() {
      return {}
    },
  },
  columnWidth: {
    type: [String, Number],
  },
  border: {
    type: definePropType<VxeTablePropTypes.Border>([Boolean, String]),
    default: true,
  },
  tableId: {
    type: String,
  },
  stripe: {
    type: Boolean,
  },
  showOverflow: {
    type: definePropType<VxeTablePropTypes.ShowOverflow>([Boolean, String]),
  },
  maxEditOnRow: {
    type: Number,
    default: 3,
  },
  data: {
    type: Array,
  },
  changeModeField: {
    type: String,
    required: false,
    default: '_MODE',
  },
  height: {
    type: [Number, String],
  },
  maxHeight: {
    type: [Number, String],
  },
  selectionType: {
    type: definePropType<'radio' | 'checkbox' | ''>([String]),
  },
  labelMode: {
    type: Boolean,
    default: true,
  },
  // 是否保留CheckBox选中状态
  isReserve: {
    type: Boolean,
    default: false,
  },
  // 单选复选底层相关配置，具体可查看 radio-config checkbox-config内容
  selectionConfig: {
    type: Object as PropType<Record<string, any>>,
  },
  sortConfig: {
    type: Object as PropType<VxeTablePropTypes.SortConfig>,
  },
  // 是否开启Y轴虚拟滚动
  virtualScroll: {
    type: Boolean,
    default: false,
  },
  // 合并单元格
  mergeCells: {
    type: Function,
  },
  showFooter: {
    type: Boolean,
    default: false,
  },
  footerMethod: {
    type: Function,
  },
  rowConfig: {
    type: Object as PropType<VxeTablePropTypes.RowConfig>,
  },
  treeConfig: {
    type: Object as PropType<VxeTablePropTypes.TreeConfig>,
  },
  seqColumn: {
    type: Boolean,
    default: false,
  },
  seqConfig: {
    type: Object as PropType<VxeTablePropTypes.SeqConfig>,
  },
  rowClassName: {
    type: [String, Function] as PropType<VxeTablePropTypes.RowClassName>,
  },
  cellClassName: {
    type: [String, Function] as PropType<VxeTablePropTypes.CellClassName>,
  },

  // 是否显示分页
  showPage: {
    type: Boolean,
    default: false,
  },
  pageLayouts: {
    type: Array,
    default() {
      return [
        'Total',
        'Sizes',
        'PrevPage',
        'JumpNumber',
        'NextPage',
        'FullJump',
      ]
    },
  },
  // 当前页号
  pageNum: Number,
  // 每页显示数据数量
  pageSize: Number,
  pageSizes: Array,
  pageTotal: Number,
  showOper: {
    type: Boolean,
    default: false,
  },
  operWidth: {
    type: [Number, String],
    default: '120px',
  },
  operMaxDisplayCount: {
    type: [Number, String],
    default: 3,
  },
  operButtons: {
    type: Function,
  },
  showColumnSetting: {
    type: Boolean,
    default: false,
  },
  columnSettingDraggable: {
    type: Boolean,
    default: false,
  },
} as const)
export type SchemaTableProps = ExtractPropTypes<typeof schemaTableProps>

export const SchemaTableEditType = {
  ADD: 'add',
  DELETE: 'delete',
  UPDATE: 'update',
}
