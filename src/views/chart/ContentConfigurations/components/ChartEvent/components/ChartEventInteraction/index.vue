<template>
  <n-collapse-item title="组件交互" name="1" v-if="interactActions.length">
    <template #header-extra>
      <n-button type="primary" tertiary size="small" @click.stop="evAddEventsFn">
        <template #icon>
          <n-icon>
            <add-icon />
          </n-icon>
        </template>
        新增
      </n-button>
    </template>

    <!-- 无数据 -->
    <div v-if="!targetData.events.interactEvents.length" class="no-data go-flex-center">
      <img :src="noData" alt="暂无数据" />
      <n-text :depth="3">暂无内容</n-text>
    </div>

    <n-card
      v-for="(item, cardIndex) in targetData.events.interactEvents"
      :key="cardIndex"
      class="n-card-shallow"
      size="small"
    >
      <n-space justify="space-between">
        <n-text>关联组件 - {{ cardIndex + 1 }}</n-text>
        <n-button type="error" secondary size="small" @click="evDeleteEventsFn(cardIndex)">
          <template #icon>
            <n-icon>
              <close-icon />
            </n-icon>
          </template>
        </n-button>
      </n-space>

      <n-divider style="margin: 10px 0" />

      <n-tag :bordered="false" type="success"> 选择目标组件 </n-tag>

      <setting-item-box name="触发事件" :alone="true">
        <n-input-group v-if="interactActions">
          <n-select
            class="select-type-options"
            v-model:value="item.interactOn"
            size="tiny"
            :options="interactActions"
          />
        </n-input-group>
      </setting-item-box>

      <setting-item-box name="绑定组件" :alone="true">
        <n-input-group>
          <n-select
            class="select-type-options"
            value-field="id"
            label-field="key"
            size="tiny"
            filterable
            v-model:value="item.interactComponents"
            :render-label="renderLabel"
            :options="fnEventsOptions()"
          />
        </n-input-group>
      </setting-item-box>

      <n-table v-if="fnDimensionsAndSource(item.interactOn).length" size="small" striped>
        <thead>
          <tr>
            <th v-for="item in ['参数', '说明']" :key="item">{{ item }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(cItem, index) in fnDimensionsAndSource(item.interactOn)" :key="index">
            <td>{{ cItem.value }}</td>
            <td>{{ cItem.label }}</td>
          </tr>
        </tbody>
      </n-table>

      <n-tag class="go-mt-3" :bordered="false" type="info"> 关联目标组件请求参数 </n-tag>

      <setting-item-box
        :name="requestParamsItem"
        v-for="requestParamsItem in requestParamsTypeList"
        :key="requestParamsItem"
      >
        <setting-item
          v-for="(ovlValue, ovlKey, index) in fnGetRequest(item.interactComponents, requestParamsItem)"
          :key="index"
          :name="`${ovlKey}`"
        >
          <n-select
            size="tiny"
            v-model:value="item.interactFn[ovlKey]"
            :options="fnDimensionsAndSource(item.interactOn)"
          ></n-select>
        </setting-item>
        <n-text
          v-show="JSON.stringify(fnGetRequest(item.interactComponents, requestParamsItem)) === '{}'"
          class="go-pt-1"
          depth="3"
        >
          暂无数据
        </n-text>
      </setting-item-box>
    </n-card>
  </n-collapse-item>
</template>

<script lang="ts" setup>
import { VNodeChild, computed } from 'vue'
import { SelectOption, SelectGroupOption } from 'naive-ui'
import { SettingItemBox, SettingItem, CollapseItem } from '@/components/Pages/ChartItemSetting'
import { useDesignStore } from '@/store/modules/designStore/designStore'
import { CreateComponentType, CreateComponentGroupType } from '@/packages/index.d'
import { RequestParamsTypeEnum } from '@/enums/httpEnum'
import { InteractEventOn } from '@/enums/eventEnum'
import { icon } from '@/plugins'
import { useTargetData } from '../../../hooks/useTargetData.hook'
import noData from '@/assets/images/canvas/noData.png'

const { CloseIcon, AddIcon } = icon.ionicons5

const designStore = useDesignStore()
const { targetData, chartEditStore } = useTargetData()

const requestParamsTypeList = [RequestParamsTypeEnum.PARAMS, RequestParamsTypeEnum.HEADER]

// 获取组件交互事件列表
const interactActions = computed(() => {
  const interactActions = targetData.value.interactActions
  if (!interactActions) return []
  return interactActions.map(value => ({
    label: value.interactName,
    value: value.interactType
  }))
})

// 获取组件事件
const option = computed(() => {
  return targetData.value.option
})

// 绑定组件数据request
const fnGetRequest = (id: string | undefined, key: RequestParamsTypeEnum) => {
  if (!id) return {}
  return chartEditStore.componentList[chartEditStore.fetchTargetIndex(id)]?.request.requestParams[key]
}

const fnDimensionsAndSource = (interactOn: InteractEventOn | undefined) => {
  if (!interactOn || !targetData.value.interactActions) return []
  const tableData = targetData.value.interactActions.find(item => {
    return item.interactType === interactOn
  })

  return tableData?.componentEmitEvents[option.value.dataset.type] || []
}

const renderLabel = (option: CreateComponentType | CreateComponentGroupType): VNodeChild => {
  return option.chartConfig.title
}

const fnEventsOptions = (): Array<SelectOption | SelectGroupOption> => {
  return chartEditStore.componentList.filter(item => {
    return item.id !== targetData.value.id
  })
}

const evAddEventsFn = () => {
  targetData.value.events.interactEvents.push({
    interactOn: undefined,
    interactComponents: undefined,
    interactFn: {}
  })
}

const evDeleteEventsFn = (index: number) => {
  targetData.value.events.interactEvents.splice(index, 1)
}

// 颜色
const themeColor = computed(() => {
  return designStore.getAppTheme
})
</script>

<style lang="scss" scoped>
.mill-chart-target-data {
  :deep(pre) {
    white-space: pre-wrap;
    word-wrap: break-word;
  }
}

.n-input-group {
  height: 30px;
}

.no-data {
  flex-direction: column;
  width: 100%;
  img {
    width: 120px;
  }
}

:deep(.n-base-selection .n-base-selection-label) {
  height: 32px;
}
</style>
