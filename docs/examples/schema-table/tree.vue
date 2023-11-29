<template>
  <sc-schema-table
    ref="schemaTableRef"
    class="mytable-style"
    :schema="schema"
    :ui-schema="uiSchema"
    :data="dataList"
    :column-width="120"
    :tree-config="treeConfig"
  />
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type {
  SchemaProps,
  SchemaTableInstance,
  SchemaUiPropsByTable,
} from 'setaria-components'
const schemaTableRef = ref<SchemaTableInstance>()

interface RowVO {
  id: number
  name: string
  role: string
  sex: string
  age: number
  amount: number
  address: string
}

const schema = reactive<SchemaProps>({
  required: [],
  properties: {
    id: {
      type: 'string',
      title: 'id',
    },
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
      format: 'datetime',
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
// 需要通过 treeNode 属性告知组件哪一列是可以点击展开的
const uiSchema = reactive<Record<string, SchemaUiPropsByTable>>({
  id: {
    options: {
      treeNode: true,
    },
  },
})

const dataList = Array.from({ length: 10 }).map((item, index) => {
  return {
    id: index,
    testString: `testString${index}`,
    testDesc: `testDesc${index}`,
    testNumber: index,
    testDate: '2023-10-12',
    testDateTime: '2023-10-12 10:10:10',
    testCurrency: 11234 + index,
    testSelect1: 't1',
    parentId: index === 0 || index === 1 ? null : index % 2,
  }
})

const treeConfig = {
  transform: true,
  rowField: 'id',
  parentField: 'parentId',
}
</script>
