<template>
  <sc-schema-form
    ref="formRef"
    v-model="formValue"
    :schema="schema"
    :rules="rules"
    label-width="130px"
    label-suffix=":"
    columns="2"
  >
    <template #testCustomSlot="scope">
      <el-rate v-model="scope.testCustomSlot" />
    </template>
  </sc-schema-form>

  <el-button @click="submit">提交</el-button>
  {{ formValue }}
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ElRate } from 'element-plus'
import type { FormInstance } from 'element-plus'
import type { SchemaProps } from 'setaria-components'

const formRef = ref<FormInstance>()
const formValue = reactive({
  testCustomSlot: 3,
})
const schema = reactive<SchemaProps>({
  required: ['testString', 'testDesc', 'testNumber', 'testSelect1'],
  properties: {
    testString: {
      type: 'string',
      title: '测试String',
      minLength: 2,
      maxLength: 5,
    },
    testDesc: {
      type: 'string',
      title: '测试Desc',
      description: '我是描述内容',
    },
    testNumber: {
      type: 'number',
      title: '测试数值',
      minLength: 2,
      maxLength: 5,
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

const rules = {
  testString: [
    {
      validator: (rule: any, value: any, callback: any) => {
        if (!value?.includes('Hello')) {
          callback(new Error('需包含Hello字样'))
        }
        callback()
      },
      trigger: 'blur',
    },
  ],
  testNumber: [
    {
      validator: (rule: any, value: any, callback: any) => {
        if (value > 10 || value < 5) {
          callback(new Error('需小于10且大于5'))
        }
        callback()
      },
      trigger: 'change',
    },
  ],
}

const submit = () => {
  formRef.value?.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
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
