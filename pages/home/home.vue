<template>  
  <view class="userLayout pageBg">
    <!-- 用户信息卡片 -->
    <view class="user-card">
      <view class="userInfo">
        <view class="avatar">
          <image src="/static/wechat_icon.png" mode="aspectFit"></image>
          <view class="edit-icon" @click="handleEditAvatar">
            <uni-icons type="compose" size="18" color="#fff"></uni-icons>
          </view>
        </view>
        <view class="nickname">金方琢</view>
        <view class="user-desc">钢琴教师 | 教龄5年</view>
      </view>
      
      <!-- 数据统计 -->
      <view class="stats-container">
        <view class="stat-item" @click="navigateTo('/pages/MyClasses/MyClasses')">
          <view class="stat-value">33</view>
          <view class="stat-label">学员</view>
        </view>
        <view class="stat-item" @click="navigateTo('/pages/ClassStat/ClassStat')">
          <view class="stat-value">128</view>
          <view class="stat-label">课程</view>
        </view>
        <view class="stat-item" @click="navigateTo('/pages/UserFeedback/UserFeedback')">
          <view class="stat-value">4.9</view>
          <view class="stat-label">评分</view>
        </view>
      </view>
    </view>
    
    <!-- 功能菜单 -->
    <view class="menu-container">
      <!-- 第一组菜单 -->
      <view class="menu-group">
        <view class="group-title">教学管理</view>
        <navigator url="/pages/MyClasses/MyClasses" hover-class="menu-item-hover" hover-stay-time="100">
          <view class="menu-item">
            <view class="item-left">
              <view class="item-icon" style="background-color: #ff9a9e;">
                <uni-icons type="checkbox-filled" size="20" color="#fff"></uni-icons>
              </view>
              <view class="item-text">我的学员</view>
            </view>
            <uni-icons type="forward" size="18" color="#c8c9cc"></uni-icons>
          </view>
        </navigator>
        
        <navigator url="/pages/ClassStat/ClassStat" hover-class="menu-item-hover" hover-stay-time="100">
          <view class="menu-item">
            <view class="item-left">
              <view class="item-icon" style="background-color: #a18cd1;">
                <uni-icons type="info-filled" size="20" color="#fff"></uni-icons>
              </view>
              <view class="item-text">课程统计</view>
            </view>
            <uni-icons type="forward" size="18" color="#c8c9cc"></uni-icons>
          </view>
        </navigator>
      </view>
      
      <!-- 第二组菜单 -->
      <view class="menu-group">
        <view class="group-title">账户设置</view>
        <navigator url="/pages/UserCenter/UserCenter" hover-class="menu-item-hover" hover-stay-time="100">
          <view class="menu-item">
            <view class="item-left">
              <view class="item-icon" style="background-color: #fbc2eb;">
                <uni-icons type="contact-filled" size="20" color="#fff"></uni-icons>
              </view>
              <view class="item-text">用户中心</view>
            </view>
            <uni-icons type="forward" size="18" color="#c8c9cc"></uni-icons>
          </view>
        </navigator>
      </view>
      
      <!-- 第三组菜单 -->
      <view class="menu-group">
        <view class="group-title">其他</view>
        <navigator url="/pages/UserFeedback/UserFeedback" hover-class="menu-item-hover" hover-stay-time="100">
          <view class="menu-item">
            <view class="item-left">
              <view class="item-icon" style="background-color: #84fab0;">
                <uni-icons type="chat-filled" size="20" color="#fff"></uni-icons>
              </view>
              <view class="item-text">用户反馈</view>
            </view>
            <uni-icons type="forward" size="18" color="#c8c9cc"></uni-icons>
          </view>
        </navigator>
        
        <navigator url="/pages/AboutUs/AboutUs" hover-class="menu-item-hover" hover-stay-time="100">
          <view class="menu-item">
            <view class="item-left">
              <view class="item-icon" style="background-color: #a6c1ee;">
                <uni-icons type="info-filled" size="20" color="#fff"></uni-icons>
              </view>
              <view class="item-text">关于我们</view>
            </view>
            <uni-icons type="forward" size="18" color="#c8c9cc"></uni-icons>
          </view>
        </navigator>
        
        <view class="menu-item" @click="handleLogout">
          <view class="item-left">
            <view class="item-icon" style="background-color: #ff9a9e;">
              <uni-icons type="minus-filled" size="20" color="#fff"></uni-icons>
            </view>
            <view class="item-text">退出登录</view>
          </view>
          <uni-icons type="forward" size="18" color="#c8c9cc"></uni-icons>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

