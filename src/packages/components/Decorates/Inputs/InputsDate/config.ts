import { NDatePicker } from 'naive-ui'
import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { InputsDateConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'
import { chartInitConfig } from '@/settings/designSetting'
import { InteractEventOn, InteractActionType } from '@/enums/eventEnum'

// 时间组件类型
enum ComponentInteractEvent {
  DATE = 'date',
  DATERANGE = 'daterange'
}

export const option = {
  dataset: {
    count: 0,
    // 时间组件展示类型 daterange & date
    type: ComponentInteractEvent.DATE,
    range: undefined
  }
}

// 定义组件触发回调事件
const interactActions: InteractActionType[] = [
  {
    interactType: InteractEventOn.CHANGE,
    interactName: '完成后的回调',
    componentEmitEvents: {
      [ComponentInteractEvent.DATE]: [
        {
          value: 'date',
          label: '日期'
        }
      ],
      [ComponentInteractEvent.DATERANGE]: [
        {
          value: 'dateStart',
          label: '开始时间'
        },
        {
          value: 'dateEnd',
          label: '结束时间'
        }
      ]
    }
  }
]

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = InputsDateConfig.key
  public attr = { ...chartInitConfig, w: 260, h: 32, zIndex: -1 }
  public chartConfig = cloneDeep(InputsDateConfig)
  public interactActions = interactActions
  public option = cloneDeep(option)
}
