<template>
  <view class="container">
    <!-- 头部导航 -->
    <view class="header">
      <text class="title">智慧排课系统</text>
    </view>

    <!-- 功能按钮 -->
    <view class="action-bar">
      <button class="btn" @click="showAddDialog = true">添加课程</button>
      <button class="btn" @click="autoSchedule">智能排课</button>
    </view>

    <!-- 课程表视图 -->
    <view class="timetable">
      <view class="time-axis">
        <view class="time-slot" v-for="time in timeSlots" :key="time">
          {{ time }}
        </view>
      </view>
      <view class="day-column" v-for="day in weekDays" :key="day">
        <text class="day-title">{{ day }}</text>
        <view 
          class="course-slot"
          v-for="course in getDayCourses(day)"
          :key="course.id"
          :style="{ height: calcHeight(course) }"
          @click="showDetail(course)"
        >
          <text class="course-name">{{ course.name }}</text>
          <text class="course-info">{{ course.teacher }} @{{ course.room }}</text>
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
import { ref, reactive, computed } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

// 基础数据
const weekDays = ref(['周一', '周二', '周三', '周四', '周五'])
const timeSlots = ref(['08:00', '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'])
const teachers = ref(['张老师', '王老师', '李老师', '赵老师'])
const rooms = ref(['101教室', '102教室', '201实验室', '301机房'])

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

// 弹窗控制
const showAddDialog = ref(false)
const selectedCourse = ref(null)

// 自动排课逻辑
const autoSchedule = () => {
  // TODO: 实现智能排课算法
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
  showAddDialog.value = false
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
  uni.$refs.detailDialog.open()
}

const removeCourse = (id) => {
  courses.value = courses.value.filter(c => c.id !== id)
  uni.$refs.detailDialog.close()
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
}

.title {
  color: white;
  font-size: 40rpx;
  font-weight: bold;
}

.timetable {
  display: flex;
  margin-top: 40rpx;
}

.time-axis {
  width: 150rpx;
}

.day-column {
  flex: 1;
  border-left: 2rpx solid #eee;
  padding: 0 10rpx;
}

.course-slot {
  background: #f0f9ff;
  border: 1rpx solid #007AFF;
  border-radius: 8rpx;
  padding: 10rpx;
  margin-bottom: 5rpx;
}

.course-name {
  font-weight: bold;
  display: block;
}

.course-info {
  font-size: 24rpx;
  color: #666;
}

.time-picker {
  display: flex;
  align-items: center;
  gap: 20rpx;
}

.btn {
  margin: 20rpx;
  background: #007AFF;
  color: white;
}
</style>