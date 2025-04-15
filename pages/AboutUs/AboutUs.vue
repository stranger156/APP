<template>
  <view class="about-page" :class="{ 'dark-mode': isDark }">
    <!-- 顶部品牌区 -->
    <view class="header">
      <image class="logo" src="/static/logo.png" mode="aspectFit" />
      <text class="app-name">智课魔方</text>
      <text class="slogan">让教学排课更简单</text>
    </view>

    <!-- 主体内容 -->
    <scroll-view scroll-y class="content">
      <!-- 版本信息 -->
      <view class="card">
        <view class="card-title">
          <uni-icons type="info" size="18" color="#666" />
          <text>版本信息</text>
        </view>
        <view class="card-content">
          <text>当前版本：v{{ version }}</text>
          <button class="mini-btn" @click="checkUpdate">检查更新</button>
        </view>
      </view>

      <!-- 功能介绍 -->
      <view class="card">
        <view class="card-title">
          <uni-icons type="star" size="18" color="#666" />
          <text>产品介绍</text>
        </view>
        <view class="card-content">
          <text>这是一款基于Uniapp开发的跨平台应用，主打极简设计和隐私保护，为您提供高效便捷的服务体验。</text>
        </view>
      </view>

      <!-- 联系方式 -->
      <view class="card">
        <view class="card-title">
          <uni-icons type="mail" size="18" color="#666" />
          <text>联系我们</text>
        </view>
        <view class="card-content contact-methods">
          <view @click="copyText('contact@example.com')">
            <uni-icons type="email" size="16" />
            <text>邮箱：contact@example.com</text>
          </view>
          <view @click="openLink('https://weibo.com/yourpage')">
            <uni-icons type="weibo" size="16" />
            <text>微博：@官方账号</text>
          </view>
        </view>
      </view>

      <!-- 法律条款 -->
      <view class="legal-links">
        <text @click="navigateTo('/pages/agreement')">用户协议</text>
        <text>|</text>
        <text @click="navigateTo('/pages/privacy')">隐私政策</text>
        <text>|</text>
        <text @click="navigateTo('/pages/disclaimer')">免责声明</text>
      </view>

      <!-- 版权信息 -->
      <view class="copyright">
        <text>© {{ new Date().getFullYear() }} 公司名称 版权所有</text>
      </view>
    </scroll-view>

    <!-- 主题切换按钮 -->
    <view class="theme-switch" @click="toggleDarkMode">
      <uni-icons :type="isDark ? 'sun' : 'moon'" size="20" />
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

const version = ref('1.0.0');
const isDark = ref(false);

// 检查更新
const checkUpdate = () => {
  uni.showToast({
    title: '已是最新版本',
    icon: 'none'
  });
};

// 复制文本
const copyText = (text) => {
  uni.setClipboardData({
    data: text,
    success: () => {
      uni.showToast({ title: '已复制' });
    }
  });
};

// 打开外部链接
const openLink = (url) => {
  uni.setClipboardData({
    data: url,
    success: () => {
      uni.showToast({ title: '链接已复制' });
    }
  });
};

// 导航跳转
const navigateTo = (path) => {
  uni.navigateTo({ url: path });
};

// 切换暗黑模式
const toggleDarkMode = () => {
  isDark.value = !isDark.value;
  uni.setStorageSync('darkMode', isDark.value);
};

onLoad(() => {
  isDark.value = uni.getStorageSync('darkMode') || false;
});
</script>

<style lang="scss">
/* 基础样式 */
.about-page {
  min-height: 100vh;
  padding: 20rpx;
  background-color: #f5f5f5;
  transition: background-color 0.3s;

  &.dark-mode {
    background-color: #121212;
    color: #e0e0e0;

    .card {
      background-color: #1e1e1e;
      border-color: #333;
    }
  }
}

.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40rpx 0;

  .logo {
    width: 120rpx;
    height: 120rpx;
    border-radius: 24rpx;
  }

  .app-name {
    font-size: 36rpx;
    font-weight: bold;
    margin-top: 20rpx;
  }

  .slogan {
    font-size: 24rpx;
    color: #888;
    margin-top: 10rpx;
  }
}

.card {
  background-color: #fff;
  border-radius: 16rpx;
  padding: 24rpx;
  margin-bottom: 24rpx;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.05);

  &-title {
    display: flex;
    align-items: center;
    font-size: 28rpx;
    font-weight: bold;
    margin-bottom: 20rpx;
    color: #333;

    .dark-mode & {
      color: #ccc;
    }

    uni-icons {
      margin-right: 10rpx;
    }
  }

  &-content {
    font-size: 26rpx;
    line-height: 1.6;

    .mini-btn {
      display: inline-block;
      margin-left: 20rpx;
      padding: 0 20rpx;
      height: 50rpx;
      line-height: 50rpx;
      font-size: 24rpx;
    }
  }

  .contact-methods view {
    display: flex;
    align-items: center;
    margin: 15rpx 0;
    padding: 10rpx 0;

    uni-icons {
      margin-right: 10rpx;
    }
  }
}

.legal-links {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  font-size: 24rpx;
  color: #666;
  margin: 30rpx 0;

  text {
    margin: 0 15rpx;
    &:active {
      color: #007aff;
    }
  }
}

.copyright {
  text-align: center;
  font-size: 22rpx;
  color: #999;
  padding: 20rpx 0;
}

.theme-switch {
  position: fixed;
  right: 30rpx;
  bottom: 30rpx;
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);

  .dark-mode & {
    background-color: #333;
  }
}
</style>