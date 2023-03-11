import { ConfigType, PackagesCategoryEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../../index.d'

export const InputsDateConfig: ConfigType = {
  key: 'InputsDate',
  chartKey: 'VInputsDate',
  conKey: 'VCInputsDate',
  title: '时间选择器',
  category: ChatCategoryEnum.INPUTS,
  categoryName: ChatCategoryEnumName.INPUTS,
  package: PackagesCategoryEnum.DECORATES,
  image: 'inputs_date.png'
}
