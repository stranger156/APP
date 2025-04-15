<template>
  <view class="help-center">
    <!-- 顶部标题栏 -->
    <view class="header">
      <text class="header-title">帮助中心</text>
      <view class="header-subtitle">常见问题解决方案</view>
    </view>

    <!-- 搜索框 -->
    <view class="search-box">
      <uni-icons type="search" size="18" color="#999" />
      <input 
        class="search-input" 
        placeholder="搜索问题关键词"
        v-model="searchKeyword"
        @input="handleSearch"
        placeholder-class="placeholder"
      />
    </view>

    <!-- 内容区域 -->
    <scroll-view scroll-y class="content">
      <!-- 分类标题 -->
      <view class="section-title" v-if="filteredList.length > 0">
        <text>账号问题</text>
        <view class="divider"></view>
      </view>

      <!-- 问题列表 -->
      <view 
        class="item-card" 
        v-for="(item, index) in filteredList" 
        :key="index"
        @tap="goToPage(item.path)"
        :class="{ 'highlight': item.isNew }"
      >
        <view class="item-header">
          <text class="item-title">{{ item.title }}</text>
          <uni-icons type="right" size="16" color="#ccc" />
        </view>
        <view class="item-desc">{{ item.desc }}</view>
        <view v-if="item.isNew" class="new-badge">NEW</view>
      </view>

      <!-- 无结果提示 -->
      <view v-if="filteredList.length === 0" class="no-result">
        <image src="/static/no-data.png" mode="aspectFit" class="empty-icon" />
        <text>未找到匹配的问题</text>
        <button class="contact-btn" @tap="contactSupport">联系客服</button>
      </view>
    </scroll-view>

    <!-- 悬浮客服按钮 -->
    <view class="floating-service" @tap="contactSupport">
      <uni-icons type="headphones" size="24" color="#fff" />
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue';

// 数据部分
const searchKeyword = ref('');
const questionList = ref([
  {
    title: "手机号收不到验证码，无法登录",
    desc: "如果无法接收验证码，可能是信号问题或运营商拦截，可尝试重新获取或联系客服。",
    path: "/pages/detail/detail?type=verify",
    isNew: true
  },
  {
    title: "找回原账号",
    desc: "若想找回之前注册的账号，可通过绑定的手机号/邮箱或联系客服协助找回。",
    path: "/pages/detail/detail?type=retrieveAccount"
  },
  {
    title: "找回密码",
    desc: "在登录界面选择“忘记密码”，根据提示重置密码即可。",
    path: "/pages/detail/detail?type=resetPassword"
  },
  {
    title: "登录时提示“已被限制登录或注册”",
    desc: "若出现此提示，可能是账号存在异常操作或违规，可尝试联系客服进行申诉。",
    path: "/pages/detail/detail?type=limitedLogin"
  },
  {
    title: "登录界面提示“请选择/不是我的账号”，怎么办？”",
    desc: " 如果遇到该问题，说明当前设备已登录其他账号，需先退出后再登录或切换账号。",
    path: "/pages/detail/detail?type=notMyAccount"
  },
  {
    title: "账号被盗/冻结了怎么办”",
    desc: "建议第一时间修改密码，并联系官方客服解冻或申诉。",
    path: "/pages/detail/detail?type=accountIssue"
  }
]);

// 计算属性：过滤列表
const filteredList = computed(() => {
  if (!searchKeyword.value.trim()) return questionList.value;
  const keyword = searchKeyword.value.toLowerCase();
  return questionList.value.filter(item => 
    item.title.toLowerCase().includes(keyword) || 
    item.desc.toLowerCase().includes(keyword)
  );
});

// 方法部分
const handleSearch = () => {
  // 实时搜索已通过computed自动处理
};

const goToPage = (url) => {
  uni.navigateTo({ url });
};

const contactSupport = () => {
  uni.navigateTo({ url: '/pages/service/index' });
};
</script>

<style lang="scss">
/* 基础样式 */
.help-center {
  min-height: 100vh;
  background-color: #f8f8f8;
}

/* 顶部标题 */
.header {
  padding: 40rpx 30rpx 20rpx;
  background: linear-gradient(135deg, #07c160, #05a54e);
  color: white;
  border-radius: 0 0 30rpx 30rpx;

  .header-title {
    font-size: 40rpx;
    font-weight: bold;
  }

  .header-subtitle {
    font-size: 26rpx;
    opacity: 0.9;
    margin-top: 8rpx;
  }
}

/* 搜索框 */
.search-box {
  display: flex;
  align-items: center;
  padding: 20rpx 30rpx;
  margin: -30rpx 30rpx 20rpx;
  background-color: #fff;
  border-radius: 50rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.08);

  .search-input {
    flex: 1;
    margin-left: 16rpx;
    font-size: 28rpx;
    height: 60rpx;
  }

  .placeholder {
    color: #999;
  }
}

/* 问题卡片 */
.item-card {
  background-color: #fff;
  border-radius: 16rpx;
  padding: 28rpx;
  margin-bottom: 24rpx;
  position: relative;

  .item-header {
    display: flex;
    justify-content: space-between;
  }

  .item-title {
    font-size: 30rpx;
    font-weight: 600;
  }

  .item-desc {
    font-size: 26rpx;
    color: #666;
    margin-top: 12rpx;
  }

  .new-badge {
    position: absolute;
    top: -10rpx;
    right: -10rpx;
    background-color: #ff4d4f;
    color: white;
    padding: 4rpx 12rpx;
    border-radius: 20rpx;
    font-size: 20rpx;
  }

  &.highlight {
    border-left: 6rpx solid #07c160;
  }
}

/* 无结果提示 */
.no-result {
  text-align: center;
  padding: 60rpx 0;

  .empty-icon {
    width: 200rpx;
    height: 200rpx;
    margin-bottom: 30rpx;
  }

  text {
    display: block;
    color: #999;
    margin-bottom: 30rpx;
  }

  .contact-btn {
    width: 60%;
    background-color: #07c160;
    color: white;
    border-radius: 50rpx;
  }
}

/* 悬浮按钮 */
.floating-service {
  position: fixed;
  right: 40rpx;
  bottom: 120rpx;
  width: 100rpx;
  height: 100rpx;
  background: linear-gradient(135deg, #07c160, #05a54e);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4rpx 20rpx rgba(7, 193, 96, 0.3);
}
</style>