/*
 * @Description: 
 * @Author: 笙痞77
 * @Date: 2023-08-02 15:16:20
 * @LastEditors: 笙痞77
 * @LastEditTime: 2023-08-02 17:20:21
 */
import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const Button01Config: ConfigType = {
  key: 'Button01',
  chartKey: 'VButton01',
  conKey: 'VCButton01',
  title: '按钮-01',
  category: ChatCategoryEnum.BUTTON,
  categoryName: ChatCategoryEnumName.BUTTON,
  package: PackagesCategoryEnum.DECORATES,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'button01.png'
}
