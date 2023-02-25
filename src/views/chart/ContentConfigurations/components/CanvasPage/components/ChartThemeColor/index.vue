<template>
  <div class="go-chart-theme-color">
    <n-card class="card-box" size="small" hoverable embedded @click="createColorHandle">
      <n-text class="go-flex-items-center">
        <span>自定义颜色</span>
        <n-icon size="16">
          <add-icon></add-icon>
        </n-icon>
      </n-text>
    </n-card>

    <n-card
      v-for="(value, key) in chartColors"
      :key="key"
      class="card-box"
      :class="{ selected: key === selectName }"
      size="small"
      hoverable
      embedded
      @click="selectTheme(key)"
    >
      <div class="go-flex-items-center">
        <n-text>{{ chartColorsName[key] }}</n-text>
        <span
          class="theme-color-item"
          v-for="colorItem in fetchShowColors(value.color)"
          :key="colorItem"
          :style="{ backgroundColor: colorItem }"
        ></span>
      </div>
      <div class="theme-bottom" :style="{ backgroundImage: colorBackgroundImage(value) }"></div>
    </n-card>
    <!-- 自定义颜色 modal -->
    <create-color v-model:modelShow="createColorModelShow"></create-color>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import cloneDeep from 'lodash/cloneDeep'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { EditCanvasConfigEnum } from '@/store/modules/chartEditStore/chartEditStore.d'
import { chartColors, chartColorsName, ChartColorsNameType } from '@/settings/chartThemes/index'
import { useDesignStore } from '@/store/modules/designStore/designStore'
import { loadAsyncComponent } from '@/utils'
import { icon } from '@/plugins'

const CreateColor = loadAsyncComponent(() => import('../CreateColor/index.vue'))

const { SquareIcon, AddIcon } = icon.ionicons5
const chartEditStore = useChartEditStore()

// 全局颜色
const designStore = useDesignStore()
const createColorModelShow = ref(false)

// 创建颜色
const createColorHandle = () => {
  createColorModelShow.value = true
}

// 颜色
const themeColor = computed(() => {
  return designStore.getAppTheme
})

// 选中名称
const selectName = computed(() => {
  return chartEditStore.getEditCanvasConfig.chartThemeColor
})

// 底色
const colorBackgroundImage = (item: { color: string[] }) => {
  return `linear-gradient(to right, ${item.color[0]} 0%, ${item.color[5]} 100%)`
}

// 获取用来展示的色号
const fetchShowColors = (colors: Array<string>) => {
  return cloneDeep(colors).splice(0, 6)
}

// 设置主体色（在 ContentEdit > List 中进行注入）
const selectTheme = (theme: ChartColorsNameType) => {
  chartEditStore.setEditCanvasConfig(EditCanvasConfigEnum.CHART_THEME_COLOR, theme)
}
</script>

<style lang="scss" scoped>
$radius: 10px;
$itemRadius: 6px;

@include go('chart-theme-color') {
  .card-box {
    cursor: pointer;
    margin-top: 15px;
    padding: 0;
    @include fetch-bg-color('background-color4-shallow');
    border-radius: $radius;
    overflow: hidden;

    &.selected {
      border: 2px solid v-bind('themeColor');
      border-bottom: 1px solid rgba(0, 0, 0, 0);
    }
    &:first-child {
      margin-top: 5px;
    }
    .go-flex-items-center {
      justify-content: space-between;
      margin-top: -4px;
    }
    .theme-color-item {
      display: inline-block;
      width: 20px;
      height: 20px;
      border-radius: $itemRadius;
    }
    .theme-bottom {
      position: absolute;
      left: 0;
      bottom: 0px;
      width: 100%;
      height: 3px;
    }
  }
}
</style>
