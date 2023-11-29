/* eslint-disable @typescript-eslint/ban-types */
import { ref, watch } from 'vue'

import { VxePager } from 'vxe-table'
const DEFAULT_PAGE_SIZE = 10
const DEFAULT_PAGE_SIZES = [10, 20, 50, 100]
export const usePager = (
  props: any,
  emit: Function,
  handlerSelectionChange: Function
) => {
  const innerCurrentPage = ref(1)
  const innerPageSize = ref(DEFAULT_PAGE_SIZE)
  const innerPageSizes = ref(DEFAULT_PAGE_SIZES)
  const innerPageTotal = ref(0)
  watch(
    () => props.pageNum,
    (val) => {
      innerCurrentPage.value = val || 1
    },
    {
      immediate: true,
    }
  )

  watch(
    () => props.pageSize,
    (val) => {
      innerPageSize.value = val || DEFAULT_PAGE_SIZE
    },
    {
      immediate: true,
    }
  )

  watch(
    () => props.pageSizes,
    (val) => {
      innerPageSizes.value = val || DEFAULT_PAGE_SIZES
    },
    {
      immediate: true,
    }
  )

  watch(
    () => props.pageTotal,
    (val) => {
      innerPageTotal.value = val
    },
    {
      immediate: true,
    }
  )

  const onPageChange = (val: any) => {
    const { currentPage, pageSize } = val
    innerCurrentPage.value = currentPage
    innerPageSize.value = pageSize

    if (!props.isReserve) {
      handlerSelectionChange([])
    }
    emit('page-change', val)
  }

  return {
    currentPage: innerCurrentPage.value,
    //  innerPageSize = DEFAULT_PAGE_SIZE
    //   let innerPageSizes = DEFAULT_PAGE_SIZES
    //   let innerTotal = 0
    pagerRender: () => {
      if (props.showPage) {
        return (
          <VxePager
            size="small"
            background
            current-page={innerCurrentPage.value}
            layouts={props.pageLayouts}
            page-size={innerPageSize.value}
            page-sizes={innerPageSizes.value}
            total={innerPageTotal.value}
            onPageChange={onPageChange}
            {...{
              'onUpdate:pageSize': (val: any) => {
                innerPageSize.value = val
                emit('update:pageSize', val)
              },
              'onUpdate:currentPage': (val: any) => {
                innerCurrentPage.value = val
                emit('update:pageNum', val)
              },
            }}
          />
        )
      }
      return null
    },
  }
}
