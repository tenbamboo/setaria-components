import { computed } from 'vue'
// import { useRoute } from 'vitepress'
import { useLang } from '../composables/lang'
import { BASE_URL } from '../constant'

export const useBaseUrl = () => {
  // const route = useRoute()
  return computed(() => {
    const lang = useLang()
    return `${BASE_URL}/${lang}`
  })
}
