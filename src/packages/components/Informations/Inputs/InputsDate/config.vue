<template>
  <collapse-item name="时间配置" :expanded="true">
    <setting-item-box name="基础">
      <setting-item name="类型">
        <n-select
          v-model:value="props.optionData.componentInteractEventKey"
          size="small"
          :options="datePickerTypeOptions"
        />
      </setting-item>
    </setting-item-box>

    <setting-item-box name="默认值" :alone="true">
      <n-date-picker
        size="small"
        v-model:value="props.optionData.dataset"
        :type="props.optionData.componentInteractEventKey"
      />
    </setting-item-box>
  </collapse-item>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { icon } from '@/plugins'
import { CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
import { option } from './config'

const { HelpOutlineIcon } = icon.ionicons5

const props = defineProps({
  optionData: {
    type: Object as PropType<typeof option>,
    required: true
  }
})

const datePickerTypeOptions = [
  {
    label: '具体日期',
    value: 'date'
  },
  {
    label: '日期范围',
    value: 'daterange'
  }
]
</script>
