<template>
  <div>打开代码查看具体内容</div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { SchemaUiPropsByTable } from 'setaria-components'
const uiSchema = reactive<Record<string, SchemaUiPropsByTable>>({
  // 正常属性
  testString: {
    disabled: true,
  },
  testDesc: {
    readonly: true,
  },
  testNumber: {
    visible: true,
  },
  testCurrency: {
    colspan: 3,
  },
  testDate: {
    colspan: 3,
    options: {
      'value-format': 'YYYY-MM-DD',
      type: 'daterange',
      'disabled-date': (date) => {
        return date >= Date.now()
      },
    },
  },
  testCustomSlot: {
    disabled: true,
    visible: true,
  },
  // 表格专属字段
  test1: {
    width: 100,
    sortable: true,
    fixed: 'left',
    formatter: ({ cellValue, column, row }) => {
      console.log(cellValue, column, row)
      return `我是自定义的内容||${row.testString}`
    },
    columnVisible: false,
    formItemVisible: false,
  },
})
</script>
