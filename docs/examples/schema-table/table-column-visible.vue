<template>
  <el-button @click="setStringColumnVisible"
    >设置测试String项显示/隐藏</el-button
  >
  <el-button @click="setNumberColumnVisible">设置数值项显示/隐藏</el-button>

  <sc-schema-table
    ref="schemaTableRef"
    :schema="schema"
    :ui-schema="uiSchema"
    :data="dataList"
  />
  <!-- -->
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type {
  SchemaProps,
  SchemaTableInstance,
  SchemaUiPropsByTable,
} from 'setaria-components'
const schemaTableRef = ref<SchemaTableInstance>()

const schema = reactive<SchemaProps>({
  required: [],
  properties: {
    testString: {
      type: 'string',
      title: '测试String',
    },
    testDesc: {
      type: 'string',
      title: '测试Desc',
      description: '我是描述内容',
    },
    testNumber: {
      type: 'number',
      title: '测试数值',
      scale: 2,
    },
    testDate: {
      type: 'string',
      format: 'date',
      title: '测试日期',
    },
    testDateTime: {
      type: 'string',
      format: 'date-time',
      title: '测试日期时间',
    },
    testTime: {
      type: 'string',
      format: 'time',
      title: '测试时间',
    },
    testCurrency: {
      type: 'number',
      format: 'currency',
      title: '测试货币',
      scale: 2,
    },
    testSelect1: {
      type: 'string',
      title: '测试下拉1-单选',
      oneOf: [
        {
          const: 't1',
          title: 'title1',
        },
        {
          const: 't2',
          title: 'titlet2',
        },
        {
          const: 't3',
          title: 'title3',
          disabled: true,
        },
      ],
    },
    testSelect2: {
      type: 'number',
      title: '测试下拉2-多选',
      anyOf: [
        {
          const: 't1',
          title: 'title1',
        },
        {
          const: 't2',
          title: 'title2',
        },
        {
          const: 't3',
          title: 'title3',
          disabled: true,
        },
        {
          const: 't4',
          title: 'title4',
        },
      ],
    },
    testCustomSlot: {
      type: 'string',
      title: '测试自定义插槽',
    },
  },
})

const uiSchema = reactive<Record<string, SchemaUiPropsByTable>>({
  testString: {
    columnVisible: false,
  },
  testNumber: {
    visible: false,
  },
})

const dataList = Array.from({ length: 10 }).map((item, index) => {
  return {
    testString: `testString${index}`,
    testDesc: `testDesc${index}`,
    testNumber: index,
    testDate: '2023-10-12',
    testDateTime: '2023-10-12 10:10:10',
    testCurrency: 11234 + index,
    testSelect1: 't1',
  }
})

const setStringColumnVisible = () => {
  uiSchema.testString.columnVisible = !uiSchema.testString.columnVisible
}

const setNumberColumnVisible = () => {
  uiSchema.testNumber.visible = !uiSchema.testNumber.visible
}
</script>
