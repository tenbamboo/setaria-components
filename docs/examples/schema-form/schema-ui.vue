<template>
  <sc-schema-form
    v-model="formValue"
    :schema="schema"
    :ui-schema="uiScehma"
    label-width="130px"
    label-suffix=":"
    columns="3"
  >
    <template #testCustomSlot="scope">
      <el-rate
        v-if="uiScehma.testCustomSlot.visible"
        v-model="scope.testCustomSlot"
      />
    </template>
  </sc-schema-form>
  {{ formValue }}
  <br />
  <el-button @click="setNumberVisible">设置数值项显示/隐藏</el-button>
  <el-button @click="setStringDisabled">设置测试String项可用/不可用</el-button>
  <el-button @click="setDescReadonly">设置测试Desc项只读</el-button>
  <el-button @click="setDateType">设置测试Date项的日期类型</el-button>

  <br />
  <br />
  <el-button @click="setCustomSlotVisible">设置自定义插槽/隐藏</el-button>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ElRate } from 'element-plus'
import type {
  //   SchemaProperties,
  SchemaProps,
  SchemaUiProps,
} from 'setaria-components'
const formValue = reactive({
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
const uiScehma = reactive<Record<string, SchemaUiProps>>({
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
})

const setNumberVisible = () => {
  uiScehma.testNumber.visible = !uiScehma.testNumber.visible
}

const setCustomSlotVisible = () => {
  uiScehma.testCustomSlot.visible = !uiScehma.testCustomSlot.visible
}

const setStringDisabled = () => {
  uiScehma.testString.disabled = !uiScehma.testString.disabled
}

const setDescReadonly = () => {
  uiScehma.testDesc.readonly = !uiScehma.testDesc.readonly
}

const setDateType = () => {
  if (uiScehma.testDate.options?.type === 'date') {
    uiScehma.testDate.options.type = 'daterange'
  } else {
    uiScehma.testDate.options.type = 'date'
  }
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
