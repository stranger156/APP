<template>
  <view class="container">
    <!-- 头部导航 -->
    <view class="header">
      <text class="title">智慧排课系统</text>
    </view>

    <!-- 功能按钮 -->
    <view class="action-bar">
      <button class="btn" @click="openAddDialog">添加课程</button>
      <button class="btn" @click="autoSchedule">智能排课</button>
    </view>

    <!-- 课程表视图 -->
    <view class="timetable">
 
      <view class="day-column" v-for="day in weekDays" :key="day" style="min-height: 200px;">
        <text class="day-title">{{ day }}</text>
        <view 
          class="course-slot"
          v-for="course in getDayCourses(day)"
          :key="course.id"
          :style="{ height: calcHeight(course) }"
          @click="showDetail(course)"
        >
          <text class="course-name">{{ course.name }}</text>
		  <br />
          <text class="course-info">{{ course.teacher }} </text>
		     <text class="course-info">{{ course.room }}</text>
        </view>
      </view>
    </view>

    <!-- 添加课程弹窗 -->
    <uni-popup ref="addDialog" type="dialog">
      <view class="add-form">
        <input v-model="newCourse.name" placeholder="课程名称" />
        <picker 
          mode="selector" 
          :range="teachers"
          @change="(e) => newCourse.teacher = teachers[e.detail.value]"
        >
          <view>教师：{{ newCourse.teacher || '请选择' }}</view>
        </picker>
        <picker
          mode="selector"
          :range="rooms"
          @change="(e) => newCourse.room = rooms[e.detail.value]"
        >
          <view>教室：{{ newCourse.room || '请选择' }}</view>
        </picker>
        <picker
          mode="selector"
          :range="weekDays"
          @change="(e) => newCourse.day = weekDays[e.detail.value]"
        >
          <view>星期：{{ newCourse.day || '请选择' }}</view>
        </picker>
        <view class="time-picker">
          <text>时间：</text>
          <picker 
            mode="time" 
            @change="(e) => newCourse.startTime = e.detail.value"
          >
            <view>{{ newCourse.startTime || '开始时间' }}</view>
          </picker>
          <picker 
            mode="time" 
            @change="(e) => newCourse.endTime = e.detail.value"
          >
            <view>{{ newCourse.endTime || '结束时间' }}</view>
          </picker>
        </view>
        <button @click="addCourse">确认添加</button>
      </view>
    </uni-popup>

    <!-- 课程详情弹窗 -->
    <uni-popup ref="detailDialog" type="dialog">
      <view v-if="selectedCourse" class="course-detail">
        <text class="detail-title">{{ selectedCourse.name }}</text>
        <text>教师：{{ selectedCourse.teacher }}</text>
        <text>教室：{{ selectedCourse.room }}</text>
        <text>时间：{{ selectedCourse.startTime }} - {{ selectedCourse.endTime }}</text>
        <button @click="removeCourse(selectedCourse.id)">删除课程</button>
      </view>
    </uni-popup>
  </view>
</template>

<script setup>
import { ref, reactive } from 'vue'

// 基础数据
const weekDays = ['周一', '周二', '周三', '周四', '周五','周六','周日']
const teachers = ['张老师', '王老师', '李老师', '赵老师']
const rooms = ['101教室', '102教室', '201实验室', '301机房']

// 课程数据
const courses = ref([])
const newCourse = reactive({
  name: '',
  teacher: '',
  room: '',
  startTime: '',
  endTime: '',
  day: '周一'
})

// 弹窗引用
const addDialog = ref(null)
const detailDialog = ref(null)
const selectedCourse = ref(null)

// 打开添加课程弹窗
const openAddDialog = () => {
  addDialog.value?.open()
}

// 自动排课逻辑
const autoSchedule = () => {
  uni.showToast({ title: '自动排课功能开发中', icon: 'none' })
}

// 添加课程验证
const addCourse = () => {
  if (!validateCourse(newCourse)) return
  
  const conflict = checkConflict(newCourse)
  if (conflict) {
    uni.showToast({ title: `时间冲突：${conflict.name}`, icon: 'none' })
    return
  }

  courses.value.push({ ...newCourse, id: Date.now() })
  resetForm()
  addDialog.value?.close()
}

