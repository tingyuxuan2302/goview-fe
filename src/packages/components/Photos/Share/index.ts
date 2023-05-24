import { ChartFrameEnum, PackagesCategoryEnum } from '@/packages/index.d'
import { ImageConfig } from '@/packages/components/Informations/Mores/Image/index'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../index.d'

// 远程共享库（调接口获取图像列表）
const imageList = [
  { imageName: 'carousel1', imageUrl: 'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg' },
  { imageName: 'carousel2', imageUrl: 'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg' }
]

const photoConfigList = imageList.map(i => ({
  ...ImageConfig,
  category: ChatCategoryEnum.SHARE,
  categoryName: ChatCategoryEnumName.SHARE,
  package: PackagesCategoryEnum.PHOTOS,
  chartFrame: ChartFrameEnum.STATIC,
  image: i.imageUrl,
  dataset: i.imageUrl,
  title: i.imageName,
  redirectComponent: './components/Informations/Mores/Image' // 虚拟组件路径，尾部不跟 ‘/’，相对于 /packages/index.ts 文件的位置
}))

export default photoConfigList
