<template>
  <view class="schedule-header">
    <text class="week-number">{{ weekNumber }}</text>
    <text class="date-range">{{ dateRange }}</text>
  </view>
</template>

<script setup>
defineProps({
  weekNumber: String,
  dateRange: String
});
</script>

<style scoped>
.schedule-header {
  padding: 20rpx;
  background-color: #4a90e2;
  border-radius: 12rpx;
  margin-bottom: 20rpx;
  text-align: center;
}

.week-number {
  font-size: 36rpx;
  font-weight: bold;
  color: white;
  display: block;
}

.date-range {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.8);
  display: block;
  margin-top: 10rpx;
}
</style>