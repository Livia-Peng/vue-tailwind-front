import { createStore } from 'vuex'
import category from './modules/category'
import theme from './modules/theme'
import app from './modules/app'
import search from './modules/search'
import getters from './getters'
import createPersistedState from 'vuex-persistedstate'

const store = createStore({
  getters,
  modules: {
    search,
    app,
    theme,
    category
  },
  plugins: [
    createPersistedState({
      // 保存到 localStorage 中的 key
      key: 'vue-front',
      // 需要保存的模块
      paths: ['category', 'theme', 'search']
    })
  ]
})

export default store
