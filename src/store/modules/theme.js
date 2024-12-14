import { commonConfig } from '@/constants'

export default {
  namespaced: true,
  state: () => ({
    // 主题模式
    themeType: commonConfig.themeTypes.LIGHT
  }),
  mutations: {
    /**
     *  切换主题模式
     */
    changeThemeType(state, newTheme) {
      state.themeType = newTheme
    }
  }
}
