import { useIntersectionObserver } from '@vueuse/core'

// 图片懒加载：在用户无法看到图片时，不加载图片，在用户可以看到图片后加载图片
// 如何判断用户是否看到了图片：useIntersectionObserver
// 如何做到不加载图片（网络）：当用户不可见时，把图片网络地址默认替换为非网络地址；当用户可见时，替换成网络地址
export default {
  mounted(el) {
    // 1. 拿到当前 img 标签的 src
    const imgSrc = el.src
    // 2. 把 img 标签的 src 替换为本地地址
    el.src = ''

    const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
      if (isIntersecting) {
        el.src = imgSrc
        stop()
      }
    })
  }
}
