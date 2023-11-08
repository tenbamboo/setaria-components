import { withInstall } from '@setaria-components/utils'

import SchemaForm from './src/schema-form.tsx'

export const ScSchemaForm = withInstall(SchemaForm)
export default ScSchemaForm

export * from './src/schema-form'
export type { SchemaFormInstance } from './src/instance'
