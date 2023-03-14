import { InteractEventOn, InteractActionsType } from '@/enums/eventEnum'

// 时间组件类型
export enum ComponentInteractEventEnum {
  DATE = 'date',
  DATE_RANGE = 'daterange'
}

// 联动参数
export enum ComponentInteractParamsEnum {
  DATE = 'date',
  DATE_START = 'dateStart',
  DATE_END = 'dateEnd',
  DATE_RANGE = 'daterange'
}

// 定义组件触发回调事件
export const interactActions: InteractActionsType[] = [
  {
    interactType: InteractEventOn.CHANGE,
    interactName: '完成后的回调',
    componentEmitEvents: {
      [ComponentInteractEventEnum.DATE]: [
        {
          value: ComponentInteractParamsEnum.DATE,
          label: '日期'
        }
      ],
      [ComponentInteractEventEnum.DATE_RANGE]: [
        {
          value: ComponentInteractParamsEnum.DATE_START,
          label: '开始时间'
        },
        {
          value: ComponentInteractParamsEnum.DATE_END,
          label: '结束时间'
        },
        {
          value: ComponentInteractParamsEnum.DATE_RANGE,
          label: '日期范围'
        }
      ]
    }
  }
]
