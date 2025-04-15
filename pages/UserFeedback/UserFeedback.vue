<template>
  <view class="feedback-page"> 
    <!-- 主内容区 -->
    <scroll-view 
      scroll-y 
      class="content-wrapper"
      :show-scrollbar="false"
    >
      <view class="form-container">
        <!-- 反馈类型 -->
        <view class="form-section">
          <text class="section-title">反馈类型</text>
          <view class="type-options">
            <view 
              v-for="item in feedbackTypes" 
              :key="item.value"
              class="type-option"
              :class="{active: form.type === item.value}"
              @click="form.type = item.value"
            >
              <view class="option-icon">
                <uni-icons 
                  :type="item.icon" 
                  size="20" 
                  :color="form.type === item.value ? '#2979FF' : '#999'"
                />
              </view>
              <text class="option-text">{{ item.label }}</text>
            </view>
          </view>
        </view>
        
        <!-- 联系方式 -->
        <view class="form-section">
          <text class="section-title">联系方式</text>
          <input 
            v-model="form.contact" 
            placeholder="请输入手机/邮箱(选填)" 
            class="form-input"
            type="text"
            maxlength="50"
          />
        </view>
        
        <!-- 反馈内容 -->
        <view class="form-section">
          <text class="section-title">反馈内容<text class="required">*</text></text>
          <textarea 
            v-model="form.content" 
            placeholder="请详细描述您的问题或建议..." 
            class="form-textarea"
            maxlength="500"
            auto-height
            @input="handleContentInput"
          />
          <text class="word-count">{{ form.content.length }}/500</text>
        </view>
        
        <!-- 图片上传 -->
        <view class="form-section">
          <text class="section-title">上传截图</text>
          <text class="section-subtitle">最多上传4张图片(可选)</text>
          <uni-file-picker
            v-model="form.images"
            file-mediatype="image"
            mode="grid"
            limit="4"
            :image-styles="imageStyles"
            :del-icon="true"
            :auto-upload="false"
          />
        </view>
      </view>
    </scroll-view>
    
    <!-- 底部提交按钮 -->
    <view class="footer">
      <button 
        class="submit-btn"
        :class="{disabled: !canSubmit}"
        :disabled="!canSubmit"
        @click="handleSubmit"
      >
        <text v-if="!submitting">提交反馈</text>
        <uni-load-more v-else status="loading" :content-text="loadingText" />
      </button>
    </view>
    
    <!-- 提交成功弹窗 -->
    <uni-popup ref="successPopup" type="center" :is-mask-click="false">
      <view class="success-dialog">
        <image src="/static/images/success.png" class="success-icon" />
        <text class="success-title">反馈提交成功</text>
        <text class="success-desc">感谢您的宝贵意见，我们会尽快处理</text>
        <button class="confirm-btn" @click="handleConfirm">确定</button>
      </view>
    </uni-popup>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

// 表单数据
const form = ref({
  type: 'bug',
  contact: '',
  content: '',
  images: []
})

// 反馈类型选项
const feedbackTypes = ref([
  { value: 'bug', label: '功能异常', icon: 'notification' },
  { value: 'suggestion', label: '产品建议', icon: 'compose' },
  { value: 'complain', label: '投诉', icon: 'help' },
  { value: 'other', label: '其他问题', icon: 'chat' }
])

// 图片上传样式
const imageStyles = ref({
  width: 160,
  height: 160,
  border: {
    color: '#eee',
    width: 1,
    style: 'solid',
    radius: '8px'
  }
})

// 加载状态
const submitting = ref(false)
const loadingText = ref({
  contentdown: '提交中',
  contentrefresh: '提交中',
  contentnomore: '提交完成'
})

// 计算属性：是否可以提交
const canSubmit = computed(() => {
  return form.value.content.length > 0 && 
         form.value.content.length <= 500 &&
         !submitting.value
})

// 返回上一页
const handleBack = () => {
  uni.navigateBack()
}

// 内容输入处理
const handleContentInput = () => {
  // 可以在这里添加输入限制逻辑
}

// 提交反馈
const handleSubmit = async () => {
  if (!validateForm()) return
  
  submitting.value = true
  
  try {
    // 模拟API请求
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // 实际项目中替换为真实API调用
    // const res = await uni.request({
    //   url: 'https://your-api.com/feedback',
    //   method: 'POST',
    //   data: form.value
    // })
    
    // 显示成功弹窗
    successPopup.value.open()
    
    // 重置表单
    form.value = {
      type: 'bug',
      contact: '',
      content: '',
      images: []
    }
  } catch (error) {
    uni.showToast({
      title: '提交失败，请重试',
      icon: 'none'
    })
    console.error('提交反馈失败:', error)
  } finally {
    submitting.value = false
  }
}

