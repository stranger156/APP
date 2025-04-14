<template>
  <view class="logout-container">
    <!-- 背景动画 -->
    <view class="bg-animation">
      <view class="circle circle-1"></view>
      <view class="circle circle-2"></view>
      <view class="circle circle-3"></view>
    </view>
    
    <!-- 主内容 -->
    <view class="logout-content">
      <image 
        class="avatar" 
        src="/static/avatar.png" 
        mode="aspectFill"
      />
      <text class="username">{{ userInfo.nickname || '用户' }}</text>
      <text class="welcome-text">您确定要退出登录吗？</text>
      
      <button 
        class="logout-btn"
        @click="showConfirmDialog"
      >
        <uni-icons type="exit" size="18" color="#fff"></uni-icons>
        <text>退出登录</text>
      </button>
      
      <button 
        class="cancel-btn"
        @click="goBack"
      >
        取消
      </button>
    </view>
    
    <!-- 确认弹窗 -->
    <uni-popup ref="confirmDialog" type="dialog">
      <uni-popup-dialog 
        type="warn"
        title="确认退出"
        content="确定要退出当前账号吗？"
        @confirm="handleLogout"
        @cancel="closeDialog"
      ></uni-popup-dialog>
    </uni-popup>
  </view>
</template>

<script setup>
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

const userInfo = ref({
  nickname: '未登录用户',
  avatar: '/static/avatar.png'
});

const confirmDialog = ref(null);

// 获取用户信息
onLoad(() => {
  try {
    const info = uni.getStorageSync('userInfo');
    if (info) {
      userInfo.value = info;
    }
  } catch (e) {
    console.error('获取用户信息失败:', e);
  }
});

// 显示确认弹窗
const showConfirmDialog = () => {
  confirmDialog.value.open();
};

// 关闭弹窗
const closeDialog = () => {
  confirmDialog.value.close();
};

// 处理退出登录
const handleLogout = async () => {
  uni.showLoading({ title: '正在退出...', mask: true });
  
  try {
    // 这里替换为实际的退出登录API调用
    // await logoutApi();
    
    // 清除用户数据
    uni.removeStorageSync('token');
    uni.removeStorageSync('userInfo');
    
    // 跳转到登录页
    uni.reLaunch({
      url: '/pages/login/index'
    });
    
  } catch (error) {
    console.error('退出登录失败:', error);
    uni.showToast({
      title: '退出登录失败',
      icon: 'none'
    });
  } finally {
    uni.hideLoading();
  }
};

// 返回上一页
const goBack = () => {
  uni.navigateBack();
};
</script>

<style lang="scss" scoped>
.logout-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
}

.bg-animation {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 0;
  
  .circle {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(5px);
    
    &.circle-1 {
      width: 300rpx;
      height: 300rpx;
      top: -50rpx;
      left: -50rpx;
      animation: float 8s infinite ease-in-out;
    }
    
    &.circle-2 {
      width: 200rpx;
      height: 200rpx;
      bottom: 100rpx;
      right: -30rpx;
      animation: float 6s infinite ease-in-out 2s;
    }
    
    &.circle-3 {
      width: 150rpx;
      height: 150rpx;
      top: 40%;
      right: 20%;
      animation: float 5s infinite ease-in-out 1s;
    }
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) translateX(0);
  }
  50% {
    transform: translateY(-20rpx) translateX(20rpx);
  }
}

.logout-content {
  width: 80%;
  max-width: 500rpx;
  padding: 60rpx 40rpx;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 24rpx;
  box-shadow: 0 10rpx 30rpx rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
  backdrop-filter: blur(10px);
}
.logout-content {
  animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(50rpx);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.avatar {
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
  border: 4rpx solid #fff;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
  margin-bottom: 30rpx;
}

.username {
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 10rpx;
}

.welcome-text {
  font-size: 28rpx;
  color: #666;
  margin-bottom: 50rpx;
}

.logout-btn {
  width: 100%;
  height: 80rpx;
  background: linear-gradient(135deg, #ff6b6b 0%, #ff8e8e 100%);
  color: white;
  border: none;
  border-radius: 40rpx;
  font-size: 30rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30rpx;
  box-shadow: 0 4rpx 12rpx rgba(255, 107, 107, 0.3);
  transition: all 0.3s;
  
  &:active {
    transform: scale(0.98);
    opacity: 0.9;
  }
  
  text {
    margin-left: 10rpx;
  }
}

.cancel-btn {
  width: 100%;
  height: 80rpx;
  background: transparent;
  color: #666;
  border: 1rpx solid #ddd;
  border-radius: 40rpx;
  font-size: 30rpx;
  
  &:active {
    background-color: rgba(0, 0, 0, 0.05);
  }
}
</style>