<template>
  <sc-schema-table
    :data="dataList"
    :schema="schema"
    :label-mode="false"
    :show-oper="true"
    :show-column-setting="true"
    :selection-type="'checkbox'"
  />
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import type { SchemaProps } from 'setaria-components'
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
          title: 't1',
        },
        {
          const: 't2',
          title: 't2',
        },
        {
          const: 't3',
          title: 't3',
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
          title: 't1',
        },
        {
          const: 't2',
          title: 't2',
        },
        {
          const: 't3',
          title: 't3',
          disabled: true,
        },
        {
          const: 't4',
          title: 't4',
        },
      ],
    },
    testCustomSlot: {
      type: 'string',
      title: '测试自定义插槽',
    },
  },
})

const dataList = [
  {
    testString: 't1',
    testDesc: 't2',
    testNumber: 3,
    testDate: '2023-10-12',
    testDateTime: '2023-10-12 10:10:10',
    testCurrency: 11234,
    testSelect1: 't1',
  },
  {
    testString: 'a1',
    testDesc: 'a2',
    testNumber: 4,
    testDate: '2023-10-12',
    testDateTime: '2023-10-12 10:10:10',
    testCurrency: 11234,
    testSelect1: 't1',
  },
]
</script>
