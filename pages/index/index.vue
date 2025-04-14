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
 
      <view class="day-column" v-for="day in weekDays" :key="day" style="min-height: 360px;">
        <text class="day-title">{{ day }}</text>
        <view 
          class="course-slot"
          v-for="course in getDayCourses(day)"
          :key="course.id"
          :style="{ height: calcHeight(course),
		            top: calcTop(course) }"
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
		  :range="faculties"
		  @change="(e) => {
		  newCourse.class = '';  // 清空班级选择
		  newCourse.faculty = faculties[e.detail.value];
		  fetchClassesByFaculty(faculties[e.detail.value]);  // 获取选中的学院的班级信息
		}"
		>
		  <view>学院：{{ newCourse.faculty || '请选择学院' }}</view>
		</picker>
		
		<picker
		  mode="selector"
		  :range="classes"
		  @change="(e) => newCourse.class = classes[e.detail.value]"
		>
		  <view>班级：{{ newCourse.class || '请选择班级' }}</view>
		</picker>
        <picker
          mode="selector"
          :range="weekDays"
          @change="(e) => newCourse.day = weekDays[e.detail.value]"
        >
          <view>星期：{{ newCourse.day || '请选择' }}</view>
        </picker>
        <view class="time-picker">
          <text>节次：</text>
          <picker 
            mode="selector" 
			:range="sections"
            @change="(e) => {
                  newCourse.startTime = sections[e.detail.value]
                  newCourse.endTime = ''
                }"
          >
            <view>{{ newCourse.startTime || '开始节次' }}</view>
          </picker>
          <picker 
            mode="selector" 
			:range="getEndSections()"
            @change="(e) => newCourse.endTime = getEndSections()[e.detail.value]"
          >
            <view>{{ newCourse.endTime || '结束节次' }}</view>
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
import { ref, reactive,onMounted } from 'vue'
import { getClassesByFaculty, getClassroom, getFaculties, getTeacher } from '../../utils/api'

// 基础数据
const weekDays = ['周一', '周二', '周三', '周四', '周五','周六','周日']
const teachers = ref(['张老师', '王老师', '李老师', '赵老师'])
const rooms = ref(['101教室', '102教室', '201实验室', '301机房'])
const faculties = ref([])
const classes = ref([''])
const sections = ["1", "2", "3", '4', '5', '6', '7', '8', '9', '10', '11', '12']
const selectedFaculty = ref([])

// 课程数据
const courses = ref([])
const newCourse = reactive({
  name: '',
  teacher: '',
  room: '',
  faculty: '',
  class: '',
  startTime: '',
  endTime: '',
  day: '周一'
})

// 弹窗引用
const addDialog = ref(null)
const detailDialog = ref(null)
const selectedCourse = ref(null)

const fetchFaculties = () => {
  getFaculties().then(res => {
    if (res.code === 200) {
      faculties.value = res.faculties; 
    } else {
      uni.showToast({
        title: '获取学院数据失败',
        icon: 'none'
      });
    }
  }).catch(err => {
    console.error("请求失败:", err);
    uni.showToast({
      title: '请求失败，请稍后重试',
      icon: 'none'
    });
  });
};

const fetchClassesByFaculty = (college) => {
  getClassesByFaculty({faculty: college}).then(res => {
    if (res.code === 200) {
      classes.value = res.classes;
    } else {
      uni.showToast({
        title: '获取班级数据失败',
        icon: 'none'
      });
    }
  }).catch(err => {
    console.error("请求失败:", err);
    uni.showToast({
      title: '请求失败，请稍后重试',
      icon: 'none'
    });
  });
};

const fetchClassroom = () => {
    getClassroom().then(res => {
        if (res.code === 200) {
			console.log(res);
            rooms.value = res.classrooms
        } else {
            uni.showToast({
                title: '获取数据失败',
                icon: 'none'
            });
        }
    }).catch(err => {
        console.error("请求失败:", err);
        uni.showToast({
            title: '请求失败，请稍后重试',
            icon: 'none'
        });
    });
};

const fetchTeacher = () => {
    getTeacher().then(res => {
        if (res.code === 200) {
			console.log(res);
            teachers.value = res.teachers 
        } else {
            uni.showToast({
                title: '获取数据失败',
                icon: 'none'
            });
        }
    }).catch(err => {
        console.error("请求失败:", err);
        uni.showToast({
            title: '请求失败，请稍后重试',
            icon: 'none'
        });
    });
};
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

const getEndSections = () => {
  const start = parseInt(newCourse.startTime)
  if (!start || isNaN(start)) return sections
  return sections.slice(start - 1) // 从 start 开始到12节
}

const timeOverlap = (start1, end1, start2, end2) => {
  return (parseInt(start1) <= parseInt(end2)) && (parseInt(start2) <= parseInt(end1))
}

const calcHeight = (course) => {
  const duration = parseInt(course.endTime) - parseInt(course.startTime)
  return `${(duration +1) * 40}px`
}

const calcTop = (course) => {
  return `${(parseInt(course.startTime) - 1) * 40 + 35}px`
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
  if (!course.faculty || !course.class) {
    uni.showToast({ title: '请选择班级', icon: 'none' })
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
	faculty: '',
	class: '',
    startTime: '',
    endTime: '',
    day: '周一'
  })
}
onMounted(() => {
    fetchClassroom();
	fetchTeacher();
	fetchFaculties()
});
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
  min-height: 360px;
  position: relative;
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
  width: 90%;
  position: absolute;
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