// 表单验证
const validateForm = () => {
  if (!form.value.content) {
    uni.showToast({
      title: '请填写反馈内容',
      icon: 'none'
    })
    return false
  }
  
  if (form.value.content.length > 500) {
    uni.showToast({
      title: '反馈内容不能超过500字',
      icon: 'none'
    })
    return false
  }
  
  // 验证联系方式格式
  if (form.value.contact) {
    const isPhone = /^1[3-9]\d{9}$/.test(form.value.contact)
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.contact)
    
    if (!isPhone && !isEmail) {
      uni.showToast({
        title: '请输入正确的手机号或邮箱',
        icon: 'none'
      })
      return false
    }
  }
  
  return true
}

// 成功弹窗确认
const handleConfirm = () => {
  successPopup.value.close()
  handleBack()
}

// 获取弹窗引用
const successPopup = ref(null)

onLoad(() => {
  // 页面初始化逻辑
})
</script>

<style lang="scss" scoped>
.feedback-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  
  .content-wrapper {
    flex: 1;
    padding: 20rpx 30rpx;
    overflow: hidden;
	 box-sizing: border-box;
	  height: calc(100vh - 120rpx); 
  }
  ::v-deep .uni-file-picker__container {
    width: 100% !important;
    padding: 0 8rpx;
    
    .uni-file-picker__lists {
      justify-content: flex-start;
    }
    
    .uni-file-picker__list-item {
      margin: 0 12rpx 12rpx 0;
    }
  }

  .form-container {
   background-color: #fff;
    border-radius: 16rpx;
    padding: 30rpx 24rpx; /* 减少左右内边距 */
    margin-bottom: 30rpx;
    /* 新增 */
    box-sizing: border-box;
    max-width: 100%;
    overflow: hidden;
  }
  
  .form-section {
    margin-bottom: 40rpx;
    
    &:last-child {
      margin-bottom: 0;
    }
    
    .section-title {
      display: block;
      font-size: 32rpx;
      color: #333;
      font-weight: 500;
      margin-bottom: 20rpx;
      
      .required {
        color: #f56c6c;
        margin-left: 8rpx;
      }
    }
    
    .section-subtitle {
      display: block;
      font-size: 24rpx;
      color: #999;
      margin-bottom: 20rpx;
    }
  }
  
  .type-options {
    display: flex;
    flex-wrap: wrap;
    gap: 20rpx;
	justify-content: space-between;
    
    .type-option {
      width: calc(25% - 15rpx);
      display: flex;
	   box-sizing: border-box;
	      min-width: 0; /* 防止内容溢出 */
      flex-direction: column;
      align-items: center;
      padding: 20rpx 0;
      border-radius: 12rpx;
      background-color: #f8f8f8;
      transition: all 0.3s;
      
      &.active {
        background-color: #e6f2ff;
        border: 1px solid #2979FF;
      }
      
      .option-icon {
        width: 60rpx;
        height: 60rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 10rpx;
      }
      
      .option-text {
        font-size: 26rpx;
        color: #666;
      }
    }
  }
  
  .form-input {
    width: 80vw;
    height: 80rpx;
    padding: 0 24rpx;
    border: 1px solid #eee;
    border-radius: 12rpx;
    font-size: 28rpx;
    background-color: #f8f8f8;
  }
  
  .form-textarea {
    width: 100%;
    min-height: 200rpx;
    padding: 24rpx;
	 box-sizing: border-box;
	  max-width: 100%;
    border: 1px solid #eee;
    border-radius: 12rpx;
    font-size: 28rpx;
    background-color: #f8f8f8;
    line-height: 1.6;
  }
  
  .word-count {
    display: block;
    text-align: right;
    font-size: 24rpx;
    color: #999;
    margin-top: 10rpx;
  }
  
  .footer {
    padding: 20rpx 30rpx;
    background-color: #fff;
    box-shadow: 0 -4rpx 20rpx rgba(0, 0, 0, 0.05);
    
    .submit-btn {
      width: 100%;
      height: 88rpx;
      line-height: 88rpx;
      border-radius: 44rpx;
      background-color: #2979FF;
      color: #fff;
      font-size: 32rpx;
      border: none;
      transition: all 0.3s;
      
      &:active {
        opacity: 0.8;
      }
      
      &.disabled {
        background-color: #c0c4cc;
        opacity: 0.7;
      }
    }
  }
  
  .success-dialog {
    width: 80vw;
	 max-width: 560rpx;
    background-color: #fff;
    border-radius: 24rpx;
    padding: 60rpx 40rpx;
    display: flex;
	 box-sizing: border-box;
	  margin: 0 20rpx;
    flex-direction: column;
    align-items: center;
    
    .success-icon {
      width: 120rpx;
      height: 120rpx;
      margin-bottom: 30rpx;
    }
    
    .success-title {
      font-size: 36rpx;
      font-weight: bold;
      color: #333;
      margin-bottom: 20rpx;
    }
    
    .success-desc {
      font-size: 28rpx;
      color: #666;
      margin-bottom: 40rpx;
      text-align: center;
    }
    
    .confirm-btn {
      width: 100%;
      height: 80rpx;
      line-height: 80rpx;
      border-radius: 40rpx;
      background-color: #2979FF;
      color: #fff;
      font-size: 30rpx;
      border: none;
    }
  }
}
</style>