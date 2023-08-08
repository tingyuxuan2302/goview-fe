<template>
  <n-button type="primary" :width="w" :height="h" @click="handleClick">
    Primary
  </n-button>
</template>
<script setup lang="ts">
import { PropType, toRefs } from 'vue'
import { CreateComponentType } from '@/packages/index.d'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { useChartInteract } from '@/hooks'
import { InteractEventOn } from '@/enums/eventEnum'
import { ComponentInteractParamsEnum } from './interact'

const props = defineProps({
  chartConfig: {
    type: Object as PropType<CreateComponentType>,
    required: true,
  },
})

const { w, h } = toRefs(props.chartConfig.attr)
// const { colors, dur, endWidth, lineHeight } = toRefs(props.chartConfig.option)

const handleClick = (e: Event) => {
  console.log("-----e-----", e)
  // 存储到联动数据
  useChartInteract(
    props.chartConfig,
    useChartEditStore,
    { [ComponentInteractParamsEnum.DATA]: e },
    InteractEventOn.CHANGE
  )
}
</script>
<style lang='less' scoped></style>