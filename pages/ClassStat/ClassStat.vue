<template>
  <view class="schedule-page">
    <!-- 头部信息 -->
    <ScheduleHeader 
      :week-number="currentWeekData.weekNumber"
      :date-range="`${currentWeekData.startDate} ~ ${currentWeekData.endDate}`"
    />
    
    <!-- 周次切换器 -->
    <WeekSwitcher 
      :weeks="weekList"
      :current-week="currentWeekKey"
      @week-change="handleWeekChange"
    />
    
    <!-- 星期导航 -->
    <ScheduleWeekNav 
      :start-date="currentWeekData.startDate"
      :active-day="activeDay"
      @day-change="handleDayChange"
    />
    
    <view class="divider"></view>
    
    <!-- 课程列表 -->
<view class="schedule-list">
  <template v-if="filteredCourses.length > 0">
    <ScheduleItem 
      v-for="(item, index) in filteredCourses" 
      :key="item.id"
      :item="item"
      :prev-item="filteredCourses[index - 1]"
      @click="handleItemClick"
    />
  </template>
  <view v-else class="empty-tip">
    当天没有课程安排
  </view>
</view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { fetchWeekList, fetchScheduleByWeek } from '@/utils/api';
import ScheduleHeader from '@/components/ScheduleHeader.vue';
import ScheduleWeekNav from '@/components/ScheduleWeekNav.vue';
import ScheduleItem from '@/components/ScheduleItem.vue';
import WeekSwitcher from '@/components/WeekSwitcher.vue';

const currentWeekKey = ref('week1');
const currentWeekData = ref({ scheduleItems: [] });
const weekList = ref([]);
const activeDay = ref(0); // 默认显示周一

// 计算过滤后的课程（按星期筛选）
const filteredCourses = computed(() => {
  if (!currentWeekData.value.scheduleItems) return [];
  
  const dayNames = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  const selectedDay = dayNames[activeDay.value];
  
  // 获取当天所有课程并按时间排序
  return currentWeekData.value.scheduleItems
    .filter(item => item.day === selectedDay)
    .sort((a, b) => {
      return timeToMinutes(a.startTime) - timeToMinutes(b.startTime);
    });
});

// 时间转换工具函数
const timeToMinutes = (timeStr) => {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
};

// 加载周次列表
const loadWeekList = async () => {
  try {
    weekList.value = await fetchWeekList();
    if (weekList.value.length > 0) {
      currentWeekKey.value = weekList.value[0].key;
      await loadScheduleData(currentWeekKey.value);
    }
  } catch (error) {
    console.error('加载周次列表失败:', error);
    uni.showToast({ title: '加载周次列表失败', icon: 'none' });
  }
};

// 加载课程数据
const loadScheduleData = async (weekKey) => {
  try {
    uni.showLoading({ title: '加载中...' });
    currentWeekData.value = await fetchScheduleByWeek(weekKey);
    // 默认显示周一的数据
    activeDay.value = 1;
  } catch (error) {
    console.error('加载课程数据失败:', error);
    uni.showToast({ title: '加载课程数据失败', icon: 'none' });
  } finally {
    uni.hideLoading();
  }
};

// 切换周次
const handleWeekChange = (weekKey) => {
  currentWeekKey.value = weekKey;
  loadScheduleData(weekKey);
};

// 切换星期
const handleDayChange = (dayIndex) => {
  activeDay.value = dayIndex;
};

// 点击课程项
const handleItemClick = (item) => {
  uni.showModal({
    title: item.name,
    content: `教师: ${item.teacher}\n地点: ${item.location}\n时间: ${item.time}`,
    showCancel: false
  });
};

onMounted(() => {
  loadWeekList();
});
</script>

<style scoped>
/* 原有样式保持不变 */
/* 保持原有样式不变 */
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

@media (min-width: 768px) {
  .schedule-page {
    max-width: 750px;
    margin: 0 auto;
    padding: 30rpx;
  }
}
.empty-tip {
  text-align: center;
  padding: 40rpx;
  color: #999;
  font-size: 28rpx;
}
</style>