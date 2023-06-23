<template>
  <div class="department">
    <pageSearch
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    ></pageSearch>
    <pageContent
      ref="contentRef"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
    ></pageContent>
    <pageModal ref="modalRef"></pageModal>
  </div>
</template>

<script setup lang="ts" name="department">
import { ref } from 'vue'
import pageContent from './c-cpns/page-content.vue'
import pageSearch from './c-cpns/page-search.vue'
import pageModal from './c-cpns/page-modal.vue'

const contentRef = ref<InstanceType<typeof pageContent>>()

const modalRef = ref<InstanceType<typeof pageModal>>()
function handleNewClick() {
  modalRef.value?.setModelVisible()
}
function handleEditClick(itemData: any) {
  modalRef.value?.setModelVisible(false, itemData)
}
function handleQueryClick(queryInfo: any) {
  contentRef.value?.fetchPageListData(queryInfo)
}
function handleResetClick() {
  contentRef.value?.fetchPageListData()
}
</script>

<style scoped>
.department {
}
</style>
