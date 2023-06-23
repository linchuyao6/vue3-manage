<template>
  <div class="crumb">
    <el-breadcrumb separator-icon="CaretRight">
      <template v-for="item in breadcrumbs" :key="item.name">
        <el-breadcrumb-item :to="item.path">{{ item.name }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import useLoginStore from '@/stores/login/login'
import { mapPathToBreadcrumbs } from '@/utils/map-menus'
import { watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import type { IBreadcrumbs } from '@/utils/map-menus'

const route = useRoute()
const userMenus = useLoginStore().userMenus
let breadcrumbs = ref<IBreadcrumbs[]>()

watch(
  () => route.path,
  (newValue) => {
    breadcrumbs.value = mapPathToBreadcrumbs(newValue, userMenus)
  },
  { immediate: true }
)
</script>

<style lang="less" scoped>
.crumb {
}
</style>
