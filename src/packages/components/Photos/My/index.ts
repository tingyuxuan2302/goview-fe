import { ConfigType, PackagesCategoryEnum } from '@/packages/index.d'
import { ImageConfig } from '@/packages/components/Informations/Mores/Image/index'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../index.d'
import { setLocalStorage, getLocalStorage } from '@/utils'
import { usePackagesStore } from '@/store/modules/packagesStore/packagesStore'
import { StorageEnum } from '@/enums/storageEnum'

const StoreKey = StorageEnum.GO_USER_MEDIA_PHOTOS

/**
 * 上传完成事件类型
 */
type UploadCompletedEventType = {
  fileName: string
  url: string
}

const userPhotosList: ConfigType[] = getLocalStorage(StoreKey) || []

const uploadFile = (callback: Function | null = null) => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'image/*' // 这里只允许图片类型
  input.onchange = async () => {
    if (!input.files || !input.files.length) return
    const file = input.files[0]
    const reader = new FileReader()
    reader.onload = () => {
      const eventObj: UploadCompletedEventType = { fileName: file.name, url: reader.result as string }
      callback && callback(eventObj)
    }
    reader.readAsDataURL(file)
  }
  input.click()
}

const addConfig = {
  ...ImageConfig,
  category: ChatCategoryEnum.MY,
  categoryName: ChatCategoryEnumName.MY,
  package: PackagesCategoryEnum.PHOTOS,
  title: '上传新项',
  image: 'upload.png',
  virtualComponent: './components/Informations/Mores/Image', // 虚拟组件路径，尾部不跟 ‘/’，相对于 /packages/index.ts 文件的位置
  disabled: true,
  clickHandle: (photoConfig: ConfigType) => {
    uploadFile((e: UploadCompletedEventType) => {
      // 和上传组件一样配置，更换标题，图片，预设数据
      const newPhoto = {
        ...ImageConfig,
        category: ChatCategoryEnum.MY,
        categoryName: ChatCategoryEnumName.MY,
        package: PackagesCategoryEnum.PHOTOS,
        title: e.fileName,
        image: e.url,
        dataset: e.url,
        virtualComponent: './components/Informations/Mores/Image' // 虚拟组件路径，尾部不跟 ‘/’，相对于 /packages/index.ts 文件的位置
      }
      userPhotosList.push(newPhoto)
      setLocalStorage(StoreKey, userPhotosList)
      const { getPackagesList } = usePackagesStore()
      getPackagesList.Photos.splice(getPackagesList.Photos.length - 1, 0, newPhoto) // 插入到上传按钮前的位置
    })
  }
}

export default [...userPhotosList, addConfig]
