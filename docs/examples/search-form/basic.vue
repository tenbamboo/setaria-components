<template>
  <sc-search-form
    v-model="formValue"
    :schema="schema"
    label-width="130px"
    label-suffix=":"
    columns="2"
    :submitting="formSubmitting"
    @data-change="handlerChange"
  >
    <template #testCustomSlot="scope">
      <el-rate v-model="scope.testCustomSlot" />
    </template>
  </sc-search-form>
  {{ formValue }}
  <!-- <el-button @click="test1">test</el-button> -->
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ElRate } from 'element-plus'
import type { SchemaProps } from 'setaria-components'
const formValue = reactive({
  testString: null,
  testDesc: null,
  testNumber: null,
  testDate: null,
  testDateTime: null,
  testTime: null,
  testCurrency: null,
  testSelect1: null,
  testSelect2: null,
  testCustomSlot: 3,
})
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
const handlerChange = (key, value, model) => {
  console.log('change', key, value, model)
}
const formSubmitting = (model) => {
  // 这里模拟一个接口的返回
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({})
    }, 1000)
  })
}
</script>
