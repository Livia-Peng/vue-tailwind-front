<template>
  <div>
    <m-waterfall :data="pexelsList" :column="isMobileTerminal ? 2 : 5" :picturePreReading="false" class="w-full px-1.5">
      <template v-slot="{ item, width }">
        <ItemVue :data="item" :width="width"></ItemVue>
      </template>
    </m-waterfall>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { isMobileTerminal } from '@/utils/flexible'
  import { getPexelsList } from '@/api/pexels'
  import ItemVue from './item.vue'

  const pageInfo = {
    page: 1,
    size: 10
  }
  const pexelsList = ref([])
  const getPexelsData = async () => {
    const res = await getPexelsList(pageInfo)
    pexelsList.value = res.list
  }
  getPexelsData()
</script>
