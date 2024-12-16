<template>
  <div>
    <m-infinite-list v-model="isLoading" :isFinished="isFinished" @onLoad="getPexelsData">
      <m-waterfall
        :data="pexelsList"
        :column="isMobileTerminal ? 2 : 5"
        :picturePreReading="false"
        class="w-full px-1.5">
        <template v-slot="{ item, width }">
          <ItemVue :data="item" :width="width" @click="onToPins"></ItemVue>
        </template>
      </m-waterfall>
    </m-infinite-list>
    <!-- 大图详情处理 -->
    <transition :css="false" @before-enter="beforeEnter" @enter="enter" @leave="leave">
      <pins-vue v-if="isVisiblePins" :id="currentPins.id" />
    </transition>
  </div>
</template>

<script setup>
  import { ref, watch } from 'vue'
  import { useStore } from 'vuex'
  import gsap from 'gsap'
  import { isMobileTerminal } from '@/utils/flexible'
  import { getPexelsList } from '@/api/pexels'
  import { useEventListener } from '@vueuse/core'
  import ItemVue from './item.vue'
  import pinsVue from '@/views/pins/pins.vue'

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

  const isVisiblePins = ref(false)
  const currentPins = ref({})
  const onToPins = (item) => {
    // 修改浏览器的 url
    history.pushState(null, null, `/pins/${item.id}`)
    currentPins.value = item
    isVisiblePins.value = true
  }

  /**
   * 监听浏览器后退按钮事件
   */
  useEventListener(window, 'popstate', () => {
    isVisiblePins.value = false
  })

  /**
   * 进入动画开始前
   */
  const beforeEnter = (el) => {
    gsap.set(el, {
      scaleX: 0,
      scaleY: 0,
      transformOrigin: '0 0',
      translateX: currentPins.value.localtion?.translateX,
      translateY: currentPins.value.localtion?.translateY,
      opacity: 0
    })
  }
  /**
   * 进入动画执行中
   */
  const enter = (el, done) => {
    gsap.to(el, {
      duration: 0.3,
      scaleX: 1,
      scaleY: 1,
      opacity: 1,
      translateX: 0,
      translateY: 0,
      onComplete: done
    })
  }
  /**
   * 离开动画执行中
   */
  const leave = (el, done) => {
    gsap.to(el, {
      duration: 0.3,
      scaleX: 0,
      scaleY: 0,
      x: currentPins.value.localtion?.translateX,
      y: currentPins.value.localtion?.translateY,
      opacity: 0
    })
  }
</script>
