<template>
  <div class="login_panel">
    <!-- 顶部的标题 -->
    <h1 class="title">晴天后台管理项目</h1>
    <!--中间的tab切换 -->
    <div class="tabs">
      <el-tabs type="border-card" stretch v-model="activeName">
        <!-- 账号登陆 -->
        <el-tab-pane name="account">
          <template #label>
            <div class="label">
              <el-icon size="large">
                <UserFilled />
              </el-icon>
              <span class="text"> 帐户登录 </span>
            </div>
          </template>
          <paneAccount ref="accountRef"></paneAccount>
        </el-tab-pane>
        <!-- 手机登陆 -->
        <el-tab-pane name="phone">
          <template #label>
            <div class="label">
              <el-icon size="large"> <Cellphone /></el-icon>
              <span class="text"> 手机登陆 </span>
            </div>
          </template>
          <panePhone></panePhone>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 底部区域 -->
    <div class="controls">
      <el-checkbox v-model="rememberPassword" label="记住密码" size="large" />
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button
      class="login-btn"
      type="primary"
      size="large"
      @click="handleLoginBtnClick"
      >立即登陆</el-button
    >
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import paneAccount from './pane-account.vue'
import panePhone from './pane-phone.vue'
import { localCache } from '@/utils/cache'

const rememberPassword = ref<boolean>(localCache.getCache('isRemPwd') ?? false)
const activeName = ref('account')
const accountRef = ref<InstanceType<typeof paneAccount>>()
watch(rememberPassword, (newValue) => {
  localCache.setCache('isRemPwd', newValue)
})
function handleLoginBtnClick() {
  if (activeName.value === 'account') {
    accountRef.value?.loginAction(rememberPassword.value)
  } else {
    console.log('用户再手机登录')
  }
}
</script>

<style lang="less" scoped>
.login_panel {
  width: 330px;
  margin-bottom: 150px;
  .title {
    text-align: center;
    margin-bottom: 15px;
  }
  .label {
    display: flex;
    align-items: center;
    justify-content: center;
    .text {
      margin-left: 5px;
    }
  }
  .controls {
    display: flex;
    margin-top: 12px;
    justify-content: space-between;
  }
  .login-btn {
    margin-top: 10px;
    width: 100%;
  }
}
</style>
