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
  import { ref, watch } from 'vue'
  import { isMobileTerminal } from '@/utils/flexible'
  import { getPexelsList } from '@/api/pexels'
  import ItemVue from './item.vue'
  import { useStore } from 'vuex'

  const store = useStore()

  let query = {
    page: 1,
    size: 10
  }
  const isLoading = ref(false)
  const isFinished = ref(false)
  const pexelsList = ref([])
  const getPexelsData = async () => {
    if (isFinished.value) return
    if (pexelsList.value.length) {
      query.page++
    }
    // isLoading.value = true   // 已在列表组件中置为 true
    const res = await getPexelsList(query)
    if (query.page === 1) {
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

  /**
   * 通过此方法修改 query 请求参数，重新发起请求
   */
  const resetQuery = (newQuery) => {
    query = { ...query, ...newQuery }
    // 重置状态
    isFinished.value = false
    // 数据清空后会自动触发加载
    pexelsList.value = []
  }

  /**
   * 监听 currentCategory 的变化
   */
  watch(
    () => store.getters.currentCategory,
    (currentCategory) => {
      // 重置请求参数
      resetQuery({
        page: 1,
        categoryId: currentCategory.id
      })
    }
  )

  /**
   * 监听搜索内容项的变化
   */
  watch(
    () => store.getters.searchText,
    (val) => {
      // 重置请求参数
      resetQuery({
        page: 1,
        searchText: val
      })
    }
  )
</script>
