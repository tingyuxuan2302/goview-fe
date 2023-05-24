import { ChartList } from '@/packages/components/Charts/index'
import { DecorateList } from '@/packages/components/Decorates/index'
import { InformationList } from '@/packages/components/Informations/index'
import { TableList } from '@/packages/components/Tables/index'
import { PhotoList } from '@/packages/components/Photos/index'
import { IconList } from '@/packages/components/Icons/index'
import { PackagesCategoryEnum, PackagesType, ConfigType, FetchComFlagType } from '@/packages/index.d'

const configModules: Record<string, { default: string }> = import.meta.glob('./components/**/config.vue', {
  eager: true
})
const indexModules: Record<string, { default: string }> = import.meta.glob('./components/**/index.vue', {
  eager: true
})
const imagesModules: Record<string, { default: string }> = import.meta.glob('../assets/images/chart/**', {
  eager: true
})

// * 所有图表
export let packagesList: PackagesType = {
  [PackagesCategoryEnum.CHARTS]: ChartList,
  [PackagesCategoryEnum.INFORMATIONS]: InformationList,
  [PackagesCategoryEnum.TABLES]: TableList,
  [PackagesCategoryEnum.DECORATES]: DecorateList,
  [PackagesCategoryEnum.PHOTOS]: PhotoList,
  [PackagesCategoryEnum.ICONS]: IconList
}

/**
 * * 获取目标组件配置信息
 * @param targetData
 */
export const createComponent = async (targetData: ConfigType) => {
  const { package: packageName } = targetData
  if (packageName === PackagesCategoryEnum.ICONS) {
    return createIconComponent()
  } else if (packageName === PackagesCategoryEnum.PHOTOS) {
    return createPhotoComponent()
  } else {
    return createDefaultComponent(targetData)
  }
}

export const createIconComponent = async () => {
  const chart = await import(`./components/Icons/Icon/config`)
  return new chart.default()
}

export const createPhotoComponent = async () => {
  const chart = await import(`./components/Informations/Mores/Image/config`)
  return new chart.default()
}

export const createDefaultComponent = async (targetData: ConfigType) => {
  const { category, key } = targetData
  const chart = await import(`./components/${targetData.package}/${category}/${key}/config.ts`)
  return new chart.default()
}

/**
 * * 获取组件
 * @param {string} chartName 名称
 * @param {FetchComFlagType} flag 标识 0为展示组件, 1为配置组件
 */
const fetchComponent = (chartName: string, flag: FetchComFlagType) => {
  const module = flag === FetchComFlagType.VIEW ? indexModules : configModules
  for (const key in module) {
    const urlSplit = key.split('/')
    if (urlSplit[urlSplit.length - 2] === chartName) {
      return module[key]
    }
  }
}

/**
 * * 获取展示组件
 * @param {ConfigType} dropData 配置项
 */
export const fetchChartComponent = (dropData: ConfigType) => {
  const { key } = dropData
  return fetchComponent(key, FetchComFlagType.VIEW)?.default
}

/**
 * * 获取配置组件
 * @param {ConfigType} dropData 配置项
 */
export const fetchConfigComponent = (dropData: ConfigType) => {
  const { key } = dropData
  return fetchComponent(key, FetchComFlagType.CONFIG)?.default
}

/**
 * * 获取图片内容
 * @param {ConfigType} targetData 配置项
 */
export const fetchImages = async (targetData?: ConfigType) => {
  if (!targetData) return ''
  // 正则判断图片是否为 url，是则直接返回该 url
  if (/^(http|https):\/\/([\w.]+\/?)\S*/.test(targetData.image)) return targetData.image
  // 新数据动态处理
  const { image, package: targetDataPackage } = targetData
  // 兼容旧数据
  if (image.includes('@') || image.includes('base64')) return image

  const imageName = image.substring(image.lastIndexOf('/') + 1)
  for (const key in imagesModules) {
    const urlSplit = key.split('/')
    if (urlSplit[urlSplit.length - 1] === imageName) {
      return imagesModules[key]?.default
    }
  }
  return ''
}
