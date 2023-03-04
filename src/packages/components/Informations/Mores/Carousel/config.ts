import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { CarouselConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'
import logo from '@/assets/logo.png'

// 示例图片资源
const modules = import.meta.globEager("./images/*");
const dataset = [logo]
for (var item in modules) {
  dataset.push(modules[item].default)
}

export const option = {
  // 图片资源列表
  dataset: dataset,
  // 自动播放
  autoplay: true,
  // 自动播放的间隔（ms）
  interval: 5000,
  // 每页显示的图片数量
  slidesPerview: 1,
  // 轮播方向
  direction: "horizontal",
  // 拖曳切换
  draggable: true,
  // 居中显示
  centeredSlides: false,
  // 过渡效果
  effect: "slide",
  // 是否显示指示点
  showDots: true,
  // 指示器样式
  dotType: "dot",
  // 指示器位置
  dotPlacement: "bottom",
  // 显示箭头
  showArrow: false,
  // 图片样式
  fit: "contain",
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = CarouselConfig.key
  public chartConfig = cloneDeep(CarouselConfig)
  public option = cloneDeep(option)
}
