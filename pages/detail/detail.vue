<template>
  <view class="detail-page">
    <!-- 顶部标题 -->
    <view class="header">
      <text class="header-title">{{ title }}</text>
    </view>

    <!-- 内容区域 -->
    <view class="content">
      <text class="content-text">{{ content }}</text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      content: ''
    }
  },
  onLoad(options) {
    // 获取上一个页面传过来的 type 参数
    const type = options.type;
    switch (type) {
      case 'verify':
        this.title = '手机号收不到验证码，无法登录';
        this.content = '如果无法接收验证码，可能是信号问题或运营商拦截，请尝试重新获取验证码或联系客服获取帮助。';
        break;
      case 'retrieveAccount':
        this.title = '找回原账号';
        this.content = '若想找回之前注册的账号，可通过绑定的手机号或邮箱或联系客服获取更多帮助。';
        break;
      case 'resetPassword':
        this.title = '找回密码';
        this.content = '在登录界面选择“忘记密码”，根据提示重置密码即可。';
        break;
      case 'limitedLogin':
        this.title = '登录时提示“已被限制登录或注册”';
        this.content = '若出现此提示，可能是账号存在异常操作或违规，请联系客服进行申诉。';
        break;
      case 'notMyAccount':
        this.title = '登录界面提示“请选择/不是我的账号”，怎么办？';
        this.content = '如果遇到该问题，说明当前设备已登录其他账号，需先退出后再登录或切换账号。';
        break;
      case 'accountIssue':
        this.title = '账号被盗/冻结了怎么办';
        this.content = '建议第一时间修改密码，并联系官方客服解冻或申诉。';
        break;
      default:
        this.title = '帮助详情';
        this.content = '未找到相关问题的详细信息，请联系客服获取更多帮助。';
        break;
    }
  }
}
</script>

<style scoped>
.detail-page {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #f5f5f5;
}

/* 顶部标题区域 */
.header {
  background-color: #fff;
  padding: 20rpx;
  border-bottom: 1rpx solid #ebebeb;
  text-align: center;
}
.header-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
}

/* 内容区域 */
.content {
  flex: 1;
  padding: 20rpx;
  background-color: #fff;
}
.content-text {
  font-size: 28rpx;
  line-height: 1.6;
  color: #666;
}
</style>