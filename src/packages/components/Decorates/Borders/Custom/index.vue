<!--
 * @Description: 
 * @Author: 笙痞77
 * @Date: 2023-04-10 14:13:11
 * @LastEditors: 笙痞77
 * @LastEditTime: 2023-04-26 11:38:01
-->
<template>
  <div class="go-border-box">
    <div v-html="props.svgEl"></div>
  </div>
</template>

<script setup lang="ts">
import { PropType, toRefs } from 'vue'
import { CreateComponentType } from '@/packages/index.d'

const props = defineProps({
  chartConfig: {
    type: Object as PropType<CreateComponentType>,
    required: true
  },
  svgEl: {
    type: String,
    required: true
  }
})

const borders = ['left-top', 'right-top', 'left-bottom', 'right-bottom']

const { w, h } = toRefs(props.chartConfig?.attr)
const { colors, dur, backgroundColor } = toRefs(props.chartConfig?.option)
</script>

<style lang="scss" scoped>
@include go('border-box') {
  .border-item {
    position: absolute;
    top: 0;
    left: 0;
  }
  .right-top {
    right: 0;
    transform: rotateY(180deg);
  }
  .left-bottom {
    bottom: 0;
    transform: rotateX(180deg);
  }
  .right-bottom {
    right: 0;
    bottom: 0;
    transform: rotateX(180deg) rotateY(180deg);
  }
}
</style>