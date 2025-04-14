<template>
  <view class="dropdown-container">
    <!-- 触发按钮 -->
    <view class="dropdown-trigger" @click="toggleDropdown">
      <text class="selected-text">{{ selectedOption?.label || placeholder }}</text>
      <uni-icons :type="isOpen ? 'arrowup' : 'arrowdown'" size="16" color="#666" />
    </view>
    
    <!-- 下拉菜单 -->
    <view v-if="isOpen" class="dropdown-menu">
      <scroll-view scroll-y class="options-container">
        <view 
          v-for="option in options" 
          :key="option.value"
          class="dropdown-option"
          :class="{ 'selected': option.value === modelValue }"
          @click="selectOption(option)"
        >
          <text>{{ option.label }}</text>
          <uni-icons 
            v-if="option.value === modelValue" 
            type="check" 
            size="16" 
            color="#4a90e2" 
          />
        </view>
      </scroll-view>
    </view>
    
    <!-- 点击外部关闭的遮罩 -->
    <view v-if="isOpen" class="dropdown-mask" @click="closeDropdown" />
  </view>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  options: {
    type: Array,
    required: true,
    validator: (value) => {
      return value.every(item => item.value !== undefined && item.label !== undefined);
    }
  },
  modelValue: {
    type: [String, Number],
    default: ''
  },
  placeholder: {
    type: String,
    default: '请选择'
  }
});

const emit = defineEmits(['update:modelValue', 'change']);

const isOpen = ref(false);
const selectedOption = ref(null);

// 初始化选中项
if (props.modelValue) {
  selectedOption.value = props.options.find(opt => opt.value === props.modelValue) || null;
}

// 切换下拉菜单
const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

// 关闭下拉菜单
const closeDropdown = () => {
  isOpen.value = false;
};

// 选择选项
const selectOption = (option) => {
  selectedOption.value = option;
  emit('update:modelValue', option.value);
  emit('change', option);
  closeDropdown();
};
</script>

<style scoped>
.dropdown-container {
  position: relative;
  z-index: 1;
}

.dropdown-trigger {
  height: 80rpx;
  padding: 0 20rpx;
  border: 1rpx solid #e0e0e0;
  border-radius: 8rpx;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.selected-text {
  font-size: 28rpx;
  color: #333;
}

.dropdown-menu {
  position: absolute;
  top: 90rpx;
  left: 0;
  right: 0;
  max-height: 400rpx;
  background-color: #fff;
  border: 1rpx solid #e0e0e0;
  border-radius: 8rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
  z-index: 100;
}

.options-container {
  max-height: 400rpx;
}

.dropdown-option {
  height: 80rpx;
  padding: 0 20rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.dropdown-option text {
  font-size: 28rpx;
  color: #333;
}

.dropdown-option.selected {
  background-color: #f5f9ff;
}

.dropdown-option:active {
  background-color: #f0f0f0;
}

.dropdown-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
}
</style>