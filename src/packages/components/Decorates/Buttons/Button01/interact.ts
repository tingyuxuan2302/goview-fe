/*
 * @Description: 
 * @Author: 笙痞77
 * @Date: 2023-08-03 14:28:31
 * @LastEditors: 笙痞77
 * @LastEditTime: 2023-08-03 15:37:12
 */
import { InteractEventOn, InteractActionsType } from '@/enums/eventEnum'

// 时间组件类型
export enum ComponentInteractEventEnum {
  DATA = 'data'
}

// 联动参数
export enum ComponentInteractParamsEnum {
  DATA = 'data'
}

// 定义组件触发回调事件
export const interactActions: InteractActionsType[] = [
  {
    interactType: InteractEventOn.CLICK,
    interactName: '点击完成',
    componentEmitEvents: {
      [ComponentInteractEventEnum.DATA]: [
        {
          value: ComponentInteractParamsEnum.DATA,
          label: '选择项'
        }
      ]
    }
  }
]
