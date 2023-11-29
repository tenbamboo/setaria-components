import { withInstall } from '@setaria-components/utils'

import SearchForm from './src/search-form'

export const ScSearchForm = withInstall(SearchForm)
export default ScSearchForm

export * from './src/search-form'
export * from './src/props'
export type { SearchFormInstance } from './src/instance'
