<template>
  <view class="week-switcher">
    <view 
      class="week-arrow"
      @click="switchWeek(-1)"
      :class="{ disabled: isFirstWeek }"
    >
      <uni-icons type="arrowleft" size="20" color="#4a90e2" />
    </view>
    
    <picker 
      mode="selector" 
      :range="weekOptions"
      range-key="label"
      :value="currentIndex"
      @change="onPickerChange"
    >
      <view class="week-display">
        <text class="week-label">{{ currentWeek.label }}</text>
        <text class="week-date">{{ currentWeek.dateRange }}</text>
      </view>
    </picker>
    
    <view 
      class="week-arrow"
      @click="switchWeek(1)"
      :class="{ disabled: isLastWeek }"
    >
      <uni-icons type="arrowright" size="20" color="#4a90e2" />
    </view>
  </view>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  weeks: {
    type: Array,
    default: () => []
  },
  currentWeek: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['week-change']);

// 计算属性
const currentIndex = computed(() => {
  return props.weeks.findIndex(week => week.key === props.currentWeek);
});

const currentWeek = computed(() => {
  return props.weeks[currentIndex.value] || {};
});

const weekOptions = computed(() => {
  return props.weeks.map(week => ({
    label: week.label,
    value: week.key
  }));
});

const isFirstWeek = computed(() => currentIndex.value <= 0);
const isLastWeek = computed(() => currentIndex.value >= props.weeks.length - 1);

// 切换周次
const switchWeek = (delta) => {
  const newIndex = currentIndex.value + delta;
  if (newIndex >= 0 && newIndex < props.weeks.length) {
    emit('week-change', props.weeks[newIndex].key);
  }
};

// 选择器变化
const onPickerChange = (e) => {
  const selectedIndex = e.detail.value;
  if (selectedIndex >= 0 && selectedIndex < props.weeks.length) {
    emit('week-change', props.weeks[selectedIndex].key);
  }
};
</script>

<style scoped>
.week-switcher {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20rpx;
  background-color: #fff;
  border-radius: 12rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
}

.week-display {
  flex: 1;
  text-align: center;
}

.week-label {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  display: block;
}

.week-date {
  font-size: 24rpx;
  color: #666;
  display: block;
}

.week-arrow {
  padding: 20rpx;
}

.week-arrow.disabled {
  opacity: 0.3;
}
</style>