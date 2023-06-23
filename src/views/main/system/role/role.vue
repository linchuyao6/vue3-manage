<template>
  <div class="role">
    <pageSearch
      :search-config="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
    <pageContent
      :content-config="contentConfig"
      ref="contentRef"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
    >
    </pageContent>
    <pageModal
      :modal-config="modalConfig"
      :other-info="otherInfo"
      ref="modalRef"
    >
      <template #menuList>
        <el-tree
          ref="treeRef"
          :data="entireMenus"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="handleEditClicklTreeChkck"
        />
      </template>
    </pageModal>
  </div>
</template>

<script setup lang="ts" name="role">
import contentConfig from './config/content.config'
import searchConfig from './config/search.config'
import modalConfig from './config/modal.config'
import pageSearch from '@/component/page-search/page-search.vue'
import pageContent from '@/component/page-content/page-content.vue'
import pageModal from '@/component/page-modal/page-model.vue'
import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'
import { mapMenuListToIds } from '@/utils/map-menus'

import useMainStore from '@/stores/main/main'
import { storeToRefs } from 'pinia'
import { ref, nextTick } from 'vue'
import type { ElTree } from 'element-plus'

const mainStorce = useMainStore()
const { entireMenus } = storeToRefs(mainStorce)
const { contentRef, handleQueryClick, handleResetClick } = usePageContent()
const { modalRef, handleEditClick, handleNewClick } = usePageModal(editCallback)

const otherInfo = ref({})
const treeRef = ref<InstanceType<typeof ElTree>>()

function handleEditClicklTreeChkck(data1: any, data2: any) {
  const menuList = [...data2.checkedKeys, ...data2.halfCheckedKeys]
  otherInfo.value = { menuList }
}
function editCallback(itemData: any) {
  nextTick(() => {
    const menuIds = mapMenuListToIds(itemData.menuList)
    treeRef.value?.setCheckedKeys(menuIds)
  })
}
</script>

<style scoped></style>
