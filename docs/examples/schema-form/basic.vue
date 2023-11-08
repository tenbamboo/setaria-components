<template>
  <sc-schema-form
    v-model="formValue"
    :schema="schema"
    label-width="150px"
    label-suffix=":"
  >
    <template #testCustomSlot="scope">
      <el-rate v-model="scope.testCustomSlot" />
    </template>
  </sc-schema-form>
  {{ formValue }}
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ElRate } from 'element-plus'
import type { SchemaProperties } from 'setaria-components'
const hello = () => {
  // eslint-disable-next-line no-alert
  alert('Hello World!')
}
const formValue = reactive({
  testCustomSlot: '3',
})
const schema = {
  required: [],
  properties: {
    testString: {
      type: 'string',
      title: '测试String',
    } as SchemaProperties,
    testDesc: {
      type: 'string',
      title: '测试Desc',
      description: '我是描述内容',
    } as SchemaProperties,
    testNumber: {
      type: 'number',
      title: '测试数值',
      scale: 2,
    } as SchemaProperties,
    testDate: {
      type: 'string',
      format: 'date',
      title: '测试日期',
    } as SchemaProperties,
    testDateTime: {
      type: 'string',
      format: 'datetime',
      title: '测试日期时间',
    } as SchemaProperties,
    testTime: {
      type: 'string',
      format: 'time',
      title: '测试时间',
    } as SchemaProperties,
    testCurrency: {
      type: 'number',
      format: 'currency',
      title: '测试货币',
      scale: 2,
    } as SchemaProperties,
    testSelect1: {
      type: 'string',
      title: '测试下拉1-单选类型',
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
    } as SchemaProperties,
    testSelect2: {
      type: 'number',
      title: '测试下拉2-多选类型',
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
    } as SchemaProperties,
    testCustomSlot: {
      type: 'string',
      title: '测试自定义插槽',
    } as SchemaProperties,
  },
}
</script>
<style scoped>
.el-alert {
  margin: 20px 0 0;
}

.el-alert:first-child {
  margin: 0;
}
</style>
