<template>
  <view class="week-nav">
    <view class="days">
      <view 
        v-for="(day, index) in weekDays" 
        :key="index"
        class="day"
        :class="{ 'active': isActiveDay(index) }"
        @click="selectDay(index)"
      >
        <text class="day-name">{{ day.name }}</text>
        <text class="day-date">{{ day.date }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  startDate: String,
  activeDay: Number
});

const emit = defineEmits(['day-change']);

// 计算一周的日期
const weekDays = computed(() => {
  const start = new Date(props.startDate);
  const days = [];
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    
    days.push({
      name: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][date.getDay()],
      date: `${date.getMonth() + 1}/${date.getDate()}`,
      dayIndex: date.getDay() // 0-6 表示周日到周六
    });
  }
  
  return days;
});

// 判断是否是当前选中的星期
const isActiveDay = (index) => {
  return weekDays.value[index].dayIndex === props.activeDay;
};

// 选择星期
const selectDay = (index) => {
  const dayIndex = weekDays.value[index].dayIndex;
  emit('day-change', dayIndex);
};
</script>

<style scoped>
.week-nav {
  margin-bottom: 20rpx;
}

.days {
  display: flex;
  justify-content: space-between;
}

.day {
  width: 80rpx;
  padding: 10rpx;
  text-align: center;
  background-color: #fff;
  border-radius: 10rpx;
  transition: all 0.3s;
}

.day:active {
  transform: scale(0.95);
}

.day.active {
  background-color: #4a90e2;
}

.day.active .day-name,
.day.active .day-date {
  color: white;
}

.day-name {
  font-size: 28rpx;
  color: #333;
  display: block;
}

.day-date {
  font-size: 24rpx;
  color: #666;
  display: block;
}
</style>