const handleEditAvatar = () => {
  uni.showToast({
    title: '点击了编辑头像',
    icon: 'none'
  })
}

const handleLogout = () => {
  uni.showModal({
    title: '提示',
    content: '确定要退出登录吗？',
    success: (res) => {
      if (res.confirm) {
        uni.redirectTo({
          url: '/pages/login/login'
        })
      }
    }
  })
}

const navigateTo = (url) => {
  uni.navigateTo({ url })
}
</script>

<style lang="scss" scoped>
@import "../../common/base-style.scss";

.userLayout {
  background: linear-gradient(to bottom, #f5f7fa 0%, #f5f7fa 200rpx, #ffffff 200rpx);
  min-height: 100vh;
  padding-bottom: 40rpx;
  
  .user-card {
    background: #ffffff;
    border-radius: 20rpx;
    margin: 30rpx;
    padding: 40rpx 30rpx 30rpx;
    box-shadow: 0 10rpx 30rpx rgba(0, 0, 0, 0.05);
    position: relative;
    z-index: 1;
    
    .userInfo {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-bottom: 30rpx;
      
      .avatar {
        width: 160rpx;
        height: 160rpx;
        border-radius: 50%;
        overflow: hidden;
        position: relative;
        border: 6rpx solid rgba($brand-theme-color, 0.2);
        
        image {
          width: 100%;
          height: 100%;
        }
        
        .edit-icon {
          position: absolute;
          right: 0;
          bottom: 0;
          width: 50rpx;
          height: 50rpx;
          background: $brand-theme-color;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
      
      .nickname {
        font-size: 36rpx;
        font-weight: bold;
        color: #333;
        margin-top: 20rpx;
      }
      
      .user-desc {
        font-size: 24rpx;
        color: #999;
        margin-top: 10rpx;
      }
    }
    
    .stats-container {
      display: flex;
      justify-content: space-around;
      padding: 30rpx 0 10rpx;
      border-top: 1rpx solid #f5f5f5;
      
      .stat-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        
        .stat-value {
          font-size: 36rpx;
          font-weight: bold;
          color: $brand-theme-color;
        }
        
        .stat-label {
          font-size: 24rpx;
          color: #999;
          margin-top: 10rpx;
        }
      }
    }
  }
  
  .menu-container {
    margin: 0 30rpx;
    
    .menu-group {
      background: #ffffff;
      border-radius: 20rpx;
      margin-bottom: 30rpx;
      overflow: hidden;
      box-shadow: 0 10rpx 30rpx rgba(0, 0, 0, 0.05);
      
      .group-title {
        padding: 20rpx 30rpx;
        font-size: 26rpx;
        color: #999;
        border-bottom: 1rpx solid #f5f5f5;
      }
      
      .menu-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 25rpx 30rpx;
        transition: all 0.3s;
        
        .item-left {
          display: flex;
          align-items: center;
          
          .item-icon {
            width: 60rpx;
            height: 60rpx;
            border-radius: 16rpx;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 20rpx;
          }
          
          .item-text {
            font-size: 30rpx;
            color: #333;
          }
        }
      }
      
      .menu-item-hover {
        background-color: #f5f7fa;
      }
    }
  }
}
</style>