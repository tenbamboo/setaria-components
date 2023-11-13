import { withInstall } from '@setaria-components/utils'

import SearchForm from './src/search-form.jsx'

export const ScSearchForm = withInstall(SearchForm)
export default ScSearchForm

export * from './src/search-form.jsx'
export type { SearchFormInstance } from './src/instance'
