<template>
	
			<image class="logo" src="/static/login.png"></image>
  <view class="container">
    <!-- 登录注册切换 -->
    <view class="tabs">
      <text 
        :class="['tab-item', activeTab === 0 ? 'active' : '']"
        @click="switchTab(0)"
      >登录</text>
      <text 
        :class="['tab-item', activeTab === 1 ? 'active' : '']"
        @click="switchTab(1)"
      >注册</text>
    </view>

    <!-- 登录表单 -->
    <view v-if="activeTab === 0" class="form-container">
      <input 
        class="input" 
        type="text" 
        placeholder="请输入用户名" 
        v-model="loginForm.username"
      />
      <input 
        class="input" 
        type="password" 
        placeholder="请输入密码" 
        v-model="loginForm.password"
      />
      <button class="btn" type="primary" @click="handleLogin">立即登录</button>
      <text class="tips">忘记密码？</text>
    </view>

    <!-- 注册表单 -->
    <view v-if="activeTab === 1" class="form-container">
      <input 
        class="input" 
        type="text" 
        placeholder="请输入用户名" 
        v-model="registerForm.username"
      />
      <input 
        class="input" 
        type="password" 
        placeholder="请输入密码" 
        v-model="registerForm.password"
      />
      <input 
        class="input" 
        type="password" 
        placeholder="请确认密码" 
        v-model="registerForm.confirmPassword"
      />
      <input 
        class="input" 
        type="number" 
        placeholder="请输入手机号" 
        v-model="registerForm.phone"
      />
      <button class="btn" type="primary" @click="handleRegister">立即注册</button>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive } from 'vue'

// 响应式状态
const activeTab = ref(0)
const loginForm = reactive({
  username: '',
  password: ''
})
const registerForm = reactive({
  username: '',
  password: '',
  confirmPassword: '',
  phone: ''
})

// 方法
const switchTab = (index) => {
  activeTab.value = index
}

// 登录逻辑
const handleLogin = async () => {
  if (!loginForm.username || !loginForm.password) {
    uni.showToast({ title: '请填写完整信息', icon: 'none' })
    return
  }

  try {
    uni.showLoading({ title: '登录中...' })
    // 模拟 API 调用
    await new Promise(resolve => setTimeout(resolve, 1500))
    uni.showToast({ title: '登录成功' })
    // 实际跳转逻辑
    // uni.navigateTo({ url: '/pages/index/index' })
  } catch (error) {
    uni.showToast({ title: '登录失败', icon: 'error' })
  } finally {
    uni.hideLoading()
  }
}

// 注册逻辑
const handleRegister = async () => {
  const { username, password, confirmPassword, phone } = registerForm

  if (!username || !password || !confirmPassword || !phone) {
    uni.showToast({ title: '请填写完整信息', icon: 'none' })
    return
  }

  if (password !== confirmPassword) {
    uni.showToast({ title: '两次密码输入不一致', icon: 'none' })
    return
  }

  if (!/^1[3-9]\d{9}$/.test(phone)) {
    uni.showToast({ title: '手机号格式不正确', icon: 'none' })
    return
  }

  try {
    uni.showLoading({ title: '注册中...' })
    // 模拟 API 调用
    await new Promise(resolve => setTimeout(resolve, 1500))
    uni.showToast({ title: '注册成功' })
    activeTab.value = 0 // 切换到登录
    Object.assign(registerForm, {
      username: '',
      password: '',
      confirmPassword: '',
      phone: ''
    })
  } catch (error) {
    uni.showToast({ title: '注册失败', icon: 'error' })
  } finally {
    uni.hideLoading()
  }
}
</script>

<style scoped>
/* 样式保持不变，同选项式 API 版本 */
.logo{
	width: 100%;
}
.container {
  padding: 40rpx;
}

.tabs {
  display: flex;
  justify-content: center;
  margin-bottom: 60rpx;
}

.tab-item {
  margin: 0 40rpx;
  font-size: 36rpx;
  color: #666;
  padding-bottom: 10rpx;
}

.tab-item.active {
  color: #007AFF;
  border-bottom: 4rpx solid #007AFF;
}

.form-container {
  display: flex;
  flex-direction: column;
}

.input {
  height: 100rpx;
  border-bottom: 2rpx solid #eee;
  margin-bottom: 40rpx;
  padding: 0 20rpx;
}

.btn {
  margin-top: 60rpx;
  height: 100rpx;
  line-height: 100rpx;
}

.tips {
  color: #007AFF;
  font-size: 28rpx;
  text-align: center;
  margin-top: 40rpx;
}
</style>