import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { DataConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'
import { chartInitConfig } from '@/settings/designSetting'

export const option = {
  eventsApi: [
    {
      value: 'change',
      label: '完成后的回调',
      date: [
        {
          value: 'data1',
          label: '日期',
        },
      ],
      daterange: [
        {
          value: 'data1',
          label: '开始时间',
        },
        {
          value: 'data2',
          label: '结束时间',
        }
      ]
    }
  ],
  dataset: {
    count: 0,
    type: 'date', //'daterange', // date
    range: undefined
  }
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = DataConfig.key
  public attr = { ...chartInitConfig, w: 260, h: 32, zIndex: -1 }
  public chartConfig = cloneDeep(DataConfig)
  public option = cloneDeep(option)
}
