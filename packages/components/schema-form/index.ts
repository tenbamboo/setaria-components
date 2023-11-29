import { withInstall } from '@setaria-components/utils'

import SchemaForm from './src/schema-form'

export const ScSchemaForm = withInstall(SchemaForm)
export default ScSchemaForm

export * from './src/schema-form'
export * from './src/props'
export type { SchemaFormInstance } from './src/instance'
