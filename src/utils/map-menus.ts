import type { RouteRecordRaw } from 'vue-router'

export function loadLocalRoutes() {
  const localRoutes: RouteRecordRaw[] = []
  const file: Record<string, any> = import.meta.glob('../router/main/**/*.ts', {
    eager: true
  })
  // 将加载对象放到localRoutes中
  for (const key in file) {
    const module = file[key]
    localRoutes.push(module.default)
  }
  return localRoutes
}

export let firstMenu: any = null
export function mapMenusToRoutes(userMenus: any[]) {
  // 加载本地路由
  const localRoutes = loadLocalRoutes()
  const routes: RouteRecordRaw[] = []
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      const route = localRoutes.find((item) => item.path === submenu.url)

      // 将二级菜单对应的路径加入，找到当前用户权限下的路由
      if (route) {
        // 给route的顶层菜单增加重定向功能
        if (!routes.find((item) => item.path === menu.url)) {
          routes.push({ path: menu.url, redirect: route.path })
        }
        routes.push(route)
      }
      // 记录第一个被匹配到的菜单给予返回
      if (!firstMenu && route) {
        firstMenu = submenu
      }
    }
  }
  return routes
}

// 根据路径去匹配需要显示的菜单

export function mapPathToMenu(path: string, userMenus: any[]) {
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        return submenu
      }
    }
  }
}
export interface IBreadcrumbs {
  name: string
  path: string
}

export function mapPathToBreadcrumbs(path: string, userMenus: any[]) {
  //定义面包屑
  const breadcrumbs: IBreadcrumbs[] = []
  //  便利获取面包屑的层级
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        // 顶级菜单
        breadcrumbs.push({ name: menu.name, path: menu.url })
        // 匹配菜单
        breadcrumbs.push({ name: submenu.name, path: submenu.url })
      }
    }
  }
  return breadcrumbs
}
// 菜单映射到id的列表
export function mapMenuListToIds(menuList: any[]) {
  const ids: number[] = []
  function recurseGetId(menus: any[]) {
    for (const item of menus) {
      if (item.children) {
        recurseGetId(item.children)
      } else {
        ids.push(item.id)
      }
    }
  }
  recurseGetId(menuList)
  return ids
}

// 从菜单映射到按钮的权限
export function mapMenusToPermissions(menuList: any[]) {
  const permissions: string[] = []
  function recurseGetPermission(menus: any[]) {
    for (const item of menus) {
      if (item.type === 3) {
        permissions.push(item.permission)
      } else {
        recurseGetPermission(item.children ?? [])
      }
    }
  }

  recurseGetPermission(menuList)
  return permissions
}
