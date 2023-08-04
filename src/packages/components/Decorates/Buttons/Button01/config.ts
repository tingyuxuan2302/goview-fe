/*
 * @Description: 
 * @Author: 笙痞77
 * @Date: 2023-08-02 15:16:32
 * @LastEditors: 笙痞77
 * @LastEditTime: 2023-08-03 14:43:45
 */
import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { Button01Config } from './index'
import cloneDeep from 'lodash/cloneDeep'
import { chartInitConfig } from '@/settings/designSetting'
import { interactActions, ComponentInteractEventEnum } from './interact'
import { COMPONENT_INTERACT_EVENT_KET } from '@/enums/eventEnum'

export const option = {
  // 时间组件展示类型，必须和 interactActions 中定义的数据一致
  [COMPONENT_INTERACT_EVENT_KET]: ComponentInteractEventEnum.DATA,
  dur: 0.5,
  colors: ['#4fd2dd', '#235fa7'],
  backgroundColor: '#00000000'
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = Button01Config.key
  public attr = { ...chartInitConfig, w: 200, h: 60, zIndex: 1 }
  public chartConfig = cloneDeep(Button01Config)
  public option = cloneDeep(option)
  public interactActions = interactActions
}
