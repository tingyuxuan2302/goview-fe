import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../index.d'

export const IconConfig: ConfigType = {
  key: 'Icon',
  chartKey: 'VIcon',
  conKey: 'VCIcon',
  title: '图标',
  category: ChatCategoryEnum.UNICONS,
  categoryName: ChatCategoryEnumName.UNICONS,
  package: PackagesCategoryEnum.ICONS,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'icon.png'
}
