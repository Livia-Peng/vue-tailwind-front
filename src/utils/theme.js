import store from '@/store'
import { watch } from 'vue'
import { commonConfig } from '@/constants'

/**
 * 监听系统主题变更
 */
let matchMedia
const watchSystemThemeChange = () => {
  // 仅需初始化一次即可
  if (matchMedia) return
  matchMedia = window.matchMedia('(prefers-color-scheme: dark)')
  // 监听主题变更
  matchMedia.onchange = function () {
    changeTheme(commonConfig.themeTypes.SYSTEM)
  }
}

/**
 * 变更主题
 * @param {*} theme 主题的标记常量
 */
const changeTheme = (theme) => {
  // html 的 class
  let themeClassName = ''
  switch (theme) {
    case commonConfig.themeTypes.SYSTEM:
      watchSystemThemeChange()
      themeClassName = matchMedia.matches ? 'dark' : 'light'
      break
    case commonConfig.themeTypes.DARK:
      themeClassName = 'dark'
      break
    case commonConfig.themeTypes.LIGHT:
    default:
      themeClassName = 'light'
      break
  }
  // 修改 html 的 class
  document.querySelector('html').className = themeClassName
}

/**
 * 初始化主题
 */
export default () => {
  watch(() => store.getters.themeType, changeTheme, {
    // 初始执行一次
    immediate: true
  })
}
