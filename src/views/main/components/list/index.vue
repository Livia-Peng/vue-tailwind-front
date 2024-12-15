<template>
  <div>
    <m-infinite-list v-model="isLoading" :isFinished="isFinished" @onLoad="getPexelsData">
      <m-waterfall
        :data="pexelsList"
        :column="isMobileTerminal ? 2 : 5"
        :picturePreReading="false"
        class="w-full px-1.5">
        <template v-slot="{ item, width }">
          <ItemVue :data="item" :width="width"></ItemVue>
        </template>
      </m-waterfall>
    </m-infinite-list>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { isMobileTerminal } from '@/utils/flexible'
  import { getPexelsList } from '@/api/pexels'
  import ItemVue from './item.vue'

  const pageInfo = {
    page: 1,
    size: 5
  }
  const isLoading = ref(false)
  const isFinished = ref(false)
  const pexelsList = ref([])
  const getPexelsData = async () => {
    if (isFinished.value) return
    if (pexelsList.value.length) {
      pageInfo.page++
    }
    // isLoading.value = true   // 已在列表组件中置为 true
    const res = await getPexelsList(pageInfo)
    if (pageInfo.page === 1) {
      pexelsList.value = res.list
    } else {
      pexelsList.value = pexelsList.value.concat(res.list)
    }
    if (pexelsList.value.length === res.total) {
      isFinished.value = true
    }
    isLoading.value = false
  }
  // getPexelsData()  // onload 触发
</script>
