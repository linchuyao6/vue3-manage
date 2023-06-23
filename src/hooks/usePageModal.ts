import pageModal from '@/component/page-modal/page-model.vue'
import { ref } from 'vue'

type EditFnType = (data: any) => void

function usePageModal(editCallBack?: EditFnType) {
  const modalRef = ref<InstanceType<typeof pageModal>>()
  function handleNewClick() {
    modalRef.value?.setModelVisible()
  }
  function handleEditClick(itemData: any) {
    modalRef.value?.setModelVisible(false, itemData)
    if (editCallBack) editCallBack(itemData)
  }
  return {
    modalRef,
    handleEditClick,
    handleNewClick
  }
}

export default usePageModal
