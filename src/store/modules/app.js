import { commonConfig } from '@/constants'

// 不做缓存
export default {
  namespaced: true,
  state: () => ({
    // 当前选中的分类
    currentCategory: commonConfig.ALL_CATEGORY_ITEM,
    // 搜索的文本
    searchText: '',
    // 路由跳转类型
    routerType: 'none'
  }),
  mutations: {
    /**
     * 切换选中分类
     */
    changeCurrentCategory(state, newCategory) {
      state.currentCategory = newCategory
    },
    /**
     * 修改 searchText
     */
    changeSearchText(state, newSearchText) {
      state.searchText = newSearchText
    },
    /**
     * 修改 routerType
     */
    changeRouterType(state, newType) {
      state.routerType = newType
    }
  }
}
