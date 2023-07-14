import { http } from '@/api/http'
import { httpErrorHandle } from '@/utils'
import { RequestHttpEnum, ModuleTypeEnum } from '@/enums/httpEnum'
import { LoginResult } from './system'

// * 登录
export const loginApi = async (data: object) => {
  try {
    const res = await http(RequestHttpEnum.POST)<LoginResult>(`${ModuleTypeEnum.SYSTEM}/login`, data)
    return res
  } catch (err) {
    httpErrorHandle()
  }
}

// * 登出
export const logoutApi = async () => {
  try {
    const res = await http(RequestHttpEnum.GET)(`${ModuleTypeEnum.SYSTEM}/logout`)
    return res
  } catch (err) {
    httpErrorHandle()
  }
}

// * 注册
export const registerApi = async (data: object) => {
  try {
    const res = await http(RequestHttpEnum.POST)(`${ModuleTypeEnum.SYSTEM}/register`, data)
    return res
  } catch (err) {
    httpErrorHandle()
  }
}

// * 获取 oss 上传接口
export const ossUrlApi = async (data: object) => {
  try {
    const res = await http(RequestHttpEnum.GET)<{
      /**
       * bucket 地址
       */
      bucketURL?: string
    }>(`${ModuleTypeEnum.SYSTEM}/getOssInfo`, data)
    return res
  } catch (err) {
    httpErrorHandle()
  }
}
