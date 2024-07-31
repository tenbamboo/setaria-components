/* eslint-disable @typescript-eslint/no-namespace */
import type { VxeTableDefines } from 'vxe-table'
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

  export type PageChange = (currentPage: number, pageSize: number) => void

  export type CellClick<D = any> = (
    params: VxeTableDefines.CellClickEventParams<D>
  ) => void

  export type CellDbClick<D = any> = (
    params: VxeTableDefines.CellDblclickEventParams<D>
  ) => void

  export type OperButtonClick = (key: string, scope: any) => void

  export type ColumnSettingShow = () => void

  export type ColumnSettingHide = () => void

  export type ColumnSettingVisibleChange = (checkedKeys: string[]) => void

  export type ColumnSettingSortChange = (sortKeys: string[]) => void

  export type FormOpen = (currentFormData: any, controlStatus: string) => void

  export type FormOpened = (currentFormData: any, controlStatus: string) => void

  export type FormClose = (currentFormData: any, controlStatus: string) => void

  export type FormClosed = (currentFormData: any, controlStatus: string) => void

  export type OperButtons = (scope: any) => any[]

  export type CanUpdateRow = (scope: any) => boolean

  export type CanDeleteRow = (scope: any) => boolean

  export type CanViewRow = (scope: any) => boolean

  export type FormSave = (
    data: any,
    controlStatus: string,
    formRef: any
  ) => Promise<any>
}
