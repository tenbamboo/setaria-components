import SetariaComponents from 'setaria-components'
import ElementPlus from 'element-plus'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
import { createI18n } from 'vue-i18n'
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

    const i18n = createI18n({
      legacy: false,
      locale: 'zh-cn', // 设置语言环境
      fallbackLocale: 'zh-cn',
      silentTranslationWarn: true, // 关闭警告
      messages: {
        'zh-cn': {},
        'en-us': {},
      }, // 设置语言环境信息
    })
    app.use(i18n)

    globals.forEach(([name, Comp]) => {
      app.component(name, Comp)
    })
  },
})
