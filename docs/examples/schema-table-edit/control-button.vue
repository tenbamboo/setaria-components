<template>
  <el-button @click="canAdd = !canAdd">控制新增按钮</el-button>
  <el-button @click="canUpdate = !canUpdate">控制修改按钮</el-button>
  <el-button @click="canDelete = !canDelete">控制删除按钮</el-button>
  <el-button @click="canView = !canView">控制查看按钮</el-button>
  <el-button @click="isShowTopButton = !isShowTopButton"
    >控制顶部按钮</el-button
  >
  <sc-schema-table
    :data="dataList"
    :schema="schema"
    :label-mode="false"
    :show-oper="true"
    :show-column-setting="true"
    :selection-type="'checkbox'"
    :is-show-top-button="isShowTopButton"
    :can-add="canAdd"
    :can-update="canUpdate"
    :can-delete="canDelete"
    :can-view="canView"
    :can-update-row="canUpdateRow"
    :can-delete-row="canDeleteRow"
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
import { reactive, ref } from 'vue'
import type { SchemaProps } from 'setaria-components'

const canAdd = ref(true)
const canDelete = ref(true)
const canUpdate = ref(true)
const canView = ref(true)
const isShowTopButton = ref(true)

const canUpdateRow = (scope) => {
  console.log(scope)
  if (scope.row.id === 1) {
    return false
  }
  return true
}
const canDeleteRow = (scope) => {
  if (scope.row.id === 2) {
    return false
  }
  return true
}

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
    id: 1,
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
    id: 2,
    testString: 'a1',
    testDesc: 'a2',
    testNumber: 4,
    testDate: '2023-10-12',
    testDateTime: '2023-10-12 10:10:10',
    testCurrency: 11234,
    testSelect1: 't1',
    testCustomSlot: 2,
  },
  {
    id: 3,
    testString: 't2',
    testDesc: 't2',
    testNumber: 3,
    testDate: '2023-10-12',
    testDateTime: '2023-10-12 10:10:10',
    testCurrency: 11234,
    testSelect1: 't1',
    testCustomSlot: 3,
  },
  {
    id: 4,
    testString: 'a2',
    testDesc: 'a2',
    testNumber: 4,
    testDate: '2023-10-12',
    testDateTime: '2023-10-12 10:10:10',
    testCurrency: 11234,
    testSelect1: 't1',
    testCustomSlot: 4,
  },
]
</script>
