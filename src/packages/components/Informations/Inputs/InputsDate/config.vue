<template>
  <collapse-item name="展示方式" :expanded="true">
    <setting-item-box name="选择方式">
      <n-select v-model:value="optionData.isPanel" size="small" :options="panelOptions" />
    </setting-item-box>
  </collapse-item>

  <collapse-item name="时间配置" :expanded="true">
    <setting-item-box name="基础">
      <setting-item name="类型">
        <n-select v-model:value="optionData.componentInteractEventKey" size="small" :options="datePickerTypeOptions" />
      </setting-item>
    </setting-item-box>

    <setting-item-box name="默认值" :alone="true">
      <n-date-picker size="small" v-model:value="optionData.dataset" :type="optionData.componentInteractEventKey" />
    </setting-item-box>

    <setting-item-box :alone="true">
      <template #name>
        <n-text>动态</n-text>
        <n-tooltip trigger="hover">
          <template #trigger>
            <n-icon size="21" :depth="3">
              <help-outline-icon></help-outline-icon>
            </n-icon>
          </template>
          <n-text>动态值不为0时，默认值:取当天时间相加当前值</n-text>
        </n-tooltip>
      </template>
      <n-input-number v-model:value="optionData.differValue" class="input-num-width" size="small" :min="-40" :max="40">
        <template #suffix> 天 </template>
      </n-input-number>
    </setting-item-box>
  </collapse-item>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { icon } from '@/plugins'
import { CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
import { option } from './config'
import { ComponentInteractEventEnum } from './interact'

const { HelpOutlineIcon } = icon.ionicons5

const props = defineProps({
  optionData: {
    type: Object as PropType<typeof option>,
    required: true
  }
})

const panelOptions = [
  {
    label: '下拉展示',
    value: 0
  },
  {
    label: '面板展示',
    value: 1
  }
]

const datePickerTypeOptions = [
  {
    label: '日期',
    value: ComponentInteractEventEnum.DATE
  },
  {
    label: '日期时间',
    value: ComponentInteractEventEnum.DATE_TIME
  },
  {
    label: '日期范围',
    value: ComponentInteractEventEnum.DATE_RANGE
  },
  {
    label: '月份',
    value: ComponentInteractEventEnum.MONTH
  },
  {
    label: '月份范围',
    value: ComponentInteractEventEnum.MONTH_RANGE
  },
  {
    label: '年份',
    value: ComponentInteractEventEnum.YEAR
  },
  {
    label: '年份范围',
    value: ComponentInteractEventEnum.YEAR_RANGE
  },
  {
    label: '季度',
    value: ComponentInteractEventEnum.QUARTER
  },
  {
    label: '季度范围',
    value: ComponentInteractEventEnum.QUARTER_RANGE
  }
]
</script>
