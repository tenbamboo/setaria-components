import { withInstall } from '@setaria-components/utils'

import SchemaTable from './src/schema-table'

export const ScSchemaTable = withInstall(SchemaTable)
export default ScSchemaTable

export * from './src/schema-table'
export * from './src/props'
export type { SchemaTableInstance } from './src/instance'
