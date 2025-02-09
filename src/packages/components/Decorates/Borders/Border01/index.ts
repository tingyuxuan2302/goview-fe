/*
 * @Description: 
 * @Author: 笙痞77
 * @Date: 2023-04-10 14:13:11
 * @LastEditors: 笙痞77
 * @LastEditTime: 2023-04-25 14:15:04
 */
import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const Border01Config: ConfigType = {
  key: 'Border01',
  chartKey: 'VBorder01',
  conKey: 'VCBorder01',
  title: '边框-01',
  category: ChatCategoryEnum.BORDER,
  categoryName: ChatCategoryEnumName.BORDER,
  package: PackagesCategoryEnum.DECORATES,
  chartFrame: ChartFrameEnum.STATIC,
  image: 'border01.png'
}
