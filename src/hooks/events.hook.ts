import { computed, toRefs } from 'vue'
import { CreateComponentType } from '@/packages/index.d'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'

// 获取类型
type ChartEditStoreType = typeof useChartEditStore

// Params 参数修改触发api更新图表请求
export const eventsCreate = (chartConfig: CreateComponentType, useChartEditStore: ChartEditStoreType, param: { [name: string]: string }, onEvevnt: string) => {
  const chartEditStore = useChartEditStore()
  const { eventsFn } = chartConfig.events
  const fnOnEvevnt = eventsFn.filter((item) => {
    return item.on === onEvevnt
  }) || []
  if (fnOnEvevnt.length === 0) return
  fnOnEvevnt.forEach((item) => {
    const index = chartEditStore.fetchTargetIndex(item.components)
    const { Params } = toRefs(chartEditStore.componentList[index].request.requestParams)
    Object.keys(item.fn).forEach((key) => {
      Params.value[key] = param[item.fn[key]]
    })
  })
}