<template>
  <view class="week-nav">
    <text class="month">{{ month }}</text>
    <view class="days">
      <text 
        v-for="(day, index) in days" 
        :key="index"
        class="day"
        :class="{ 'active': isActiveDay(index) }"
      >
        {{ day }}
      </text>
    </view>
  </view>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  month: String,
  days: Array
});

// 假设今天是周日(索引6)
const activeDayIndex = computed(() => 6);

const isActiveDay = (index) => {
  return index === activeDayIndex.value;
};
</script>

<style scoped>
.week-nav {
  margin-bottom: 20rpx;
}

.month {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 15rpx;
  display: block;
}

.days {
  display: flex;
  justify-content: space-between;
}

.day {
  width: 70rpx;
  height: 70rpx;
  line-height: 70rpx;
  text-align: center;
  font-size: 28rpx;
  color: #333;
  background-color: #fff;
  border-radius: 10rpx;
  transition: all 0.3s;
}

.day.active {
  background-color: #4a90e2;
  color: white;
}

@media (min-width: 768px) {
  .days {
    justify-content: flex-start;
    gap: 15rpx;
  }
}
</style>