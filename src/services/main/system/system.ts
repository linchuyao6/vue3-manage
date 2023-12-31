import myRequest from '@/services'

// 用户的网络请求
export function postUserListData(queryInfo: any) {
  return myRequest.post({
    url: '/users/list',
    data: queryInfo
  })
}
export function deleteUserById(id: number) {
  return myRequest.delete({
    url: `/users/${id}`
  })
}
export function newUserData(userInfo: any) {
  return myRequest.post({
    url: '/users',
    data: userInfo
  })
}
export function editUserData(id: number, userInfo: any) {
  return myRequest.patch({
    url: `/users/${id}`,
    data: userInfo
  })
}

// 针对页面的网络请求
export function postPageListData(pageName: string, queryInfo: any) {
  return myRequest.post({
    url: `/${pageName}/list`,
    data: queryInfo
  })
}
export function deletePageById(pageName: string, id: number) {
  return myRequest.delete({
    url: `/${pageName}/${id}`
  })
}
export function newPageData(pageName: string, pageInfo: any) {
  return myRequest.post({
    url: `/${pageName}`,
    data: pageInfo
  })
}
export function editPageData(pageName: string, id: number, pageInfo: any) {
  return myRequest.patch({
    url: `/${pageName}/${id}`,
    data: pageInfo
  })
}
