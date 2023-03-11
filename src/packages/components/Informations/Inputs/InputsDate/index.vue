<template>
  <div class="mill-date-box">
    <div :style="`width:${w}px; height:${h}px;`">
      <n-date-picker v-model:value="rangeDate" :type="option.dataset.type" @update:value="onChange" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, toRefs, ref, shallowReactive, watch } from 'vue'
import { CreateComponentType } from '@/packages/index.d'
import { useChartDataFetch } from '@/hooks'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { option as configOption } from './config'
import { useChartInteract } from '@/hooks'
import dayjs from 'dayjs'

const props = defineProps({
  chartConfig: {
    type: Object as PropType<CreateComponentType & typeof option>,
    required: true
  }
})

const { w, h } = toRefs(props.chartConfig.attr)
const rangeDate = ref()

const option = shallowReactive({
  dataset: configOption.dataset
})

const onChange = (v: number | number[]) => {
  if (v instanceof Array) {
    const dateStart = dayjs(v[0]).format('YYYY-MM-DD')
    const dateEnd = dayjs(v[1]).format('YYYY-MM-DD')
    useChartInteract(props.chartConfig, useChartEditStore, { dateStart, dateEnd }, 'change')
  } else {
    const date = dayjs(v).format('YYYY-MM-DD')
    useChartInteract(props.chartConfig, useChartEditStore, { date }, 'change')
  }
}

// 手动更新
watch(
  () => props.chartConfig.option.dataset,
  (newData: any) => {
    option.dataset = newData
    const { range, count } = newData
    if (!range) return
    if (newData.range instanceof Array) {
      const countDate: number[] = [
        dayjs(range[0]).add(count, 'day').valueOf(),
        dayjs(range[1]).add(count, 'day').valueOf()
      ]
      rangeDate.value = countDate
    } else {
      const countDate: number = dayjs(range).add(count, 'day').valueOf()
      rangeDate.value = countDate
    }
  },
  {
    immediate: true,
    deep: true
  }
)

// 预览更新
useChartDataFetch(props.chartConfig, useChartEditStore)
</script>

<style lang="scss" scoped>
.mill-text-box {
  display: flex;
}
:deep(.n-input) {
  height: v-bind('h + "px"');
  display: flex;
  align-items: center;
}
</style>
