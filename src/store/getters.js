import { isMobileTerminal } from '@/utils/flexible'

export default {
  currentCategory: (state) => state.app.currentCategory,
  currentCategoryIndex: (state, getters) => {
    return getters.categorys.findIndex((item) => item.id === getters.currentCategory.id)
  },
  categorys: (state) => state.category.categorys,
  themeType: (state) => state.theme.themeType
}
