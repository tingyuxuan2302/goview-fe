/*
 * @Description: 
 * @Author: 笙痞77
 * @Date: 2023-07-24 14:02:24
 * @LastEditors: 笙痞77
 * @LastEditTime: 2023-08-08 10:56:19
 */
import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { CesiumBaseConfig } from './index'
import { chartInitConfig } from '@/settings/designSetting'
import cloneDeep from 'lodash/cloneDeep'
import dataJson from "./data.json"
import type { UploadFileInfo } from 'naive-ui'

// 定位模式
export enum LocationEnum {
  FLY = "fly", // 飞行
  SET_VIEW = "setView" // 直接定位
}

export const option = {
  dataset: dataJson,
  viewOptions: {
    center: "", // 中心点坐标
    locationMode: LocationEnum.FLY, // 定位模式
    markImgUrl: "",
    markImgList: [] as UploadFileInfo[],
    geojsonFileName: "", // geojson文件名
    geojsonFileList: [] as UploadFileInfo[], // json列表
    // markGeojsonData: {}, // mark geojson
  },
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = CesiumBaseConfig.key
  public attr = { ...chartInitConfig, w: 1000, h: 800, zIndex: -1 }
  public chartConfig = cloneDeep(CesiumBaseConfig)
  public option = cloneDeep(option)
}
