import { h, render } from 'vue'
import messageComponent from './index.vue'

export const message = (type, content, duration = 3000) => {
  // 1. 返回 vnode
  const vnode = h(messageComponent, {
    type,
    content,
    duration,
    destroy: () => {
      // 3. message 销毁（动画结束时的回调）
      render(null, document.body)
    }
  })
  // 2. render
  render(vnode, document.body)
}
