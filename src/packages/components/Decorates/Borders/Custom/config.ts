import {  PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { CustomConfig } from './index'
import cloneDeep from 'lodash/cloneDeep'

export const option = {
  dur: 0.5,
  colors: ['#4fd2dd', '#235fa7'],
  backgroundColor: '#00000000'
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = CustomConfig.key
  public chartConfig = cloneDeep(CustomConfig)
  public option = cloneDeep(option)
  public props = {}
}
