import { ref, provide, onMounted, onUnmounted } from 'vue'
import { usePreviewFitScale, usePreviewScrollYScale, usePreviewScrollXScale, usePreviewFullScale } from '@/hooks/index'
import type { ChartEditStorageType } from '../index.d'
import { PreviewScaleEnum } from '@/enums/styleEnum'

export const SCALE_KEY = 'scale-value'

export const useScale = (localStorageInfo: ChartEditStorageType) => {
  const entityRef = ref()
  const previewRef = ref()
  const width = ref(localStorageInfo.editCanvasConfig.width)
  const height = ref(localStorageInfo.editCanvasConfig.height)
  const scaleRef = ref({ width: 1, height: 1 })

  provide(SCALE_KEY, scaleRef);

  const updateScaleRef = (scale: { width: number; height: number }) => {
    // 这里需要解构，保证赋值给scaleRef的为一个新对象
    // 因为scale始终为同一引用
    scaleRef.value = { ...scale }
  }

  // 屏幕适配
  onMounted(() => {
    switch (localStorageInfo.editCanvasConfig.previewScaleType) {
      case PreviewScaleEnum.FIT: (() => {
        const { calcRate, windowResize, unWindowResize } = usePreviewFitScale(
          width.value as number,
          height.value as number,
          previewRef.value,
          updateScaleRef
        )
        calcRate()
        windowResize()
        onUnmounted(() => {
          unWindowResize()
        })
      })()
        break;
      case PreviewScaleEnum.SCROLL_Y: (() => {
        const { calcRate, windowResize, unWindowResize } = usePreviewScrollYScale(
          width.value as number,
          height.value as number,
          previewRef.value,
          (scale) => {
            const dom = entityRef.value
            dom.style.width = `${width.value * scale.width}px`
            dom.style.height = `${height.value * scale.height}px`
            updateScaleRef(scale)
          }
        )
        calcRate()
        windowResize()
        onUnmounted(() => {
          unWindowResize()
        })
      })()

        break;
      case PreviewScaleEnum.SCROLL_X: (() => {
        const { calcRate, windowResize, unWindowResize } = usePreviewScrollXScale(
          width.value as number,
          height.value as number,
          previewRef.value,
          (scale) => {
            const dom = entityRef.value
            dom.style.width = `${width.value * scale.width}px`
            dom.style.height = `${height.value * scale.height}px`
            updateScaleRef(scale)
          }
        )
        calcRate()
        windowResize()
        onUnmounted(() => {
          unWindowResize()
        })
      })()

        break;
      case PreviewScaleEnum.FULL: (() => {
        const { calcRate, windowResize, unWindowResize } = usePreviewFullScale(
          width.value as number,
          height.value as number,
          previewRef.value,
          updateScaleRef
        )
        calcRate()
        windowResize()
        onUnmounted(() => {
          unWindowResize()
        })
      })()
        break;
    }
  })

  return {
    entityRef,
    previewRef,
    scaleRef
  }
}
