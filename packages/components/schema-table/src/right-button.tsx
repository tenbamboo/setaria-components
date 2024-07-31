/* eslint-disable @typescript-eslint/ban-types */
import { ref } from 'vue'
import { ElLink, useLocale } from 'element-plus'
import { FullScreen } from '@element-plus/icons-vue'
// import { remove, uniq } from 'lodash-unified'
// import XEUtils from 'xe-utils'
// import { useLocale } from '@setaria-components/hooks'
// import type { CheckboxValueType } from 'element-plus'
import type { Ref } from 'vue'
import type { VxeGridInstance } from 'vxe-table'

export const useRightButton = (
  xTable: Ref<VxeGridInstance | undefined>,
  props: any
  //   emit: Function
) => {
  const { t } = useLocale()
  const isFullScreen = ref<boolean>(false)

  function toggleFullScreen() {
    isFullScreen.value = !isFullScreen.value
  }

  return {
    isFullScreen,
    // initColumnSetting,
    rightButtonRender: () => {
      const btns: JSX.Element[] = []

      if (props.showFullScreen) {
        btns.push(
          <ElLink
            icon={FullScreen}
            type="primary"
            underline={false}
            onClick={toggleFullScreen}
          >
            {t('sc.schemaTable.fullScreen')}
          </ElLink>
        )
      }

      return btns
    },
  }
}
