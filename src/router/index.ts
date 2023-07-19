/*
 * @Description: 
 * @Author: 笙痞77
 * @Date: 2023-07-13 09:45:37
 * @LastEditors: 笙痞77
 * @LastEditTime: 2023-07-13 18:07:25
 */
import type { App } from 'vue'
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { createRouterGuards } from './router-guards'
import { PageEnum } from '@/enums/pageEnum'
import { HttpErrorPage, LoginRoute, RegisterRoute, ReloadRoute, RedirectRoute } from '@/router/base'
import { Layout } from '@/router/constant'

import modules from '@/router/modules'

const RootRoute: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Root',
    redirect: PageEnum.BASE_HOME,
    component: Layout,
    meta: {
      title: 'Root',
    },
    children: [
      ...HttpErrorPage,
      ...RedirectRoute,
      modules.projectRoutes,
      modules.chartRoutes,
      modules.previewRoutes,
      modules.editRoutes
    ]
  }
]


export const constantRouter: any[] = [LoginRoute,RegisterRoute, ...RootRoute, ReloadRoute];

const router = createRouter({
  history: createWebHashHistory(''),
  routes: constantRouter,
  strict: true,
})

export function setupRouter(app: App) {
  app.use(router);
  // 创建路由守卫
  createRouterGuards(router)
}
export default router
