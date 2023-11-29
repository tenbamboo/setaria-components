import SetariaComponents from 'setaria-components'
import ElementPlus from 'element-plus'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'

import VPApp, { NotFound, globals } from '../vitepress'
import { define } from '../utils/types'
import 'uno.css'
import './style.css'
import type { Theme } from 'vitepress'

export default define<Theme>({
  NotFound,
  Layout: VPApp,
  enhanceApp: ({ app }) => {
    app.use(ElementPlus)
    app.use(SetariaComponents)
    app.use(VXETable)

    globals.forEach(([name, Comp]) => {
      app.component(name, Comp)
    })
  },
})
