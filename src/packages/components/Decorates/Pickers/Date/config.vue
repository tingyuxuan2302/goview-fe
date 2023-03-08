<template>
  <CollapseItem name="通用的Props" :expanded="true">
    <SettingItemBox name="基础">
      <setting-item name="类型">
        <n-select v-model:value="props.optionData.dataset.type" size="small" :options="datePickerTypeOptions" />
      </setting-item>
    </SettingItemBox>

    <SettingItemBox name="默认值">
      <n-date-picker
        size="small"
        :style="{ width: ['date'].includes(props.optionData.dataset.type) ? 'auto' : '250px' }"
        v-model:value="props.optionData.dataset.range"
        :type="props.optionData.dataset.type"
        clearable
      />
    </SettingItemBox>
    <SettingItemBox>
      <template #name>
        <n-text>动态</n-text>
        <n-tooltip trigger="hover">
          <template #trigger>
            <n-icon size="21" :depth="3">
              <help-outline-icon></help-outline-icon>
            </n-icon>
          </template>
          <n-text>动态日期以默人值计算</n-text>
        </n-tooltip>
      </template>

      <setting-item name="计算值">
        <n-input-number v-model:value="props.optionData.dataset.count" size="small" placeholder="0">
          <template #prefix>
            <n-text depth="3">天</n-text>
          </template>
        </n-input-number>
      </setting-item>
    </SettingItemBox>
  </CollapseItem>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { option } from './config'
import { icon } from '@/plugins'
import { CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'

const { HelpOutlineIcon } = icon.ionicons5

const props = defineProps({
  optionData: {
    type: Object as PropType<typeof option>,
    required: true
  }
})

const datePickerTypeOptions = [
  {
    label: '日期',
    value: 'date'
  },
  {
    label: '日期范围',
    value: 'daterange'
  }
]
</script>
