import { getCategory } from '@/api/category'
import { commonConfig } from '@/constants'

// navigationBar 展示的数据源
export default {
  // 独立作用域
  namespaced: true,
  state: () => ({
    categorys: [commonConfig.ALL_CATEGORY_ITEM, ...commonConfig.CATEGORY_NOMAR_DATA]
  }),
  mutations: {
    setCategorys(state, categorys) {
      state.categorys = [commonConfig.ALL_CATEGORY_ITEM, ...categorys]
    }
  },
  actions: {
    // 获取数据
    async useCategoryData(context) {
      const { categorys } = await getCategory()
      context.commit('setCategorys', categorys)
    }
  }
}