// 课程冲突检测
const checkConflict = (course) => {
  return courses.value.find(item => 
    item.day === course.day &&
    item.room === course.room &&
    timeOverlap(
      item.startTime, 
      item.endTime, 
      course.startTime, 
      course.endTime
    )
  )
}

// 时间重叠检测
const timeOverlap = (start1, end1, start2, end2) => {
  const s1 = timeToMinutes(start1)
  const e1 = timeToMinutes(end1)
  const s2 = timeToMinutes(start2)
  const e2 = timeToMinutes(end2)
  return (s1 < e2) && (s2 < e1)
}

// 工具函数
const timeToMinutes = (time) => {
  const [h, m] = time.split(':').map(Number)
  return h * 60 + m
}

const calcHeight = (course) => {
  const duration = timeToMinutes(course.endTime) - timeToMinutes(course.startTime)
  return `${duration / 5}px` // 每5分钟对应1px
}

const validateCourse = (course) => {
  if (!course.name) {
    uni.showToast({ title: '请输入课程名称', icon: 'none' })
    return false
  }
  if (!course.teacher || !course.room) {
    uni.showToast({ title: '请选择教师和教室', icon: 'none' })
    return false
  }
  if (!course.startTime || !course.endTime) {
    uni.showToast({ title: '请选择时间', icon: 'none' })
    return false
  }
  return true
}

const getDayCourses = (day) => {
  return courses.value.filter(c => c.day === day)
}

const showDetail = (course) => {
  selectedCourse.value = course
  detailDialog.value?.open()
}

const removeCourse = (id) => {
  courses.value = courses.value.filter(c => c.id !== id)
  detailDialog.value?.close()
}

const resetForm = () => {
  Object.assign(newCourse, {
    name: '',
    teacher: '',
    room: '',
    startTime: '',
    endTime: '',
    day: '周一'
  })
}
</script>

<style scoped>
.container {
  padding: 20rpx;
}

.header {
  padding: 30rpx;
  background: #007AFF;
  text-align: center;
}

.title {
  color: white;
  font-size: 40rpx;
  font-weight: bold;
}

.action-bar {
  display: flex;
  justify-content: space-around;
  margin: 20rpx 0;
}

.btn {
  background: #007AFF;
  color: white;
  border-radius: 10rpx;
}

.timetable {
  display: flex;
  margin-top: 20rpx;
  border: 1rpx solid #eee;
}

.time-axis {
  width: 120rpx;
  background: #f5f5f5;
}

.time-slot {
  height: 60rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1rpx solid #eee;
  font-size: 24rpx;
}

.day-column {
  flex: 1;
  border-left: 1rpx solid #eee;
  padding: 0 5rpx;
}

.day-title {
  display: block;
  text-align: center;
  padding: 10rpx 0;
  font-weight: bold;
  border-bottom: 1rpx solid #eee;
}

.course-slot {
  background: #e6f7ff;
  border: 1rpx solid #91d5ff;
  border-radius: 6rpx;
  padding: 5rpx;
  margin-bottom: 5rpx;
  overflow: hidden;
}

.course-name {
  font-weight: bold;
  font-size: 26rpx;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.course-info {
  font-size: 22rpx;
  color: #666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.add-form, .course-detail {
  padding: 30rpx;
  background: white;
  border-radius: 10rpx;
}

.add-form input, .add-form picker {
  margin-bottom: 20rpx;
  padding: 15rpx;
  border: 1rpx solid #eee;
  border-radius: 8rpx;
}

.time-picker {
  display: flex;
  align-items: center;
  margin-bottom: 20rpx;
}

.time-picker > text {
  margin-right: 10rpx;
}

.time-picker picker {
  flex: 1;
  margin-right: 10rpx;
}

.detail-title {
  font-size: 32rpx;
  font-weight: bold;
  margin-bottom: 20rpx;
  display: block;
}

.course-detail > text {
  display: block;
  margin-bottom: 15rpx;
}
</style>