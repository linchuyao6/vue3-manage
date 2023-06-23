<template>
  <div class="pane-account">
    <el-form
      ref="formRef"
      :model="account"
      label-width="60px"
      size="large"
      status-icon
      :rules="accountRules"
    >
      <el-form-item label="帐号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import type { FormRules, FormInstance } from 'element-plus'
import type { IAccunt } from '@/types'
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import useLoginStore from '@/stores/login/login'
import { localCache } from '@/utils/cache'

const formRef = ref<FormInstance>()
// 定义account数据
const account = reactive<IAccunt>({
  name: localCache.getCache('name') ?? '',
  password: localCache.getCache('password') ?? ''
})

// 定义规则
const accountRules: FormRules = {
  name: [
    { required: true, message: '必须输入账号信息～', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{6,20}$/,
      message: '必须是6～20数字或字母组成～',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '必须输入密码信息～', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: '必须是3位以上的数字或者字母组成',
      trigger: 'blur'
    }
  ]
}
// 账号的登录逻辑
const loginStore = useLoginStore()
function loginAction(isRemPwd: boolean) {
  formRef.value?.validate((valid, fields) => {
    if (valid) {
      const name = account.name
      const password = account.password
      loginStore.loginAccountAction({ name, password }).then(() => {
        if (isRemPwd) {
          localCache.setCache('name', name)
          localCache.setCache('password', password)
        } else {
          localCache.removeCache('name')
          localCache.removeCache('password')
        }
      })
    } else {
      ElMessage.error('Oops,请您输入正确的格式再操作')
    }
  })
}
defineExpose({
  loginAction
})
</script>

<style lang="less" scoped>
.pane-account {
  color: skyblue;
}
</style>
