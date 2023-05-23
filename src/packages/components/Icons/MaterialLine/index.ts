import { IconConfig } from '../Icon/index'
import { PackagesCategoryEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../index.d'

const iconNames = [
  'line-md:beer-alt-filled-loop',
  'line-md:beer-alt-twotone-loop',
  'line-md:cloud-braces-loop',
  'line-md:cloud-download-loop',
  'line-md:cloud-download-outline-loop',
  'line-md:cloud-upload-loop',
  'line-md:cloud-upload-outline-loop',
  'line-md:coffee-half-empty-twotone-loop',
  'line-md:coffee-loop',
  'line-md:coffee-twotone-loop',
  'line-md:downloading-loop',
  'line-md:github-loop',
  'line-md:light-dark-loop',
  'line-md:loading-alt-loop',
  'line-md:loading-loop',
  'line-md:loading-twotone-loop',
  'line-md:moon-alt-loop',
  'line-md:moon-alt-to-sunny-outline-loop-transition',
  'line-md:moon-filled-loop',
  'line-md:moon-filled-to-sunny-filled-loop-transition',
  'line-md:star-pulsating-filled-loop',
  'line-md:star-pulsating-loop',
  'line-md:star-pulsating-twotone-loop',
  'line-md:upload-loop',
  'line-md:upload-outline-loop',
  'line-md:uploading-loop'
]
const iconList = iconNames.map(name => ({
  ...IconConfig,
  category: ChatCategoryEnum.ML,
  categoryName: ChatCategoryEnumName.ML,
  package: PackagesCategoryEnum.ICONS,
  image: name,
  icon: name,
  dataset: name,
  title: name.replace('line-md:', ''),
  redirectComponent: './components/Icons/Icon' // 虚拟组件路径，尾部不跟 ‘/’，相对于 /packages/index.ts 文件的位置
}))

export default iconList
