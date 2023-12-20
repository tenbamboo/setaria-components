<script setup lang="ts">
import { computed } from 'vue'
import { inBrowser, useData } from 'vitepress'

// import VPNavbarSearch from './navbar/vp-search.vue'
import VPNavbarMenu from './navbar/vp-menu.vue'
// import VPNavbarThemeToggler from './navbar/vp-theme-toggler.vue'
// import VPNavbarTranslation from './navbar/vp-translation.vue'
// import VPNavbarSocialLinks from './navbar/vp-social-links.vue'
import VPNavbarHamburger from './navbar/vp-hamburger.vue'

defineProps<{
  fullScreen: boolean
}>()

defineEmits(['toggle'])

// const { theme, page } = useData()

const currentLink = computed(() => {
  // if (!inBrowser) {
  //   return `/setaria-components/zh-CN/`
  // }
  // const existLangIndex = theme.value.langs.findIndex((lang) =>
  //   window?.location?.pathname.includes(`/${lang}`)
  // )

  return '/setaria-components/zh-CN/'
})
</script>

<template>
  <div class="navbar-wrapper">
    <div class="header-container">
      <div class="logo-container">
        <a :href="currentLink">
          <img class="logo" src="/images/logo.png" />Setaria Components
        </a>
      </div>
      <div class="content">
        <!-- <VPNavbarSearch class="search" :options="theme.agolia" multilang /> -->
        <VPNavbarMenu class="menu" />
        <!-- <VPNavbarThemeToggler class="theme-toggler" /> -->
        <!-- <VPNavbarTranslation class="translation" />
        <VPNavbarSocialLinks class="social-links" /> -->
        <VPNavbarHamburger
          :active="fullScreen"
          class="hamburger"
          @click="$emit('toggle')"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.logo-container {
  display: flex;
  align-items: center;
  height: var(--header-height);

  > a {
    height: 28px;
    width: 255px;
    display: flex;
    align-items: center;
  }

  .logo {
    position: relative;
    margin-right: 5px;
    width: 38px;
  }
}

.dark {
  .logo {
    filter: drop-shadow(2px 2px 6px #409eff);
  }
}
</style>
