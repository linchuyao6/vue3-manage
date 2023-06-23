<template>
  <div class="user">
    <userSearch @query-click="handleQueryClick" @reset-click="handleResetClick">
    </userSearch>
    <userContent
      ref="contentRef"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
    ></userContent>
    <userModal ref="modalRef"></userModal>
  </div>
</template>

<script setup lang="ts" name="user">
import userSearch from './c-cpns/user-search.vue'
import userContent from './c-cpns/user-content.vue'
import userModal from './c-cpns/user-modal.vue'
import { ref } from 'vue'

const contentRef = ref<InstanceType<typeof userContent>>()
const modalRef = ref<InstanceType<typeof userModal>>()

function handleQueryClick(formData: any) {
  contentRef.value?.fetchUserListData(formData)
}
function handleResetClick() {
  contentRef.value?.fetchUserListData()
}
function handleNewClick() {
  modalRef.value?.setModelVisible()
}
function handleEditClick(itemData: any) {
  modalRef.value?.setModelVisible(false, itemData)
}
</script>

<style scoped>
.user {
  border-radius: 8px;
  overflow: hidden;
}
</style>
