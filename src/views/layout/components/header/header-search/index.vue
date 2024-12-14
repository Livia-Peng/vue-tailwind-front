<template>
  <div class="w-full guide-search">
    <m-search
      v-model="inputValue"
      @search="onSearchHandler"
      @clear="onSearchHandler">
      <template #dropdown>
        <div>dropdown</div>
      </template>
    </m-search>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { useStore } from 'vuex'
  // import hintVue from './hint.vue'
  // import historyVue from './history.vue'
  // import themeVue from './theme.vue'

  const inputValue = ref('')

  // 搜索的回调事件
  const onSearchHandler = (val) => {
    console.log('触发 searchText 变化')
    inputValue.value = val
    if (val) {
    }
  }
</script>

<style lang="scss" scoped></style>
