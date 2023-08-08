/*
 * @Description: 
 * @Author: 笙痞77
 * @Date: 2023-07-18 15:15:27
 * @LastEditors: 笙痞77
 * @LastEditTime: 2023-07-18 15:15:40
 */
import { http } from '@/api/http'
import { httpErrorHandle } from '@/utils'
import { ContentTypeEnum, RequestHttpEnum, ModuleTypeEnum } from '@/enums/httpEnum'
import { ProjectItem, ProjectDetail, HttpResult } from './project'
import { axiosPre } from '@/settings/httpSetting'

const baseURL = `${import.meta.env.PROD ? import.meta.env.VITE_PRO_PATH : ''}${axiosPre}`


// * 项目列表
export const projectListApi = async (data: object) => {
  try {
    const res = await http(RequestHttpEnum.GET)<ProjectItem[]>(`${ModuleTypeEnum.PROJECT}/list`, data)
    return res
  } catch {
    httpErrorHandle()
  }
}

// * 新增项目
export const createProjectApi = async (data: object) => {
  try {
    const res = await http(RequestHttpEnum.POST)<{
      /**
       * 项目id
       */
      id: number
    }>(`${ModuleTypeEnum.PROJECT}/create`, data)
    return res
  } catch {
    httpErrorHandle()
  }
}

// * 获取项目
export const fetchProjectApi = async (data: object) => {
  try {
    const res = await http(RequestHttpEnum.GET)<ProjectDetail>(`${ModuleTypeEnum.PROJECT}/getData`, data)
    return res
  } catch {
    httpErrorHandle()
  }
}

// * 保存项目
export const saveProjectApi = async (data: object) => {
  try {
    const res = await http(RequestHttpEnum.POST)(
      `${ModuleTypeEnum.PROJECT}/save/data`,
      data,
      ContentTypeEnum.FORM_URLENCODED
    )
    return res
  } catch {
    httpErrorHandle()
  }
}

// * 修改项目基础信息
export const updateProjectApi = async (data: object) => {
  try {
    const res = await http(RequestHttpEnum.POST)(`${ModuleTypeEnum.PROJECT}/edit`, data)
    return res
  } catch {
    httpErrorHandle()
  }
}

// * 删除项目
export const deleteProjectApi = async (data: object) => {
  try {
    const res = await http(RequestHttpEnum.DELETE)(`${ModuleTypeEnum.PROJECT}/delete`, data)
    return res
  } catch {
    httpErrorHandle()
  }
}

// * 修改发布状态 [-1未发布,1发布]
export const changeProjectReleaseApi = async (data: object) => {
  try {
    const res = await http(RequestHttpEnum.PUT)(`${ModuleTypeEnum.PROJECT}/publish`, data)
    return res
  } catch {
    httpErrorHandle()
  }
}

// * 上传文件
export const uploadFile = async (data: object) => {
  try {
    const res = await http(RequestHttpEnum.POST)<{
      /**
       * 文件名称
       */
      fileName: string,
      fileUrl: string, // 文件url
    }>(`${ModuleTypeEnum.PROJECT}/upload`, data, ContentTypeEnum.FORM_DATA)
    return res
  } catch {
    httpErrorHandle()
  }
}

// * 解析geojson文件
export const resolveGeojson = async (data: object) => {
  try {
    const res = await http(RequestHttpEnum.POST)<HttpResult>(`${ModuleTypeEnum.PROJECT}/resolveGeojson`, data)
    return res
  } catch {
    httpErrorHandle()
  }
}

// * 获取图片
export const getImg = async (data: object) => {
  try {
    const res = await http(RequestHttpEnum.GET)<HttpResult>(`${ModuleTypeEnum.PROJECT}/getImage`, data)
    return res
  } catch {
    httpErrorHandle()
  }
}
