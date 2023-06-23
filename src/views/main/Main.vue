<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isFold ? '60px' : '210px'">
        <MainMenu :is-fold="isFold"></MainMenu>
      </el-aside>
      <el-container>
        <el-header height="50px">
          <MainHeader @fold-change="handleFoldChangde"></MainHeader>
        </el-header>
        <el-main>
          <RouterView></RouterView>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import MainMenu from '@/component/main-menu/main-menu.vue'
import MainHeader from '@/component/main-header/main-header.vue'
import { ref } from 'vue'

const isFold = ref(false)
function handleFoldChangde(flag: boolean) {
  isFold.value = flag
}
</script>

<style lang="less" scoped>
.main {
  height: 100%;
  .main-content {
    height: 100%;
    .el-aside {
      overflow-x: hidden;
      overflow-y: auto;
      line-height: 200px;
      text-align: left;
      cursor: pointer;
      background-color: #001529;
      scrollbar-width: none; /* firefox */
      -ms-overflow-style: none; /* IE 10+ */
      &::-webkit-scrollbar {
        display: none;
      }
      transition: width 0.3s ease;
    }
    .el-main {
      background-color: #f0f2f5;
    }
  }
}
</style>
