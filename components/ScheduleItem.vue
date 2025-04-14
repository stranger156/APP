<template>
  <view 
    class="schedule-item"
    :class="itemClass"
    @click="$emit('click', item)"
    :style="{ marginTop: calcTopMargin(item) }"
  >
    <view class="item-content">
      <view class="time-range">
        {{ item.startTime }} - {{ item.endTime }}
      </view>
      <view class="course-header">
        <text class="name">{{ item.name }}</text>
      </view>
      <view class="course-info">
        <text class="teacher">{{ item.teacher }}</text>
        <text class="location">@{{ item.location }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  item: Object,
  prevItem: Object // 上一个课程项，用于计算位置
});

const itemClass = computed(() => ({
  'lecture': props.item.type === 'lecture',
  'lab': props.item.type === 'lab',
  'seminar': props.item.type === 'seminar'
}));

// 计算课程项的上边距（避免时间重叠）
const calcTopMargin = (item) => {
  if (!props.prevItem) return '0';
  
  const prevEnd = timeToMinutes(props.prevItem.endTime);
  const currentStart = timeToMinutes(item.startTime);
  
  // 如果当前课程开始时间在上一个课程结束后，留出10rpx间距
  return currentStart > prevEnd ? '10rpx' : '0';
};

// 时间转换辅助函数
const timeToMinutes = (timeStr) => {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
};
</script>


<style scoped>
.time-range {
	  font-size: 24rpx;
	  color: #666;
	  margin-bottom: 8rpx;
	}
.schedule-item {
  background-color: #fff;
  border-radius: 12rpx;
  padding: 20rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
  margin-bottom: 10rpx;
}

.schedule-item.lecture {
  border-left: 8rpx solid #4a90e2;
}

.schedule-item.lab {
  border-left: 8rpx solid #7ed321;
}

.schedule-item.seminar {
  border-left: 8rpx solid #f5a623;
}

.course-header {
  margin-bottom: 10rpx;
  display: flex;
  justify-content: space-between;
}

.name {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
}

.time {
  font-size: 28rpx;
  color: #666;
}

.course-info {
  display: flex;
  justify-content: space-between;
  font-size: 26rpx;
  color: #666;
}
</style>