/* eslint-disable @typescript-eslint/no-namespace */
export namespace SchemaFormEvents {
  export type DataChange = (
    schemaKey: string,
    val: string | number,
    model: any
  ) => void
}
