import useLoginStore from '@/stores/login/login'

function usePermissions(permissionsID: string) {
  const loginStore = useLoginStore()
  const { permissions } = loginStore
  return !!permissions.find((item) => item.includes(permissionsID))
}

export default usePermissions
