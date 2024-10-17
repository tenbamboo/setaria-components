// import { ElForm, formProps } from 'element-plus'
import { buildProps, definePropType } from '@setaria-components/utils'
import type { FormRules } from 'element-plus'
import type { VxeTablePropTypes } from 'vxe-table'
import type { ExtractPropTypes, PropType } from 'vue'
import type {
  SchemaProps,
  SchemaUiPropsByTable,
} from '../../common-schema/schema.type'

// export const schemaTablePropsReal =

export const schemaTableProps = buildProps({
  schema: {
    type: Object as PropType<SchemaProps>,
    required: true,
    default() {
      return null
    },
  },
  uiSchema: {
    type: Object as PropType<Record<string, SchemaUiPropsByTable>>,
    default() {
      return {}
    },
  },
  columnWidth: {
    type: [String, Number],
    default() {
      return null
    },
  },
  border: {
    type: Boolean,
    default: true,
  },
  tableId: String,
  stripe: Boolean,
  showOverflow: Boolean,
  maxEditOnRow: {
    type: Number,
    default: 3,
  },
  data: Array,
  modelValue: Array,
  changeModeField: {
    type: String,
    default: '_MODE',
  },
  height: {
    type: [Number, String],
    default() {
      return null
    },
  },
  maxHeight: {
    type: [Number, String],
    default() {
      return null
    },
  },
  selectionType: {
    // type: definePropType<string | Component>([String, Object]),
    // default: 'button',
    type: definePropType<'radio' | 'checkbox' | ''>([String]),
    // type: String,
    // values: ['radio', 'checkbox', ''],
    default: '',
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
    default() {
      return null
    },
  },
  sortConfig: {
    type: Object as PropType<VxeTablePropTypes.SortConfig>,
    default() {
      return null
    },
  },
  // 是否开启Y轴虚拟滚动
  virtualScroll: {
    type: Boolean,
    default: false,
  },
  // 合并单元格
  mergeCells: {
    type: Function,
    default() {
      return null
    },
  },
  // // 合并头部信息
  // mergeHeaders: {
  //   type: Function,
  // },
  showFooter: {
    type: Boolean,
    default: false,
  },
  footerMethod: {
    type: Function,
    default() {
      return null
    },
  },
  rowConfig: {
    type: Object as PropType<VxeTablePropTypes.RowConfig>,
    default() {
      return null
    },
  },
  treeConfig: {
    type: Object as PropType<VxeTablePropTypes.TreeConfig>,
    default() {
      return null
    },
  },
  seqColumn: {
    type: Boolean,
    default: false,
  },
  seqConfig: {
    type: Object as PropType<VxeTablePropTypes.SeqConfig>,
    default() {
      return null
    },
  },
  rowClassName: {
    type: [String, Function] as PropType<VxeTablePropTypes.RowClassName>,
    default() {
      return null
    },
  },
  cellClassName: {
    type: [String, Function] as PropType<VxeTablePropTypes.CellClassName>,
    default() {
      return null
    },
  },
  // 是否显示分页
  showPage: {
    type: Boolean,
    default: false,
  },
  pageLayout: {
    type: String,
    default() {
      return 'total,prev,pager,next,sizes,jumper'
    },
  },
  // 当前页号
  pageNum: {
    type: Number,
    default: 1,
  },
  // 每页显示数据数量
  pageSize: Number,
  pageSizes: Array,
  pageTotal: Number,
  showOper: {
    type: Boolean,
    default: false,
  },
  showFullScreen: {
    type: Boolean,
    default: true,
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
    default() {
      return null
    },
  },
  showColumnSetting: {
    type: Boolean,
    default: false,
  },
  columnSettingDraggable: {
    type: Boolean,
    default: false,
  },
  canAdd: {
    type: Boolean,
    default: true,
  },
  canUpdate: {
    type: Boolean,
    default: true,
  },
  canDelete: {
    type: Boolean,
    default: true,
  },
  canView: {
    type: Boolean,
    default: false,
  },
  canUpdateRow: {
    type: Function,
    default() {
      return null
    },
  },
  canDeleteRow: {
    type: Function,
    default() {
      return null
    },
  },
  canViewRow: {
    type: Function,
    default() {
      return null
    },
  },
  isShowTopButton: {
    type: Boolean,
    default: true,
  },
  rowKey: String,
  /**
   * 新增一行按钮点击时的回调函数，用于对新增数据进行默认值设定
   */
  beforeAddRow: Function,
  /**
   * 修改按钮点击时的回调函数，用于对修改数据进行处理
   */
  beforeUpdateRow: Function,
  formSave: Function,
  formRules: {
    type: definePropType<FormRules>(Object),
    // type: Object,
    default() {
      return null
    },
  },
  dataAddPosition: {
    type: String,
    values: ['end', 'begin', '', null],
    default: 'end',
  },
  formProps: {
    type: Object,
    default() {
      return null
    },
  },
  formWrapComponent: {
    //   type: definePropType<'dialog' | 'drawer' | ''>([String]),
    type: String,
    values: ['dialog', 'drawer', ''],
    default: 'dialog',
  },
  formWrapComponentProps: {
    type: Object,
    default() {
      return null
    },
  },
})
export type SchemaTableProps = ExtractPropTypes<typeof schemaTableProps>

export const SchemaTableEditType = {
  ADD: 'add',
  DELETE: 'delete',
  UPDATE: 'update',
}
