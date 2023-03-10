<template>
  <n-card v-for="(item, indexs) in targetData.events.eventsFn" :key="indexs" class="n-card-shallow">
    <RowDeleteIcon class="edit-text" @click="evDeleteEventsFn(indexs)" />
    <setting-item-box name="触发事件" :alone="true">
      <n-input-group v-if="option.eventsApi">
        <n-select class="select-type-options" v-model:value="item.on" :options="option.eventsApi" />
      </n-input-group>
    </setting-item-box>

    <n-table striped>
      <thead>
        <tr>
          <th v-for="item in ['参数', '说明']" :key="item">{{ item }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(cItem, index) in fnDimensionsAndSource(item.on)" :key="index">
          <td>{{ cItem.value }}</td>
          <td>{{ cItem.label }}</td>
        </tr>
      </tbody>
    </n-table>

    <setting-item-box name="绑定组件" :alone="true">
      <n-input-group>
        <n-select
          class="select-type-options"
          value-field="id"
          label-field="key"
          v-model:value="item.components"
          :render-label="renderLabel"
          :options="fnEventsOptions()"
        />
      </n-input-group>
    </setting-item-box>

    <CollapseItem name="请求数据绑定" :expanded="false">
      <SettingItemBox name="Params">
        <SettingItem
          v-for="(ovlValue, ovlKey, index) in fnGetRequest(item.components, 'Params')"
          :key="ovlKey"
          :name="`${ovlKey}`"
        >
          <n-select size="small" v-model:value="item.fn[ovlKey]" :options="fnDimensionsAndSource(item.on)"></n-select>
        </SettingItem>
      </SettingItemBox>
      <SettingItemBox name="Header">
        <SettingItem
          v-for="(ovlValue, ovlKey, index) in fnGetRequest(item.components, 'Header')"
          :key="ovlKey"
          :name="`${ovlKey}`"
        >
          <n-select size="small" v-model:value="item.fn[ovlKey]" :options="fnDimensionsAndSource(item.on)"></n-select>
        </SettingItem>
      </SettingItemBox>
    </CollapseItem>
  </n-card>
  <n-button v-if="option.eventsApi" class="add-events" ghost @click="ev_addEventsFn"> 添加交互 </n-button>
</template>

<script lang="ts" setup>
import { ref, VNodeChild, h, computed, watch, toRefs, toRaw, onMounted } from 'vue'
import { SelectOption, SelectGroupOption } from 'naive-ui'
import { SettingItemBox, SettingItem, CollapseItem } from '@/components/Pages/ChartItemSetting'

import { useDesignStore } from '@/store/modules/designStore/designStore'
import { useTargetData } from '../../../hooks/useTargetData.hook'
import { CreateComponentType, CreateComponentGroupType } from '@/packages/index.d'

import { icon } from '@/plugins'
const { RowDeleteIcon } = icon.carbon

const designStore = useDesignStore()
const { targetData, chartEditStore } = useTargetData()
const { componentList } = toRefs(chartEditStore)

//computed： 获取组件eventsApi
const option = computed(() => {
  return chartEditStore.componentList[chartEditStore.fetchTargetIndex()].option
})
// 绑定组件数据request
const fnGetRequest = (id: string | undefined, key: 'Params' | 'Header') => {
  if (!id) return {}
  return chartEditStore.componentList[chartEditStore.fetchTargetIndex(id)]?.request.requestParams[key]
}

const fnDimensionsAndSource = (on: any) => {
  if (!on || !option.value.eventsApi) return []
  const tableData = option.value.eventsApi.find((item: { value: string }) => {
    return item.value === on
  })

  return tableData[option.value.dataset.type]
}

const renderLabel = (option: CreateComponentType | CreateComponentGroupType): VNodeChild => {
  return option.chartConfig.title
}

const fnEventsOptions = (): Array<SelectOption | SelectGroupOption> => {
  return chartEditStore.componentList.filter(item => {
    return item.id !== targetData.value.id
  })
}

const ev_addEventsFn = () => {
  targetData.value.events.eventsFn.push({
    on: undefined,
    components: undefined,
    fn: {}
  })
}

const evDeleteEventsFn = (index: number) => {
  targetData.value.events.eventsFn.splice(index, 1)
}

// 颜色
const themeColor = computed(() => {
  return designStore.getAppTheme
})
</script>

<style lang="scss" scoped>
.n-card-shallow {
  margin-top: 1rem;
  .edit-text {
    width: 18px;
    height: 18px;
    position: absolute;
    top: 5px;
    right: 5px;
    &:hover {
      cursor: pointer;
      color: v-bind('themeColor');
    }
  }
  &.n-card {
    // .mill-background-filter();
    :deep(.n-card__content) {
      padding: 10px;
    }
  }
  &:hover {
    border-color: v-bind('themeColor');
    .edit-text {
      opacity: 1;
    }
  }
}
.mill-chart-target-data {
  :deep(pre) {
    white-space: pre-wrap;
    word-wrap: break-word;
  }
}
.add-events {
  width: 100%;
  height: 32px;
  margin-top: 1rem;
}
.n-input-group {
  height: 30px;
}
:deep(.n-base-selection .n-base-selection-label) {
  height: 32px;
}
</style>
