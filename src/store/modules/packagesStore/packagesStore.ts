import { defineStore } from 'pinia'
import { ConfigType, PackagesStoreType, PackagesType } from './packagesStore.d'
import { packagesList } from '@/packages/index'

// 组件 packages
export const usePackagesStore = defineStore({
  id: 'usePackagesStore',
  state: (): PackagesStoreType => ({
    packagesList: Object.freeze(packagesList),
    newPhoto: undefined
  }),
  getters: {
    getPackagesList(): PackagesType {
      return this.packagesList
    }
  },
  actions: {
    addPhotos(newPhoto: ConfigType, index: number) {
      this.newPhoto = newPhoto
      this.packagesList.Photos.splice(index, 0, newPhoto)
    }
  }
})
