<template>
  <MobileNavigationVue v-if="isMobileTerminal"></MobileNavigationVue>
  <PcNavigationVue v-else></PcNavigationVue>
</template>

<script setup>
  import { useStore } from 'vuex'
  import { isMobileTerminal } from '@/utils/flexible'
  import MobileNavigationVue from './mobile/index.vue'
  import PcNavigationVue from './pc/index.vue'

  const store = useStore()
  // 触发 category 数据获取动作
  store.dispatch('category/useCategoryData')
</script>
