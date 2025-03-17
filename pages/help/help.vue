<template>
  <view class="help-center">
    <!-- 顶部标题（若已在pages.json配置navigationBarTitleText，可省略本地标题） -->
    <view class="header">
      <text class="header-title">遇到问题</text>
    </view>

    <!-- 内容区域 -->
    <view class="content">
      <!-- 列表项1：手机号收不到验证码 -->
      <view class="item" @tap="goToPage('/pages/detail/detail?type=verify')">
        <view class="item-top">
          <text class="item-title">手机号收不到验证码，无法登录</text>
          <text class="item-tag">NEW</text>
        </view>
        <view class="item-desc">
          如果无法接收验证码，可能是信号问题或运营商拦截，可尝试重新获取或联系客服。
        </view>
      </view>

      <!-- 列表项2：找回原账号 -->
      <view class="item" @tap="goToPage('/pages/detail/detail?type=retrieveAccount')">
        <view class="item-top">
          <text class="item-title">找回原账号</text>
        </view>
        <view class="item-desc">
          若想找回之前注册的账号，可通过绑定的手机号/邮箱或联系客服协助找回。
        </view>
      </view>

      <!-- 列表项3：找回密码 -->
      <view class="item" @tap="goToPage('/pages/detail/detail?type=resetPassword')">
        <view class="item-top">
          <text class="item-title">找回密码</text>
        </view>
        <view class="item-desc">
          在登录界面选择“忘记密码”，根据提示重置密码即可。
        </view>
      </view>

      <!-- 列表项4：已被限制登录或注册 -->
      <view class="item" @tap="goToPage('/pages/detail/detail?type=limitedLogin')">
        <view class="item-top">
          <text class="item-title">登录时提示“已被限制登录或注册”</text>
        </view>
        <view class="item-desc">
          若出现此提示，可能是账号存在异常操作或违规，可尝试联系客服进行申诉。
        </view>
      </view>

      <!-- 列表项5：不是我的账号 -->
      <view class="item" @tap="goToPage('/pages/detail/detail?type=notMyAccount')">
        <view class="item-top">
          <text class="item-title">登录界面提示“请选择/不是我的账号”，怎么办？</text>
        </view>
        <view class="item-desc">
          如果遇到该问题，说明当前设备已登录其他账号，需先退出后再登录或切换账号。
        </view>
      </view>

      <!-- 列表项6：账号被盗/冻结 -->
      <view class="item" @tap="goToPage('/pages/detail/detail?type=accountIssue')">
        <view class="item-top">
          <text class="item-title">账号被盗/冻结了怎么办</text>
        </view>
        <view class="item-desc">
          建议第一时间修改密码，并联系官方客服解冻或申诉。
        </view>
      </view>
    </view>

    <!-- 底部“联系在线客服”按钮 -->
    <view class="footer">
      <button class="contact-btn" @tap="contactSupport">联系在线客服</button>
    </view>
  </view>
</template>

<script>
export default {
  methods: {
    // 跳转到指定页面（注意：若目标页面为tabBar页面请使用uni.switchTab）
    goToPage(url) {
      uni.navigateTo({
        url: url
      })
    },
    // 联系在线客服的事件处理
    contactSupport() {
      uni.showToast({
        title: '跳转到客服界面',
        icon: 'none'
      })
    }
  }
}
</script>

<style scoped>
/* 整体布局 */
.help-center {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #fff;
}

/* 顶部标题 */
.header {
  background-color: #fff;
  padding: 20rpx;
  border-bottom: 1rpx solid #ebebeb;
  text-align: center;
}
.header-title {
  font-size: 32rpx;
  font-weight: bold;
}

/* 内容区域 */
.content {
  flex: 1;
  padding: 20rpx;
}

/* 列表项样式 */
.item {
  background-color: #fff;
  padding: 16rpx;
  margin-bottom: 16rpx;
  border-radius: 8rpx;
}
.item-top {
  display: flex;
  align-items: center;
  margin-bottom: 6rpx;
}
.item-title {
  font-size: 30rpx;
  font-weight: 600;
  color: #333;
}
.item-tag {
  margin-left: 10rpx;
  font-size: 24rpx;
  color: #fff;
  background-color: #fa5151;
  padding: 4rpx 10rpx;
  border-radius: 12rpx;
}
.item-desc {
  font-size: 26rpx;
  color: #666;
  line-height: 1.4;
}

/* 底部区域 */
.footer {
  background-color: #fff;
  padding: 16rpx;
  text-align: center;
}
.contact-btn {
  display: inline-block;
  width: 100%;
  padding: 16rpx 0;
  border: none;
  border-radius: 8rpx;
  background-color: #07c160;
  color: #fff;
  font-size: 30rpx;
}
</style>
