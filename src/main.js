import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { useREM } from './utils/flexible'
import libs from './libs'

import './styles/index.scss'
import 'virtual:svg-icons-register'

// 设置 rem
useREM()
const app = createApp(App)
app.use(libs)
app.use(store)
app.use(router)
app.mount('#app')
