import type { IAccunt } from '@/types'
import myRequest from '..'
import { localCache } from '@/utils/cache'

export function accountLoginRequest(account: IAccunt) {
  return myRequest.post({
    url: '/login',
    data: account
  })
}

export function getUserInfoById(id: number) {
  return myRequest.get({
    url: `/users/${id}`
  })
}

export function getUserMenuByRoleId(id: number) {
  return myRequest.get({
    url: `/role/${id}/menu`
  })
}
