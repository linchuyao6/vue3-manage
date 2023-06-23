<template>
  <div class="department">
    <pageSearch
      :search-config="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    ></pageSearch>
    <pageContent
      :content-config="contentConfig"
      ref="contentRef"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
    ></pageContent>
    <pageModal :modal-config="modalConfigRef" ref="modalRef"></pageModal>
  </div>
</template>

<script setup lang="ts" name="department">
import { computed, ref } from 'vue'
import contentConfig from './config/content.config'
import searchConfig from './config/search.config'
import modalConfig from './config/modal.config'
import pageSearch from '@/component/page-search/page-search.vue'
import pageContent from '@/component/page-content/page-content.vue'
import pageModal from '@/component/page-modal/page-model.vue'
import useMainStore from '@/stores/main/main'
import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'

const modalConfigRef = computed(() => {
  const mainStore = useMainStore()
  const department = mainStore.entireDepartments.map((item) => {
    return { label: item.name, value: item.id }
  })

  modalConfig.formList.forEach((item) => {
    if (item.prop === 'parentId') {
      item.options.push(...department)
    }
  })
  return modalConfig
})
const { contentRef, handleQueryClick, handleResetClick } = usePageContent()
const { modalRef, handleEditClick, handleNewClick } = usePageModal()
</script>

<style scoped></style>
