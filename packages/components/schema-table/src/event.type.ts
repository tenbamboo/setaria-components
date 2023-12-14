/* eslint-disable @typescript-eslint/no-namespace */
import type { VxePagerDefines, VxeTableDefines } from 'vxe-table'
export namespace SchemaTableEvents {
  export type DataChange = (
    schemaKey: string,
    val: string | number,
    model: any
  ) => void

  export type SelectionChange = (list: any[], currentOperItem?: any) => void

  export type SelectionAll = (list: any[]) => void

  export type SortChange<D = any> = (
    params: VxeTableDefines.SortChangeEventParams<D>
  ) => void

  export type PageChange = (
    params: VxePagerDefines.PageChangeEventParams
  ) => void

  export type CellClick<D = any> = (
    params: VxeTableDefines.CellClickEventParams<D>
  ) => void

  export type OperButtonClick = (key: string, scope: any) => void

  export type ColumnSettingShow = () => void

  export type ColumnSettingHide = () => void

  export type ColumnSettingVisibleChange = (checkedKeys: string[]) => void

  export type ColumnSettingSortChange = (sortKeys: string[]) => void
}
