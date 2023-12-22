import SetariaComponents from 'setaria-components'
import ElementPlus from 'element-plus'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
import { createI18n } from 'vue-i18n'
// import elementZh from 'element-plus/dist/locale/zh-cn.mjs'
import { merge } from 'lodash-unified'
import { zhCn } from '@setaria-components/locale'
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
        'zh-cn': merge(zhCn),
        'en-us': merge(zhCn),
      }, // 设置语言环境信息
    })
    app.use(i18n)

    globals.forEach(([name, Comp]) => {
      app.component(name, Comp)
    })
  },
})
