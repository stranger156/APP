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
       this.content = `
   【可能原因】
   1. 网络延迟（等待2分钟后重试）
   2. 短信被手机安全软件拦截（检查短信垃圾箱）
   3. 运营商问题（移动/联通/电信用户可尝试重启手机）
   4. 当日获取次数超限（每个手机号每天最多5次）
   
   【解决方案】
   1. 点击「重新获取」按钮（60秒后可重发）
   2. 检查手机信号强度（建议在4G/5G网络下操作）
   3. 拨打运营商客服电话：
      - 移动：10086
      - 联通：10010
      - 电信：10000
      要求解除短信拦截
   
   如仍无法解决，请提供以下信息联系在线客服：
   • 手机型号
   • 运营商名称
   • 问题发生时间`;
       break;
   
     case 'retrieveAccount':
       this.title = '找回原账号';
       this.content = `
   【通过绑定信息找回】
   1. 在登录页点击「忘记账号」
   2. 选择找回方式：
      - 手机号找回：输入绑定手机获取账号
      - 邮箱找回：查收包含账号的邮件
   3. 验证身份后系统将显示完整账号
   
   【人工协助找回】
   若忘记绑定信息，请准备以下材料联系客服：
   1. 身份证正反面照片（需与实名认证一致）
   2. 最近3笔订单记录（如有消费）
   3. 账号曾用设备信息（IMEI/手机型号）
   
   注意：账号找回需1-3个工作日处理`;
       break;
   
     case 'resetPassword':
       this.title = '找回密码';
       this.content = `
   【自助重置流程】
   1. 点击登录页「忘记密码」
   2. 输入账号+绑定手机号
   3. 获取并输入验证码
   4. 设置新密码（要求：8-20位含字母+数字）
   5. 完成二次验证（短信/邮箱）
   
   【安全提示】
   1. 新密码不应与旧密码相似
   2. 建议开启「登录保护」功能
   3. 定期更换密码（推荐每90天一次）
   
   如遇以下情况需联系客服：
   • 绑定手机已停用
   • 连续3次验证码错误
   • 系统提示「账户异常」`;
       break;
   
     case 'limitedLogin':
       this.title = '登录时提示"已被限制登录或注册"';
       this.content = `
   【常见限制原因】
   1. 短时间内频繁登录（超过5次/分钟）
   2. 检测到非正常设备（如模拟器/root设备）
   3. 账户存在安全风险（密码泄露可能）
   
   【解除限制步骤】
   1. 等待2小时自动解除（轻度限制）
   2. 完成身份验证：
      - 人脸识别
      - 银行卡验证
   3. 下载最新版APP（可能修复了风控误判）
   
   申诉需准备材料：
   • 账户注册时间
   • 最后成功登录日期
   • 常用登录设备信息`;
       break;
   
     case 'notMyAccount':
       this.title = '登录界面提示"请选择/不是我的账号"';
       this.content = `
   【问题说明】
   系统检测到该设备曾登录过其他账号（可能原因：二手设备/多人共用设备）
   
   【解决方案】
   1. 点击「不是我的账号」进入账号选择页
   2. 选择正确账号登录
   3. 或点击「使用其他账号」重新输入
   
   【彻底解决】
   1. 进入「设置」-「账号管理」
   2. 清除本设备的所有登录记录
   3. 开启「设备锁」功能防止自动登录
   
   重要提醒：
   • 在公共设备上勿勾选「记住密码」
   • 定期检查账号登录设备列表`;
       break;
   
     case 'accountIssue':
       this.title = '账号被盗/冻结了怎么办';
       this.content = `
   【紧急处理步骤】
   1. 立即尝试修改密码（通过绑定邮箱）
   2. 检查账户安全中心：
      - 解绑陌生设备
      - 关闭第三方授权
   3. 提交冻结申诉（需上传证明材料）
   
   【证明材料清单】
   ✓ 手持身份证照片（需清晰可见）
   ✓ 账户首次充值记录截图
   ✓ 常用登录IP地址段说明
   
   【预防建议】
   1. 开启「登录二次验证」
   2. 定期检查账户安全评分
   3. 避免使用相同密码注册其他平台
   
   客服处理时效：紧急申诉2小时内响应`;
       break;
   
     default:
       this.title = '帮助详情';
       this.content = `
   您遇到的问题需要进一步核实，请按以下步骤操作：
   1. 记录当前页面完整截图
   2. 准备以下信息：
      - 问题发生时间
      - 操作步骤描述
      - 设备型号及系统版本
   3. 通过以下方式联系客服：
      • 在线客服：APP内「我的」-「帮助中心」
      • 紧急电话：400-123-4567（24小时）
   
   为提高效率，建议先尝试：
   • 重启APP
   • 检查网络连接
   • 更新至最新版本`;
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