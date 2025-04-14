<template>
 <view class="container">
    <uni-data-picker 
	 v-model="selectedValue"
      :localdata="options"
      placeholder="请选择课表呈现条件"
      popup-title="请选择"
      @change="onChange"
	   class="single-line-picker"
    ></uni-data-picker>
  </view>
   <view class="debug-info" v-if="isShow">
        下面展示 {{ selectedValue }}的课表
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
import { onMounted, ref } from 'vue';
import { getTeachersByCollege ,getBuildingsAndClassrooms, getDepartmentsAndClasses} from '../../utils/api';

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

const selectedValue = ref([]);
const isShow=ref(false)
const options = ref([
  {
    value: '授课教师',
    text: '授课教师',
    children: [],
  },
  {
    value: '授课地点',
    text: '授课地点',
    children: [],
  },
  {
    value: '教学班级',
    text: '教学班级',
    children: [],
  },
]);

const onChange = (e) => {
  console.log('选择变化:', e.detail.value[0]);
  console.log(selectedValue.value)
  if(selectedValue.value.length===0){
	  isShow.value=false
  }else{
	  isShow.value=true
  }
};
onMounted:{
	//获取学院老师数据
	getTeachersByCollege().then(res=>{
		let arr=[]
		function getchildren(parent){
			let arr1=[]
			parent.forEach(element=>{
				arr1.push({
					value:element,
					text:element
				})
		})
			return arr1}
		res.data.forEach(item=>{
			arr.push({
				text:item.学院,
				value:item.学院+1,
				children:getchildren(item.children)
			})
		})
		options.value[0].children=arr
	})
	getBuildingsAndClassrooms().then(res=>{
		options.value[1].children=res.data
	})
	getDepartmentsAndClasses().then(res=>{
		options.value[2].children=res.data
	})
}
</script>

<style scoped>
/* 基础容器样式 */
/* 深度穿透样式 */
.single-line-picker ::v-deep .uni-data-picker-input-text {
  display: inline-block;
  max-width: 100%; /* 重要：限制最大宽度 */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: middle; /* 保持垂直居中 */
}

/* 调整输入框容器 */
.single-line-picker ::v-deep .uni-data-picker-input {
  display: flex;
  align-items: center;
  height: 36px; /* 固定高度防止换行 */
}

/* 清除可能影响布局的边距 */
.single-line-picker ::v-deep .uni-data-picker-selected {
  margin: 0;
  padding: 0;
  line-height: 1.5;
}

/* 调整下拉图标位置 */
.single-line-picker ::v-deep .uni-data-picker-input-arrow {
  margin-left: auto; /* 将箭头推到最右侧 */
  flex-shrink: 0; /* 防止箭头被挤压 */
}
.container {
  padding: 20px;
}
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