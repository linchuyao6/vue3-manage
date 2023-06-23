import { defineStore } from 'pinia'
import {
  postUserListData,
  deleteUserById,
  newUserData,
  editUserData,
  postPageListData,
  deletePageById,
  newPageData,
  editPageData
} from '@/services/main/system/system'
import type { ISystemState } from './type'
const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    usersList: [],
    usersTotalCount: 0,

    pageList: [],
    pageTotalCount: 0
  }),
  actions: {
    async postUserListAction(queryInfo: any) {
      const result = await postUserListData(queryInfo)
      const { list, totalCount } = result.data
      this.usersList = list
      this.usersTotalCount = totalCount
    },
    async handleDeleteBtnClick(id: number) {
      const result = await deleteUserById(id)
      this.postUserListAction({ offset: 0, size: 10 })
    },
    async newUserDataAction(userInfo: any) {
      const newResult = await newUserData(userInfo)
      this.postUserListAction({ offset: 0, size: 10 })
    },
    // 更新用户信息
    async editUserDataAction(id: number, userInfo: any) {
      const editResult = await editUserData(id, userInfo)
      this.postUserListAction({ offset: 0, size: 10 })
    },

    // 针对页面数据的操作
    async postPageListAction(pageName: string, queryInfo: any) {
      const result = await postPageListData(pageName, queryInfo)
      const { list, totalCount } = result.data
      this.pageList = list
      this.pageTotalCount = totalCount
    },
    async deletePageByIdAction(pageName: string, id: number) {
      const result = await deletePageById(pageName, id)

      this.postPageListAction(pageName, { offset: 0, size: 10 })
    },
    async newPageDataAction(pageName: string, pageInfo: any) {
      const result = await newPageData(pageName, pageInfo)

      this.postPageListAction(pageName, { offset: 0, size: 10 })
    },
    async editPageDataAction(pageName: string, id: number, pageInfo: any) {
      const result = await editPageData(pageName, id, pageInfo)

      this.postPageListAction(pageName, { offset: 0, size: 10 })
    }
  }
})

export default useSystemStore
