import { isMobileTerminal } from '@/utils/flexible'

export default {
  currentCategory: (state) => state.app.currentCategory,
  searchText: (state) => state.app.searchText,
  currentCategoryIndex: (state, getters) => {
    return getters.categorys.findIndex((item) => item.id === getters.currentCategory.id)
  },
  categorys: (state) => state.category.categorys,
  historys: (state) => state.search.historys,
  themeType: (state) => state.theme.themeType
}
