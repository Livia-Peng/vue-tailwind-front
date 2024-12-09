import { computed } from 'vue'
import { commonConfig } from '@/constants'
import { useWindowSize } from '@vueuse/core'
const { width } = useWindowSize()

/**
 * 判断当前是否为移动设备
 */
export const isMobileTerminal = computed(() => {
  // return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
  //   navigator.userAgent
  // )
  return width.value < commonConfig.PC_DEVICE_WIDTH
})
