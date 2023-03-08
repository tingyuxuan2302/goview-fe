import image from '@/assets/images/chart/informations/text_static.png'
import { ConfigType, PackagesCategoryEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const DataConfig: ConfigType = {
  key: 'Date',
  chartKey: 'VDate',
  conKey: 'VCDate',
  title: '时间',
  category: ChatCategoryEnum.PICKERS,
  categoryName: ChatCategoryEnumName.PICKERS,
  package: PackagesCategoryEnum.DECORATES,
  image
}
