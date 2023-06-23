<template>
  <div class="pane-phone">
    <el-form ref="formRef" label-width="60px" size="large" status-icon>
      <el-form-item label="手机号" prop="name">
        <el-input />
      </el-form-item>
      <el-form-item label="验证码" prop="password">
        <div class="verify-code">
          <el-input />
          <el-button type="primary" class="get-btn"> 获取验证码 </el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.pane-phone {
  .verify-code {
    display: flex;
    .get-btn {
      margin-left: 8px;
    }
  }
}
</style>
