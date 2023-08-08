<!--
 * @Description: 
 * @Author: 笙痞77
 * @Date: 2023-07-24 14:48:43
 * @LastEditors: 笙痞77
 * @LastEditTime: 2023-08-08 14:23:57
-->
<template>
  <collapse-item name="基础配置" :expanded="true" key="baseSetting">
    <setting-item-box name="中心坐标" :alone="true">
      <setting-item>
        <n-input placeholder="例如 120.36, 36.09" v-model:value="optionState.center" size="small"></n-input>
      </setting-item>
    </setting-item-box>
    <setting-item-box name="定位模式" :alone="true">
      <setting-item>
        <n-select v-model:value="optionState.locationMode" :options="locationOpts" />
      </setting-item>
    </setting-item-box>
    <setting-item-box>
      <n-button type="primary" @click="handleSave">保存</n-button>
    </setting-item-box>
  </collapse-item>
  <collapse-item name="打点配置" :expanded="true">
    <setting-item-box name="点位数据" :alone="true">
      <setting-item>
        <n-upload :customRequest="customRequest" @before-upload="onBeforeUpload" accept=".geojson"
          :default-file-list="optionState.geojsonFileList" :max="1" :multiple="false">
          <n-button>上传geojson文件</n-button>
        </n-upload>
      </setting-item>
    </setting-item-box>
    <setting-item-box name="打点图片" :alone="true">
      <setting-item>
        <n-upload :customRequest="customRequestImg" @before-upload="onBeforeUploadImg"
          :default-file-list="optionState.markImgList.slice(-1)" :max="1" :multiple="false">
          <n-button>上传图片</n-button>
        </n-upload>
      </setting-item>
    </setting-item-box>
    <setting-item-box>
      <n-button type="primary" @click="handleSave">解析并保存</n-button>
    </setting-item-box>
  </collapse-item>
</template>

<script setup lang="ts">
import { PropType, reactive, nextTick, ref, computed } from 'vue'
import { option, LocationEnum } from './config'
import { CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
import cloneDeep from 'lodash/cloneDeep'
import type { UploadFileInfo, UploadCustomRequestOptions } from 'naive-ui'
import { uploadFile, resolveGeojson } from '@/api/path'
import { ResultEnum } from '@/enums/httpEnum'
import { FileTypeEnum } from '@/enums/fileTypeEnum'

const props = defineProps({
  optionData: {
    type: Object as PropType<typeof option>,
    required: true
  }
})
const locationOpts = [
  {
    label: "飞行定位",
    value: LocationEnum.FLY,
  },
  {
    label: "直接定位",
    value: LocationEnum.SET_VIEW,
  }
]

// 此处深拷贝是为了当viewOptions是一个深层次的对象时，深层次的引用改变能够不直接影响props.optionData.viewOptions
const cloneViewOpts = cloneDeep(props.optionData.viewOptions)
const optionState = reactive(cloneViewOpts)
console.log("-----optionState---", optionState)

const handleSave = () => {
  props.optionData.viewOptions = Object.assign(props.optionData.viewOptions, optionState)
}
const onBeforeUpload = (data: { file: UploadFileInfo; fileList: UploadFileInfo[] }) => {
  const isGeojson = data.file.name.split(".")?.includes("geojson")
  if (!isGeojson) {
    window['$message'].warning('文件格式不是geojson，请重新上传！')
    return false
  }
  return true
}
const errFileMsg = "上传文件失败，请稍后重试！"
const errImgMsg = "上传图片失败，请稍后重试！"
// 自定义上传操作
const customRequest = (options: UploadCustomRequestOptions) => {
  const { file } = options
  nextTick(async () => {
    if (file.file) {
      let uploadParams = new FormData()
      uploadParams.append('object', file.file)
      const uploadRes = await uploadFile(uploadParams)
      if (uploadRes && uploadRes.code === ResultEnum.SUCCESS) {
        optionState.geojsonFileName = uploadRes.data.fileName
        optionState.geojsonFileList = (optionState.geojsonFileList as UploadFileInfo[]).concat(file)
        window['$message'].success('上传成功！')
        return
      }
      window['$message'].error(errFileMsg)
    } else {
      window['$message'].error(errFileMsg)
    }
  })
}
const onBeforeUploadImg = (data: { file: UploadFileInfo; fileList: UploadFileInfo[] }) => {
  const type = data.file!.file!.type
  if (type !== FileTypeEnum.JPEG && type !== FileTypeEnum.PNG) {
    window['$message'].warning('文件格式不是图片，请重新上传！')
    return false
  }
  return true
}
const customRequestImg = (options: UploadCustomRequestOptions) => {
  const { file } = options
  nextTick(async () => {
    if (file.file) {
      let uploadParams = new FormData()
      uploadParams.append('object', file.file)

      const uploadRes = await uploadFile(uploadParams)
      if (uploadRes && uploadRes.code === ResultEnum.SUCCESS) {
        optionState.markImgUrl = uploadRes.data.fileName
        optionState.markImgList = (optionState.markImgList as UploadFileInfo[]).concat(file)
        window['$message'].success('上传成功！')
        return
      }
      window['$message'].error(errImgMsg)
    } else {
      window['$message'].error(errImgMsg)
    }
  })
}
</script>
