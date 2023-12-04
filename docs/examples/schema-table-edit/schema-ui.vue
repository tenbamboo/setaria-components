<template>
  点击完以下按钮，请再详情表单中查看效果
  <br />
  <el-button @click="setNumberVisible">设置数值项显示/隐藏</el-button>
  <el-button @click="setStringDisabled">设置测试String项可用/不可用</el-button>
  <el-button @click="setDescReadonly">设置测试Desc项只读</el-button>
  <el-button @click="setDateType">设置测试Date项的日期类型</el-button>

  <el-button @click="setStringColumnVisible"
    >设置测试String项表格项显示/隐藏</el-button
  >
  <el-button @click="setStringFormItemVisible"
    >设置测试String项详情表单项显示/隐藏</el-button
  >
  <br />

  <sc-schema-table
    :data="dataList"
    :schema="schema"
    :ui-schema="uiSchema"
    :label-mode="false"
    :show-oper="true"
    :show-column-setting="true"
    :selection-type="'checkbox'"
    :form-rules="formRules"
    :form-save="handlerFormSave"
  >
    <template #testCustomSlot="scope">
      <div>
        <!-- 编辑模式下 -->
        <el-rate
          v-if="scope.status === 'edit'"
          v-model="scope.data.testCustomSlot"
        />
        <!-- 默认显示模式 -->
        <span v-if="scope.status === 'default'">
          {{ scope.data.testCustomSlot }}颗星
        </span>
      </div>
    </template>
  </sc-schema-table>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { ElRate } from 'element-plus'
import type {
  //   SchemaProperties,
  SchemaProps,
  SchemaUiPropsByTable,
} from 'setaria-components'
const formRules = {
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

const handlerFormSave = (data, operFlag) => {
  // 按照套路来说这里应该调用接口啦
  console.log('handlerFormSave', data, operFlag)
  return new Promise((resolve, reject) => {
    resolve(true)
  })
}
const schema = reactive<SchemaProps>({
  required: ['testString', 'testDesc'],
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
    testCustomSlot: 1,
  },
  {
    testString: 'a1',
    testDesc: 'a2',
    testNumber: 4,
    testDate: '2023-10-12',
    testDateTime: '2023-10-12 10:10:10',
    testCurrency: 11234,
    testSelect1: 't1',
    testCustomSlot: 2,
  },
]

const uiSchema = reactive<Record<string, SchemaUiPropsByTable>>({
  testString: {
    disabled: true,
    columnVisible: true,
    formItemVisible: true,
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
})

const setNumberVisible = () => {
  uiSchema.testNumber.visible = !uiSchema.testNumber.visible
}

const setCustomSlotVisible = () => {
  uiSchema.testCustomSlot.visible = !uiSchema.testCustomSlot.visible
}

const setStringDisabled = () => {
  uiSchema.testString.disabled = !uiSchema.testString.disabled
}

const setDescReadonly = () => {
  uiSchema.testDesc.readonly = !uiSchema.testDesc.readonly
}

const setDateType = () => {
  if (uiSchema.testDate.options?.type === 'date') {
    uiSchema.testDate.options.type = 'daterange'
  } else {
    uiSchema.testDate.options.type = 'date'
  }
}

const setStringColumnVisible = () => {
  uiSchema.testString.columnVisible = !uiSchema.testString.columnVisible
}

const setStringFormItemVisible = () => {
  uiSchema.testString.formItemVisible = !uiSchema.testString.formItemVisible
}
</script>
