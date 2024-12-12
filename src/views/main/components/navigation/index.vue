<template>
  <MobileNavigationVue
    v-if="isMobileTerminal"
    :data="categoryData"></MobileNavigationVue>
</template>

<script setup>
  import { ref } from 'vue'
  import { isMobileTerminal } from '@/utils/flexible'
  import MobileNavigationVue from './mobile/index.vue'
  import { getCategory } from '@/api/category'
  import { commonConfig } from '@/constants'

  const categoryData = ref([])
  const getCategoryData = async () => {
    const { categorys } = await getCategory()
    categoryData.value = [commonConfig.ALL_CATEGORY_ITEM].concat(
      categorys || []
    )
  }
  getCategoryData()
</script>
