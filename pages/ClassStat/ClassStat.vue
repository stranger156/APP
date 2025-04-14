<template>
  <view class="schedule-page">
    <!-- 头部日期信息 -->
    <ScheduleHeader 
      :date="scheduleData.currentDate" 
      :week="scheduleData.currentWeek" 
    />
    
    <!-- 周导航 -->
    <ScheduleWeekNav 
      :month="scheduleData.month" 
      :days="scheduleData.weekDays" 
    />
    
    <view class="divider"></view>
    
    <!-- 课程列表 -->
    <view class="schedule-list">
      <ScheduleItem 
        v-for="(item, index) in filteredSchedule" 
        :key="index"
        :item="item"
      />
    </view>
    
    <!-- 周切换按钮 -->
    <view class="week-switcher">
      <button @click="showCurrentWeek" class="switch-btn">本周</button>
      <button @click="showAll" class="switch-btn">全部</button>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue';
import { getCurrentWeekSchedule, getAllSchedule } from '@/utils/scheduleData';
import ScheduleHeader from '@/components/ScheduleHeader.vue';
import ScheduleWeekNav from '@/components/ScheduleWeekNav.vue';
import ScheduleItem from '@/components/ScheduleItem.vue';

const showAllItems = ref(false);
const scheduleData = getAllSchedule();

// 根据选择过滤课程数据
const filteredSchedule = computed(() => {
  return showAllItems.value 
    ? scheduleData.scheduleItems 
    : getCurrentWeekSchedule();
});

const showCurrentWeek = () => {
  showAllItems.value = false;
};

const showAll = () => {
  showAllItems.value = true;
};
</script>

<style scoped>
.schedule-page {
  padding: 20rpx;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.divider {
  height: 2rpx;
  background-color: #e0e0e0;
  margin: 20rpx 0;
}

.schedule-list {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
  margin-bottom: 40rpx;
}

.week-switcher {
  display: flex;
  justify-content: center;
  gap: 30rpx;
  position: fixed;
  bottom: 30rpx;
  left: 0;
  right: 0;
}

.switch-btn {
  background-color: #4a90e2;
  color: white;
  border: none;
  padding: 15rpx 30rpx;
  border-radius: 50rpx;
  font-size: 28rpx;
}

.switch-btn:active {
  opacity: 0.8;
}

@media (min-width: 768px) {
  .schedule-page {
    max-width: 750px;
    margin: 0 auto;
    padding: 30rpx;
  }
}
</style>