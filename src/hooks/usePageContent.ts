import pageContent from '@/component/page-content/page-content.vue'
import { ref } from 'vue'

function usePageContent() {
  const contentRef = ref<InstanceType<typeof pageContent>>()

  function handleQueryClick(queryInfo: any) {
    contentRef.value?.fetchPageListData(queryInfo)
  }
  function handleResetClick() {
    contentRef.value?.fetchPageListData()
  }
  return {
    contentRef,
    handleQueryClick,
    handleResetClick
  }
}
export default usePageContent
