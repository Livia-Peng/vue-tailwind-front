import { h, render } from 'vue'
import confirmComponent from './index.vue'

/**
 *
 * @param {*} title 标题
 * @param {*} content 文本
 * @param {*} cancelText 取消按钮文本
 * @param {*} confirmText 确定按钮文本
 * @returns
 */
export const confirm = (title, content, cancelText = '取消', confirmText = '确定') => {
  return new Promise((resolve, reject) => {
    // 允许只传递 content
    if (title && !content) {
      content = title
      title = ''
    }

    // 1. vnode
    const vnode = h(confirmComponent, {
      title,
      content,
      cancelText,
      confirmText,
      // 确定按钮事件
      confirmHandler: () => {
        resolve()
      },
      // 取消按钮事件
      cancelHandler: () => {
        reject(new Error('取消按钮点击'))
      },
      // 关闭弹层事件
      close: () => {
        render(null, document.body)
      }
    })

    // 2. render
    render(vnode, document.body)
  })
}
