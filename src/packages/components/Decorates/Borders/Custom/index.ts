/*
 * @Description: 
 * @Author: 笙痞77
 * @Date: 2023-04-10 14:13:11
 * @LastEditors: 笙痞77
 * @LastEditTime: 2023-04-27 14:06:28
 */
import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const CustomConfig: ConfigType = {
  key: 'Custom',
  chartKey: 'VCustom',
  conKey: 'VCCustom',
  title: '自定义边框',
  category: ChatCategoryEnum.BORDER,
  categoryName: ChatCategoryEnumName.BORDER,
  package: PackagesCategoryEnum.DECORATES,
  chartFrame: ChartFrameEnum.STATIC,
  image: 'border15.png'
}
