import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { useREM } from './utils/flexible'
import libs from './libs'
import useTheme from './utils/theme'
import mDirective from './directives'
import './permission'

import './styles/index.scss'
import 'virtual:svg-icons-register'

// 设置 rem
useREM()
// 设置主题
useTheme()
const app = createApp(App)
app.use(libs)
app.use(mDirective)
app.use(store)
app.use(router)
app.mount('#app')
