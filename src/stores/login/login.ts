import type { IAccunt } from '@/types'
import { defineStore } from 'pinia'
import {
  accountLoginRequest,
  getUserInfoById,
  getUserMenuByRoleId
} from '@/services/login/login'
import { localCache } from '@/utils/cache'
import router from '@/router'
import {
  loadLocalRoutes,
  mapMenusToPermissions,
  mapMenusToRoutes
} from '@/utils/map-menus'
import useMainStore from '../main/main'

interface ILoginState {
  token: string
  userInfo: any
  userMenus: any
  permissions: string[]
}

const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    token: '',
    userInfo: {},
    userMenus: [],
    permissions: []
  }),
  actions: {
    async loginAccountAction(account: IAccunt) {
      //获取用户登录的详细信息
      const result = await accountLoginRequest(account)
      console.log(result)
      const id = result.data.id
      this.token = result.data.token
      localCache.setCache('token', this.token)
      // 获取用户详细信息
      const userInfo = await getUserInfoById(id)
      this.userInfo = userInfo.data
      // 根据角色请求用户权限
      const userMenus = await getUserMenuByRoleId(this.userInfo.role.id) // 页面跳转
      console.log(userMenus)
      this.userMenus = userMenus.data

      // 存到本地
      localCache.setCache('userInfo', this.userInfo)
      localCache.setCache('userMenus', this.userMenus)

      // 请求所有的roles/departments数据
      const mianstore = useMainStore()
      mianstore.fetchEntireDataAction()
      // 获取登录用户的按钮权限
      const permissions = mapMenusToPermissions(this.userMenus)
      this.permissions = permissions
      // 动态添加路由

      const routes = mapMenusToRoutes(userMenus.data)
      routes.forEach((route) => router.addRoute('main', route))

      router.push('/main')
    },
    loadLocalCacheAction() {
      // 用户进行默认刷新加载数据
      const token = localCache.getCache('token')
      const userInfo = localCache.getCache('userInfo')
      const userMenus = localCache.getCache('userMenus')
      if (token && userInfo && userMenus) {
        this.token = token
        this.userInfo = userInfo
        this.userMenus = userMenus
        console.log(userMenus)
        const mianstore = useMainStore()
        mianstore.fetchEntireDataAction()
        //获取按钮的权限
        const permissions = mapMenusToPermissions(userMenus)
        this.permissions = permissions
        //动态添加路由
        const routes = mapMenusToRoutes(userMenus)
        routes.forEach((route) => router.addRoute('main', route))
      }
    }
  }
})

export default useLoginStore
