<template>
  我是一个文本
  <sc-hello-would p1="unclosable alert"> 我是内部的内容 </sc-hello-would>

  <el-button>sdfsdf</el-button>
</template>

<script lang="ts" setup>
const hello = () => {
  // eslint-disable-next-line no-alert
  alert('Hello World!')
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
