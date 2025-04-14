<template>
  <view 
    class="schedule-item"
    :class="itemClass"
    @click="handleItemClick"
  >
    <view class="item-content">
      <!-- 时间类型 -->
      <template v-if="item.type === 'time'">
        <view class="time-header">
          <text class="time">{{ item.time }}</text>
        </view>
        <view class="time-details">
          <text>{{ item.course }}</text>
          <text class="index">{{ item.index }}</text>
          <text>{{ item.endTime }}</text>
          <text>{{ item.duration }}</text>
        </view>
      </template>
      
      <!-- 课程类型 -->
      <template v-else-if="item.type === 'course'">
        <view class="course-header">
          <text class="name">{{ item.name }}</text>
        </view>
        <view class="course-info">
          <text class="location">@{{ item.location }}</text>
          <text class="teacher">{{ item.teacher }}</text>
        </view>
      </template>
      
      <!-- 任务类型 -->
      <template v-else-if="item.type === 'task'">
        <view class="task-header">
          <text class="title">{{ item.time }}</text>
          <text class="name">{{ item.course }}</text>
        </view>
        <view class="task-info">
          <text class="location">@{{ item.location }}</text>
        </view>
      </template>
      
      <!-- 非本周类型 -->
      <template v-else-if="item.type === 'notThisWeek'">
        <view class="not-week-header">
          <text class="title">非本周</text>
          <text class="name">{{ item.course }}</text>
        </view>
        <view class="not-week-info">
          <text class="location">@{{ item.location }}</text>
          <text class="teacher">{{ item.teacher }}</text>
        </view>
      </template>
    </view>
  </view>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  item: Object
});

const emit = defineEmits(['itemClick']);

const itemClass = computed(() => {
  return {
    'time-item': props.item.type === 'time',
    'course-item': props.item.type === 'course',
    'task-item': props.item.type === 'task',
    'not-week-item': props.item.type === 'notThisWeek'
  };
});

const handleItemClick = () => {
  emit('itemClick', props.item);
};
</script>

<style scoped>
.schedule-item {
  background-color: #fff;
  border-radius: 12rpx;
  padding: 20rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.schedule-item:active {
  transform: scale(0.98);
}

.time-item {
  border-left: 8rpx solid #7ed321;
}

.course-item {
  border-left: 8rpx solid #4a90e2;
}

.task-item {
  border-left: 8rpx solid #f5a623;
}

.not-week-item {
  border-left: 8rpx solid #ccc;
  opacity: 0.7;
}

.item-content {
  display: flex;
  flex-direction: column;
}

/* 时间项样式 */
.time-header {
  margin-bottom: 10rpx;
}

.time {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
}

.time-details {
  display: flex;
  justify-content: space-between;
  font-size: 28rpx;
  color: #666;
}

.time-details .index {
  font-weight: bold;
  color: #333;
}

/* 课程项样式 */
.course-header {
  margin-bottom: 10rpx;
}

.course-header .name {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
}

.course-info {
  display: flex;
  flex-direction: column;
  font-size: 28rpx;
  color: #666;
}

.course-info .location {
  margin-bottom: 5rpx;
}

.course-info .teacher {
  font-size: 26rpx;
  color: #999;
}

/* 任务项样式 */
.task-header {
  display: flex;
  align-items: center;
  margin-bottom: 10rpx;
}

.task-header .title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
}

.task-header .name {
  font-size: 28rpx;
  color: #666;
  margin-left: 15rpx;
}

.task-info {
  font-size: 28rpx;
  color: #666;
}

/* 非本周项样式 */
.not-week-header {
  display: flex;
  align-items: center;
  margin-bottom: 10rpx;
}

.not-week-header .title {
  font-size: 28rpx;
  color: #999;
}

.not-week-header .name {
  font-size: 28rpx;
  color: #666;
  margin-left: 15rpx;
}

.not-week-info {
  display: flex;
  flex-direction: column;
  font-size: 26rpx;
  color: #999;
}

@media (min-width: 768px) {
  .schedule-item {
    padding: 25rpx;
  }
  
  .time, .course-header .name, .task-header .title {
    font-size: 34rpx;
  }
  
  .time-details, .course-info, .task-info {
    font-size: 30rpx;
  }
}
</style>