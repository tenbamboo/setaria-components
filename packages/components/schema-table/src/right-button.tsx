/* eslint-disable @typescript-eslint/ban-types */
import { computed, nextTick, reactive, ref } from 'vue'
import {
  ElCheckbox,
  ElIcon,
  ElLink,
  ElPopover,
  ElTree,
  useLocale,
} from 'element-plus'
import { FullScreen } from '@element-plus/icons-vue'
import { remove, uniq } from 'lodash-unified'
import XEUtils from 'xe-utils'
// import { useLocale } from '@setaria-components/hooks'
import type { CheckboxValueType } from 'element-plus'
import type { Ref, VNode } from 'vue'
import type { VxeGridInstance } from 'vxe-table'

export const useRightButton = (
  xTable: Ref<VxeGridInstance | undefined>,
  props: any,
  emit: Function
) => {
  const { t } = useLocale()
  const isFullScreen = ref<boolean>(false)
  //   const isAllChecked = ref<boolean>(false)
  //   let checkedKeys = reactive<Array<any>>([])
  //   const columnsBySchemaSorted = ref<any[]>([]) //reactive<Array<any>>([])
  //   let columnsBySchema: any[] = []
  //   const treeRef = ref<InstanceType<typeof ElTree>>()

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
            title={t('sc.schemaTable.fullScreen')}
            icon={FullScreen}
            type="primary"
            underline={false}
            onClick={toggleFullScreen}
          ></ElLink>
        )
      }

      return btns
    },
  }
}
