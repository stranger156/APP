<template>
  <view class="schedule-header">
    <text class="date">{{ date }}</text>
    <text class="week">{{ week }}</text>
  </view>
</template>

<script setup>
defineProps({
  date: String,
  week: String
});
</script>

<style scoped>
.schedule-header {
  display: flex;
  flex-direction: column;
  margin-bottom: 20rpx;
}

.date {
  font-size: 36rpx;
  font-weight: bold;
  color: #333;
}

.week {
  font-size: 28rpx;
  color: #666;
  margin-top: 10rpx;
}
</style>