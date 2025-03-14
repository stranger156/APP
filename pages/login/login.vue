<template>
  <view class="container">
    <!-- 顶部导航栏 -->
    <view class="header">
      <view class="close-icon" @click="closePage">×</view>
      <view class="help-text" @click="showHelp">帮助</view>
    </view>
    <!-- 标题 -->
    <view class="title">欢迎登录智课魔方</view>
<br />


    <!-- 手机号输入框 -->
    <view class="input-group">
      <view class="prefix">+86</view>
      <view class="divider">></view>
      <input type="number" placeholder="请输入手机号" v-model="phoneNumber" />
    </view>
    <!-- 密码输入框 -->
    <view class="input-group password-input">
      <input type="password" :type="passwordVisible? 'text' : 'password'" placeholder="请输入密码" v-model="password" />
      <view class="eye-icon" @click="togglePasswordVisibility">
        <image :src="passwordVisible? '/static/eye_open.png' : '/static/eye_close.png'" mode="aspectFit"></image>
      </view>
    </view>
    <!-- 登录按钮 -->
	<br />
    <button class="login-button" @click="login">登录</button>
    <!-- 其他登录方式及问题反馈 -->
    <view class="other-login">
      <view class="verification-code" @click="verificationCodeLogin">验证码登录</view>
      <view class="problem" @click="handleProblem">遇到问题</view>
    </view>
    <!-- 第三方登录方式 -->
    <view class="third-party-login">
      <view class="third-party-item"  @click="wechatLogin">
        <image  style="width: 30px;" src="/static/wechat_icon.png" mode="aspectFit"></image>
      </view>
      <view class="third-party-item"  @click="qqLogin">
        <image  style="width: 30px;" src="/static/qq_icon.png" mode="aspectFit"></image>
      </view>
    </view>
    <!-- 协议提示 -->
    <view class="agreement">
      登录代表同意智课魔方用户协议、隐私政策，并授权使用您的智课魔方账号信息（如昵称、头像）以便您统一管理
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';

// 数据定义
const phoneNumber = ref('');
const password = ref('');
const passwordVisible = ref(false);

// 关闭页面方法
const closePage = () => {
  uni.navigateBack();
};

// 显示帮助信息方法
const showHelp = () => {
  uni.showToast({
    title: '此处应跳转到帮助页面',
    icon: 'none'
  });
};

// 切换密码可见性方法
const togglePasswordVisibility = () => {
  passwordVisible.value =!passwordVisible.value;
};

// 登录方法
const login = () => {
  if (!phoneNumber.value ||!password.value) {
    uni.showToast({
      title: '请输入手机号和密码',
      icon: 'none'
    });
    return;
  }
  uni.showToast({
    title: '登录成功（模拟）',
    icon:'success'
  });
};

// 验证码登录方法
const verificationCodeLogin = () => {
  uni.showToast({
    title: '跳转到验证码登录页面',
    icon: 'none'
  });
};

// 处理遇到问题方法
const handleProblem = () => {
  uni.showToast({
    title: '显示问题反馈相关内容',
    icon: 'none'
  });
};

// 微信登录方法
const wechatLogin = () => {
  uni.showToast({
    title: '调用微信登录接口',
    icon: 'none'
  });
};

// QQ 登录方法
const qqLogin = () => {
  uni.showToast({
    title: '调用 QQ 登录接口',
    icon: 'none'
  });
};
</script>

<style scoped>
.container {
  padding: 20px;
  background-color: #ffffff;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.close-icon {
  font-size: 24px;
  cursor: pointer;
}
.help-text {
  font-size: 14px;
  color: #007aff;
  cursor: pointer;
}
.title {
  font-size: 24px;
  font-weight: bold;
  margin: 20px 0;
  text-align: center;
}
.input-group {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
  margin-bottom: 20px;
}
.prefix {
  margin-right: 10px;
}
.divider {
  margin: 0 10px;
}
input {
  flex: 1;
  border: none;
  outline: none;
}
.password-input {
  position: relative;
}
.eye-icon {
  position: absolute;
  right: 0;
  cursor: pointer;
  padding: 10px;
}
.login-button {
  background-color: #FFE4B5;
  color: #333;
  border-width: 50px;
  padding: 5px;
  border-radius: 10px;
  margin-bottom: 20px;
}
.other-login {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0;
}
.verification-code,
.problem {
  font-size: 14px;
  color: #007aff;
  cursor: pointer;
}
.third-party-login {
  display: flex;
  justify-content: center;
  margin-bottom: 0;
}
.third-party-item {
  margin: -60px 10px;
}
.agreement {
  font-size: 12px;
  text-align: center;
  color: #666;
  margin-bottom: 10px;
  
  }
</style>