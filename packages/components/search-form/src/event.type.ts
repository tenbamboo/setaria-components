/* eslint-disable @typescript-eslint/no-namespace */
export namespace SearchFormEvents {
  export type DataChange = (
    schemaKey: string,
    val: string | number,
    model: any
  ) => void

  export type DataSubmit = (modelValue: any) => void
  export type DataReset = () => void
  export type CollapseChange = (Expand: boolean) => void
  export type Submitting = (modelValue: any) => Promise<void>
}
