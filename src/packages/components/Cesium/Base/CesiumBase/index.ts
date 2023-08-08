/*
 * @Description: 
 * @Author: 笙痞77
 * @Date: 2023-07-24 14:05:04
 * @LastEditors: 笙痞77
 * @LastEditTime: 2023-07-27 10:43:40
 */
import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { CesiumCategoryEnum, CesiumCategoryEnumName } from '../../index.d'

export const CesiumBaseConfig: ConfigType = {
  key: 'CesiumBase',
  chartKey: 'VCesiumBase',
  conKey: 'VCCesiumBase',
  title: 'Cesium地球',
  category: CesiumCategoryEnum.CESIUM_BASE,
  categoryName: CesiumCategoryEnumName.CESIUM_BASE,
  package: PackagesCategoryEnum.CESIUM,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'global.png',
  redirectComponent: `Cesium/Base/CesiumBase` // 跳转组件路径规则
}