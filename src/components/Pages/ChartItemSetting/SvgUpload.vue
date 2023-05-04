<!--
 * @Description: 
 * @Author: 笙痞77
 * @Date: 2023-04-24 16:22:13
 * @LastEditors: 笙痞77
 * @LastEditTime: 2023-05-04 10:34:24
-->
<template>
  <collapse-item name="上传：">
    <setting-item-box name="svg上传:">
      <setting-item>
        <n-upload directory-dnd :customRequest="customRequest" @before-upload="onBeforeUpload">
          <n-upload-dragger>
            <div style="margin-bottom: 12px">
              <n-icon size="48" :depth="3">
                <archive-icon />
              </n-icon>
            </div>
            <n-text style="font-size: 16px"> 点击或者拖动文件到该区域来上传 </n-text>
            <n-p depth="3" style="margin: 8px 0 0 0">
              请不要上传敏感数据，比如你的银行卡号和密码，信用卡号有效期和安全码
            </n-p>
          </n-upload-dragger>
        </n-upload>
      </setting-item>
    </setting-item-box>
  </collapse-item>
</template>

<script lang="ts" setup>
import { defineComponent, nextTick, createApp, h } from 'vue'
import { ArchiveOutline as ArchiveIcon } from '@vicons/ionicons5'
import { SettingItemBox, SettingItem, CollapseItem } from '@/components/Pages/ChartItemSetting'
import type { UploadFileInfo, UploadCustomRequestOptions } from 'naive-ui'
import { fetchRouteParamsLocation } from '@/utils'
import { uploadFile } from '@/api/path'
import { ResultEnum } from '@/enums/httpEnum'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { EditCanvasConfigEnum } from '@/store/modules/chartEditStore/chartEditStore.d'
import { useSystemStore } from '@/store/modules/systemStore/systemStore'
import { ConfigType, PackagesCategoryEnum, ChartFrameEnum, CreateComponentType } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '@/packages/components/Decorates/index.d'
import { PublicConfigClass } from '@/packages/public'
import cloneDeep from 'lodash/cloneDeep'
import { componentInstall } from '@/utils'
import { fetchConfigComponent, fetchChartComponent } from '@/packages/index'
import { EditCanvasTypeEnum } from '@/store/modules/chartEditStore/chartEditStore.d'
import axios from 'axios'
import CustomBorder from '@/packages/components/Decorates/Borders/Custom/index.vue'
import CustomConfigNode from '@/packages/components/Decorates/Borders/Custom/config.vue'
import CustomOption from '@/packages/components/Decorates/Borders/Custom/config'
import { CustomConfig } from '@/packages/components/Decorates/Borders/Custom/index'

const systemStore = useSystemStore()

const chartEditStore = useChartEditStore()

const onBeforeUpload = (data: { file: UploadFileInfo; fileList: UploadFileInfo[] }) => {
  console.log('----', data)
  // return false
}

const reg = /^<\?xml(.*)\?>/

let parentNode: HTMLDivElement
// 自定义上传操作
const customRequest = (options: UploadCustomRequestOptions) => {
  const { file } = options
  nextTick(async () => {
    if (file.file) {
      // 修改名称
      const newNameFile = new File([file.file], `${fetchRouteParamsLocation()}_index_background.svg`, {
        type: file.file.type
      })
      let uploadParams = new FormData()
      uploadParams.append('object', newNameFile)
      const uploadRes = await uploadFile(uploadParams)
      const ConfigIns = new CustomOption()
      if (uploadRes && uploadRes.code === ResultEnum.SUCCESS) {
        axios.get(uploadRes.data.fileUrl).then(res => {
          let svgEl = res.data.replace(reg, '')
          // 动态创建svg的虚拟dom
          const app = createApp({
            render() {
              return h(CustomBorder as any, { svgEl, chartConfig: ConfigIns.chartConfig })
            }
          }) as any

          parentNode = document.createElement('div')
          const instance = app.mount(parentNode) // 挂载真实dom

          // 动态全局注册图表组件
          componentInstall(CustomConfig.chartKey, app)
          // 动态全局注册《自定义组件》的配置组件
          componentInstall(CustomConfig.conKey, CustomConfigNode)

          // 自定义元件需要缓存其svg代码，为了给渲染时使用
          ConfigIns.props = {
            svgEl
          }
          // 组件动态添加到store
          chartEditStore.addComponentList(ConfigIns, false, true)
          // 选中组件
          chartEditStore.setTargetSelectChart(app.id)
          // 在画布中真实渲染
          const box = document.querySelectorAll('.go-shape-box')[0] as unknown as HTMLDivElement
          if (box) {
            box.appendChild(parentNode)
          }
        })

        return
      }
      window['$message'].error('添加图片失败，请稍后重试！')
    } else {
      window['$message'].error('添加图片失败，请稍后重试！')
    }
  })
}
</script>

<style>
</style>