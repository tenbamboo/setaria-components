// GlobalComponents for Volar
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    ScSchemaForm: typeof import('setaria-components')['ScSchemaForm']
    ScSearchForm: typeof import('setaria-components')['ScSearchForm']
    ScSchemaTable: typeof import('setaria-components')['ScSchemaTable']
  }
}

export {}
