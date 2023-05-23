<template>
  <n-date-picker
    v-model:value="option.dataset"
    :panel="!!chartConfig.option.isPanel"
    :type="chartConfig.option.componentInteractEventKey"
    :style="`width:${w}px;`"
    @update:value="onChange"
  />
</template>

<script setup lang="ts">
import { PropType, toRefs, ref, shallowReactive, watch } from 'vue'
import dayjs from 'dayjs'
import { CreateComponentType } from '@/packages/index.d'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { useChartInteract } from '@/hooks'
import { InteractEventOn } from '@/enums/eventEnum'
import { ComponentInteractParamsEnum } from './interact'

const props = defineProps({
  chartConfig: {
    type: Object as PropType<CreateComponentType>,
    required: true
  }
})

const { w, h } = toRefs(props.chartConfig.attr)
const rangeDate = ref<number | number[]>()

const option = shallowReactive({
  dataset: props.chartConfig.option.dataset
})

// 监听事件改变
const onChange = (v: number | number[]) => {
  if (v instanceof Array) {
    // 存储到联动数据
    useChartInteract(
      props.chartConfig,
      useChartEditStore,
      {
        [ComponentInteractParamsEnum.DATE_START]: v[0] || dayjs().valueOf(),
        [ComponentInteractParamsEnum.DATE_END]: v[1] || dayjs().valueOf(),
        [ComponentInteractParamsEnum.DATE_RANGE]: `${v[0] || dayjs().valueOf()}-${v[1] || dayjs().valueOf()}`
      },
      InteractEventOn.CHANGE
    )
  } else {
    // 存储到联动数据
    useChartInteract(
      props.chartConfig,
      useChartEditStore,
      { [ComponentInteractParamsEnum.DATE]: v || dayjs().valueOf() },
      InteractEventOn.CHANGE
    )
  }
}

watch(
  () => props.chartConfig.option.dataset,
  (newData: number | number[]) => {
    option.dataset = newData
    // 关联目标组件首次请求带上默认内容
    onChange(newData)
  },
  {
    immediate: true
  }
)

// 手动更新
watch(
  () => props.chartConfig.option.differValue,
  (newData: number) => {
    if (props.chartConfig.option.differValue === 0) return
    if (typeof option.dataset === 'object') {
      option.dataset[0] = dayjs().add(newData, 'day').valueOf()
      option.dataset[1] = dayjs().add(newData, 'day').valueOf()
    } else {
      option.dataset = dayjs().add(newData, 'day').valueOf()
    }
    // 关联目标组件首次请求带上默认内容
    onChange(newData)
  },
  {
    immediate: true
  }
)
</script>

<style lang="scss" scoped>
@include deep() {
  .n-input {
    height: v-bind('h + "px"');
    display: flex;
    align-items: center;
  }
}
</style>
