<template>
  <div class="login-page">
    <div>
      <el-container class="common-layout1">
        <el-header class="login-head">
          <el-image class="head-logo" :src="logo" fit="fill" />
          <el-text class="head-text">欢迎使用医院管理系统</el-text>
        </el-header>
        <el-main class="login-body">
          <el-form label-position="top">
            <el-form-item label="账户">
              <el-input
                v-model="username"
                size="large"
                placeholder="请输入用户名"
              />
            </el-form-item>
            <el-form-item label="密码">
              <el-input
                v-model="password"
                size="large"
                placeholder="请输入密码"
              />
            </el-form-item>
          </el-form>
          <el-button
            @click="() => loginAction()"
            size="large"
            class="login-button"
            >登录</el-button
          >
        </el-main>
      </el-container>
    </div>
  </div>

  <el-dialog v-model="dialogVisible" title="提示" width="30%">
    <span>登录失败</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { reactive } from 'vue'
import logo from '../assets/image/logo1.png'
import { login } from '../service/api.js'
import router from '../router/index'

import { ElMessage } from 'element-plus'

const dialogVisible = ref(false)

const username = ref('admin')
const password = ref('123456')

const loginAction = async () => {
  const res = await login(username.value, password.value)
  // console.log(res)
  if (res.status === 'success') {
    sessionStorage.setItem('cookie', res.JSESSIONID)
    sessionStorage.setItem('login-status', res.status)
    ElMessage({
      message: '登录成功',
      type: 'success'
    })
    router.push('/home')
  } else {
    ElMessage({
      message: '登录失败,请检查用户名或密码',
      type: 'error'
    })
  }
}
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.login-page::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: url('@/assets/image/background1.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  z-index: -1;
  opacity: 0.5;
}

.common-layout1 {
  width: 400px;
  height: 450px;
  background-color: rgb(255, 255, 255, 0.9);
  border: 1px solid;
  border-color: #b1b3b8;
}

.login-head {
  display: flex;
  padding: 10px;
  height: 120px;
  width: 400px;
}

.head-logo {
  width: 100px;
  height: 100px;
}

.head-text {
  width: 260px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  font-size: 22px;
  font-weight: bold;
}

.login-body {
  display: flex;
  flex-direction: column;
  padding: 30px;
  height: 310px;
  width: 400px;
}
</style>
