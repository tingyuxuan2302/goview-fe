import { IconConfig } from '../Icon/index'
import { PackagesCategoryEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../index.d'

const iconNames = [
  'wi:cloud',
  'wi:cloudy',
  'wi:cloudy-gusts',
  'wi:cloudy-windy',
  'wi:day-cloudy',
  'wi:day-cloudy-high',
  'wi:day-hail',
  'wi:day-haze',
  'wi:day-light-wind',
  'wi:day-lightning',
  'wi:day-rain',
  'wi:day-rain-mix',
  'wi:day-rain-wind',
  'wi:day-showers',
  'wi:day-sleet',
  'wi:day-sleet-storm',
  'wi:day-snow',
  'wi:day-snow-thunderstorm',
  'wi:day-snow-wind',
  'wi:day-sprinkle',
  'wi:day-storm-showers',
  'wi:day-sunny',
  'wi:day-sunny-overcast',
  'wi:hail',
  'wi:horizon',
  'wi:horizon-alt',
  'wi:hot',
  'wi:lightning',
  'wi:night-alt-cloudy',
  'wi:night-alt-cloudy-gusts',
  'wi:night-alt-cloudy-high',
  'wi:night-alt-hail',
  'wi:night-alt-lightning',
  'wi:umbrella',
]
const iconList = iconNames.map(name => ({
  ...IconConfig,
  category: ChatCategoryEnum.WEATHER,
  categoryName: ChatCategoryEnumName.WEATHER,
  package: PackagesCategoryEnum.ICONS,
  image: name,
  icon: name,
  dataset: name,
  title: name.replace('wi:', ''),
  redirectComponent: './components/Icons/Icon' // 虚拟组件路径，尾部不跟 ‘/’，相对于 /packages/index.ts 文件的位置
}))

export default iconList
