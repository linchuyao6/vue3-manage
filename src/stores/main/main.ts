import { defineStore } from 'pinia'
import {
  getEntireDepartments,
  getEntireRole,
  getEntireMenus
} from '@/services/main/main'

interface IMainState {
  entireRoles: any[]
  entireDepartments: any[]
  entireMenus: any[]
}

const useMainStore = defineStore('main', {
  state: (): IMainState => ({
    entireRoles: [],
    entireDepartments: [],
    entireMenus: []
  }),
  actions: {
    async fetchEntireDataAction() {
      const rolesResult = await getEntireRole()
      const departmentResult = await getEntireDepartments()
      const menuResult = await getEntireMenus()
      this.entireRoles = rolesResult.data.list
      this.entireDepartments = departmentResult.data.list
      this.entireMenus = menuResult.data.list
    }
  }
})

export default useMainStore
