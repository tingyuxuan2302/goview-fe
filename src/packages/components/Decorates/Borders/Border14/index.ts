import { ConfigType, PackagesCategoryEnum, ChartFrameEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const Border14Config: ConfigType = {
  key: 'Border14',
  chartKey: 'VBorder14',
  conKey: 'VCBorder14',
  title: '边框-14',
  category: ChatCategoryEnum.BORDER,
  categoryName: ChatCategoryEnumName.BORDER,
  package: PackagesCategoryEnum.DECORATES,
  chartFrame: ChartFrameEnum.STATIC,
  image: 'border14.png'
}
