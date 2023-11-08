<template>
  <div :class="ns.b()">
    <slot />

    Hello would my component
  </div>
</template>

<script lang="ts" setup>
// import { computed } from 'vue'
import { useNamespace } from '@setaria-components/hooks'
// import { addUnit } from '@setaria-components/utils'
import { helloWouldProps } from './hello-would'

// import type { CSSProperties } from 'vue'

defineOptions({
  name: 'ScHelloWould',
})

const props = defineProps(helloWouldProps)

console.log('props', props)

// const { t } = useLocale()
const ns = useNamespace('empty')
// const emptyDescription = computed(
//   () => props.description || t('el.table.emptyText')
// )
// const imageStyle = computed<CSSProperties>(() => ({
//   width: addUnit(props.imageSize),
// }))
</script>
