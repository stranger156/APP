<template>
	<view class="">
	<select id="demo-select1"></select>
	</view>
	
  <view class="course-schedule-container">
    <!-- 响应式表格容器 -->
    <view class="schedule-table">
      <!-- 表头 -->
      <view class="table-header">
        <view class="header-cell period-cell">节次</view>
        <view 
          class="header-cell day-cell" 
          v-for="(day, dayIndex) in weekDays" 
          :key="dayIndex"
        >
          {{ day }}
        </view>
      </view>
      
      <!-- 表格内容 -->
      <view class="table-body">
        <view 
          class="table-row" 
          v-for="(period, periodIndex) in periods" 
          :key="periodIndex"
        >
          <!-- 节次序号 -->
          <view class="body-cell period-cell">{{ period }}</view>
          
          <!-- 每日课程 -->
          <view 
            class="body-cell day-cell" 
            v-for="(dayCourses, dayIndex) in courseData" 
            :key="dayIndex"
          >
            <view v-if="dayCourses[periodIndex]" class="course-card">
              <view class="course-name">{{ dayCourses[periodIndex].courseName }}</view>
              <view class="course-teacher">{{ dayCourses[periodIndex].teacher }}</view>
              <view class="course-location">{{ dayCourses[periodIndex].classroom }}</view>
            </view>
            <view v-else class="empty-cell">-</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';
const array=ref([1,2,3])
// 周几显示
const weekDays = ref(['周一', '周二', '周三', '周四', '周五', '周六', '周日']);

// 节次显示
const periods = ref(['第一节', '第二节', '第三节', '第四节','第五节','第六节']);

// 课程数据
const courseData = ref([
  // 周一
  [
    { courseName: '数学', teacher: '张老师', classroom: '101' },
    null,
    { courseName: '英语', teacher: '李老师', classroom: '202' },
    null
  ],
  // 周二
  [
    null,
    { courseName: '物理', teacher: '王老师', classroom: '303' },
    null,
    { courseName: '化学', teacher: '赵老师', classroom: '404' }
  ],
  // 周三
  [
    { courseName: '语文', teacher: '刘老师', classroom: '505' },
    null,
    null,
    { courseName: '体育', teacher: '孙老师', classroom: '操场' }
  ],
  // 周四
  [
    null,
    { courseName: '历史', teacher: '周老师', classroom: '606' },
    { courseName: '地理', teacher: '吴老师', classroom: '707' },
    null
  ],
  // 周五
  [
    { courseName: '政治', teacher: '郑老师', classroom: '808' },
    null,
    { courseName: '生物', teacher: '冯老师', classroom: '909' },
    null
  ],
  // 周六
  [
    { courseName: '数学', teacher: '张老师', classroom: '101' },
    null,
    { courseName: '英语', teacher: '李老师', classroom: '202' },
    null
  ],
  // 周日
  [
    { courseName: '数学', teacher: '张老师', classroom: '101' },
    null,
    { courseName: '英语', teacher: '李老师', classroom: '202' },
    null
  ]
]);
</script>

<style scoped>
/* 基础容器样式 */
.course-schedule-container {
  width: 100%;
  padding: 16rpx;
  box-sizing: border-box;
  overflow-x: auto;
}

/* 表格整体样式 */
.schedule-table {
  width: 100%;
  min-width: 400rpx; /* 设置最小宽度防止内容挤压 */
  border-collapse: collapse;
}

/* 表头样式 */
.table-header {
  display: flex;
  background-color: #f5f5f5;
  font-weight: bold;
  position: sticky;
  top: 0;
  z-index: 10;
}

/* 单元格基础样式 */
.header-cell, .body-cell {
  flex: 1;
  min-width: 50rpx; /* 设置最小宽度防止挤压 */
  padding: 20rpx 10rpx;
  text-align: center;
  border: 1rpx solid #e0e0e0;
  box-sizing: border-box;
  word-break: break-word; /* 长文本自动换行 */
}

/* 节次列特殊样式 */
.period-cell {
  flex: 0 0 50rpx; /* 固定宽度 */
  background-color: #f9f9f9;
  font-weight: bold;
}

/* 表格内容行样式 */
.table-body {
  display: flex;
  flex-direction: column;
}

.table-row {
  display: flex;
}

/* 课程卡片样式 */
.course-card {
  background-color: #e8f5e9;
  border-radius: 8rpx;
  padding: 12rpx;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.course-name {
  font-weight: bold;
  font-size: 28rpx;
  margin-bottom: 6rpx;
}

.course-teacher, .course-location {
  font-size: 24rpx;
  color: #666;
}

/* 空单元格样式 */
.empty-cell {
  color: #999;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 响应式调整 */
@media (max-width: 600px) {
  .header-cell, .body-cell {
    padding: 12rpx 6rpx;
    font-size: 24rpx;
  }
  
  .course-name {
    font-size: 24rpx;
  }
  
  .course-teacher, .course-location {
    font-size: 20rpx;
  }
}

@media (min-width: 1000px) {
  .course-schedule-container {
    max-width: 1200px;
    margin: 0 auto;
  }
}
</style>