<template>
  <view class="container">
    <!-- 头部导航 -->
    <view class="header">
      <text class="title">智慧排课系统</text>
    </view>

    <!-- 功能按钮 -->
    <view class="action-bar">
      <button class="btn" @click="openAddDialog">添加课程</button>
      <button class="btn" @click="openAutoScheduleDialog">智能排课</button>
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
	
	<!-- 未排课课程区域 -->
	<view class="other-courses">
	  <text class="other-title">未排课课程</text>
	  <view v-for="course in unassignedCourses" :key="course.id" class="course-item" @click="showDetail(course)">
	    <text class="course-name">{{ course.name }}</text>
	    <text class="course-info">{{ course.teacher }} - {{ course.room }}</text>
	    <text class="course-info">{{ course.faculty }} {{ course.class }}</text>
	  </view>
	</view>
	
	
    <!-- 添加课程弹窗 -->
    <uni-popup ref="addDialog" type="dialog" class="updatePopup">
      <view class="add-course-popup">
		  <scroll-view class="add-form" scroll-y>
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
				  @tap="checkFacultyBeforeClass"
		  		  @change="(e) => newCourse.class = classes[e.detail.value]"
		  		>
		  		  <view>班级：{{ newCourse.class || '请选择班级' }}</view>
		  		</picker>
		  		<view class="max-days-picker">
		  		  <text>每周最多选择天数：</text>
		  		  <picker
		  		    mode="selector"
		  		    :range="maxDaysOptions"
		  		    v-model="newCourse.maxDaysPerWeek"
		  		    @change="handleMaxDaysChange"
		  		  >
		  		    <view>{{ newCourse.maxDaysPerWeek }} 天</view>
		  		  </picker>
		  		</view>
		    <view class="day-checkbox-group">
		      <text>选择上课周几（最多选 {{ newCourse.maxDaysPerWeek }} 天）：</text>
		      <view class="day-tags">
		        <view
		          v-for="(day, index) in weekDays"
		          :key="index"
		          class="day-tag"
		          :class="{ selected: newCourse.days.includes(day) }"
		          @click="toggleDaySelection(day)"
		        >
		          {{ day }}
		        </view>
		      </view>
		    </view>
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
		  		<view class="total-weeks-picker">
		  		  <text>开课周数：</text>
		  		  <picker
		  		    mode="selector"
		  		    :range="totalWeekOptions"
		  		    @change="(e) => {
		  		      newCourse.totalWeeks = totalWeekOptions[e.detail.value]
		  		      generateSelectableWeeks()
		  		    }"
		  		  >
		  		    <view>{{ newCourse.totalWeeks || '请选择总周数' }}</view>
		  		  </picker>
		  		</view>
		  		<view class="week-checkbox-group" v-if="availableWeeks.length">
		  		  <text>选择周次（最多选 {{ newCourse.totalWeeks }} ）：</text>
		  		  <view class="week-tags">
		  		    <view
		  		      v-for="(week, index) in availableWeeks"
		  		      :key="index"
		  		      class="week-tag"
		  		      :class="{ selected: newCourse.weeks.includes(week) }"
		  		      @click="toggleWeekSelection(week)"
		  		    >
		  		      {{ week }}
		  		    </view>
		  		  </view>
		  		</view>
		  </scroll-view>
		  <!-- 底部固定按钮 -->
		  <view class="bottom-button-bar">
		    <button @click="addCourse">确认添加</button>
		  </view>
	  </view>
    </uni-popup>
	<!-- 智能排课弹窗 -->
	<uni-popup ref="autoScheduleDialog" type="dialog" class="autoSchedulePopup">
	  <view class="auto-schedule-popup-content">
	    <view class="switch-group">
	      <view class="switch-option">
	        <text>是否在晚上开课</text>
	        <switch v-model="selectedOptions.option1" />
	      </view>
	      <view class="switch-option">
	        <text>体育课是否只能在下午</text>
	        <switch v-model="selectedOptions.option2" />
	      </view>
	      <view class="switch-option">
	        <text>实验课是否安排在晚上</text>
	        <switch v-model="selectedOptions.option3" />
	      </view>
	      <view class="max-courses-picker">
	        <text>教师每日最多课程数：</text>
	        <picker
	          mode="selector"
	          :range="maxCoursesOptions"
	          v-model="selectedOptions.option4"
	          @change="handleMaxCoursesChange"
	        >
	          <view>{{ selectedOptions.option4 }} 节</view>
	        </picker>
	      </view>
	    </view>
	    <view class="bottom-button-bar">
	      <button @click="autoSchedule">开始排课</button>
	    </view>
	  </view>
	</uni-popup>
    <!-- 课程详情弹窗 -->
    <uni-popup ref="detailDialog" type="dialog">
      <view v-if="selectedCourse" class="course-detail">
        <text class="detail-title">{{ selectedCourse.name }}</text>
        <text>教师：{{ selectedCourse.teacher }}</text>
        <text>教室：{{ selectedCourse.room }}</text>
		<text>班级：{{ selectedCourse.class }}</text>
        <text>时间：{{ selectedCourse.startTime }} - {{ selectedCourse.endTime }}</text>
        <button @click="removeCourse(selectedCourse.id)">删除课程</button>
      </view>
    </uni-popup>
  </view>
</template>

<script setup>
import { ref, reactive,onMounted,computed } from 'vue'
import { getClassesByFaculty, getClassroom, getCourseTask, getFaculties, getTeacher, scheduleClasses } from '../../utils/api'

// 基础数据
const weekDays = ['周一', '周二', '周三', '周四', '周五','周六','周日']
const teachers = ref(['张老师', '王老师', '李老师', '赵老师'])
const rooms = ref(['101教室', '102教室', '201实验室', '301机房'])
const faculties = ref([])
const classes = ref([''])
const sections = ["1", "2", "3", '4', '5', '6', '7', '8', '9', '10', '11', '12']
const selectedFaculty = ref([])
const totalWeekOptions = ['4周', '8周', '12周', '16周', '20周']
const availableWeeks = ref([])
const maxDaysOptions = ['1', '2', '3', '4', '5', '6', '7']
const totalWeeksCount = 20
const maxCoursesOptions = ["1", "2", "3", '4', '5', '6', '7', '8', '9', '10', '11', '12']

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
  weeks: [],
  totalWeeks: '',
  days: [],
  maxDaysPerWeek: 2,
})
const selectedOptions = reactive({
  option1: false, // 默认不开启
  option2: false,
  option3: false,
  option4: "4",
});
// 弹窗引用
const addDialog = ref(null)
const detailDialog = ref(null)
const selectedCourse = ref(null)
const autoScheduleDialog = ref(null)

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

const fetchSchedule = (Options) => {
    scheduleClasses({"options":Options}).then(res => {
		uni.hideLoading();
        if (res.code === 200) {
			console.log(res);
        } else {
            uni.showToast({
                title: '获取数据失败',
                icon: 'none'
            });
        }
    }).catch(err => {
        console.error("请求失败:", err);
		uni.hideLoading();
        uni.showToast({
            title: '请求失败，请稍后重试',
            icon: 'none'
        });
    });
};

const fetchSave = (courses) => {
    getCourseTask({"courses":courses}).then(res => {
		uni.hideLoading();
        if (res.code === 200) {
			console.log(res);
        } else {
            uni.showToast({
                title: '获取数据失败',
                icon: 'none'
            });
        }
    }).catch(err => {
        console.error("请求失败:", err);
		uni.hideLoading();
        uni.showToast({
            title: '请求失败，请稍后重试',
            icon: 'none'
        });
    });
};

const checkFacultyBeforeClass = () => {
  if (!newCourse.faculty) {
    uni.showToast({
      title: '请先选择学院',
      icon: 'none'
    });
  }
};

const handleMaxDaysChange = (e) => {
  newCourse.maxDaysPerWeek = parseInt(maxDaysOptions[e.detail.value]);
}

const handleMaxCoursesChange = (e) => {
  selectedOptions.option4 = parseInt(maxCoursesOptions[e.detail.value]);
}

const toggleDaySelection = (day) => {
  const index = newCourse.days.indexOf(day)
  if (index !== -1) {
    newCourse.days.splice(index, 1) // 如果已选中，移除
  } else {
    if (newCourse.days.length >= newCourse.maxDaysPerWeek) {
      uni.showToast({ title: `最多选择 ${newCourse.maxDaysPerWeek} 天`, icon: 'none' })
      return
    }
    newCourse.days.push(day) // 如果未选择，添加
  }
}

const unassignedCourses = computed(() =>
  courses.value.filter(c => !c.startTime || !c.endTime)
)

const generateSelectableWeeks = () => {
  const totalWeeksCount = 20;
  
  if (!totalWeeksCount) return;

  // 生成可选的周次列表（例如：第1到第totalWeeksCount周）
  availableWeeks.value = Array.from({ length: totalWeeksCount }, (_, i) => `第${i + 1}周`);
  newCourse.weeks = [] // 重置已选周次
};


const toggleWeekSelection = (week) => {
  const index = newCourse.weeks.indexOf(week)
  if (index === -1) {
    // 如果未选择且未超过最大选择周次
    if (newCourse.weeks.length >= parseInt(newCourse.totalWeeks)) {
      uni.showToast({ title: `最多选择 ${newCourse.totalWeeks}`, icon: 'none' })
      return
    }
    newCourse.weeks.push(week)  // 添加周次
  } else {
    // 如果已经选择，移除
    newCourse.weeks.splice(index, 1)
  }
}
// 打开添加课程弹窗
const openAddDialog = () => {
  addDialog.value?.open('center')
}

// 打开智能排课弹窗
const openAutoScheduleDialog = () => {
  autoScheduleDialog.value?.open('center')
}

// 智能排课逻辑
const autoSchedule = () => {
	// if (courses.value.length === 0) {
	//     uni.showToast({
	//       title: '当前没有课程，无法执行排课',
	//       icon: 'none'
	//     });
	//     return; // 拒绝继续执行
	//   }
	uni.showLoading({
	    title: '正在智能排课...'
	});
	const selected = Object.keys(selectedOptions).filter(option => selectedOptions[option]);
	fetchSave(courses.value)
	scheduleClasses(selectedOptions)
	autoScheduleDialog.value?.close();  // 关闭弹窗
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
  // if (!course.startTime || !course.endTime) {
  //   uni.showToast({ title: '请选择时间', icon: 'none' })
  //   return false
  // }
  if (!course.faculty || !course.class) {
    uni.showToast({ title: '请选择班级', icon: 'none' })
    return false
  }
  return true
}

const getDayCourses = (day) => {
  return courses.value.flatMap(c => {
    if (!c.days || c.days.length === 0) return [];
    if (!c.startTime || !c.endTime) return [];

    // 一个课程多个 days，就复制多份用于不同天展示
    return c.days.includes(day) ? [{ ...c, day }] : [];
  });
};

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
    day: '周一',
    weeks: [],
    totalWeeks: '',
    days: [],
    maxDaysPerWeek: 2,
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

.course-detail {
  background-color: #fff;
  padding: 30rpx;
  border-radius: 10rpx;
}

.add-course-popup input, .add-course-popup picker {
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
.other-courses {
  margin-top: 40rpx;
  padding: 20rpx;
  border: 1rpx solid #eee ;
  border-radius: 12rpx;
}

.other-title {
  font-size: 28rpx;
  font-weight: bold;
  margin-bottom: 20rpx;
}

.course-item {
  background: #e6f7ff;
  border: 1rpx solid #91d5ff;
  padding: 15rpx;
  border-radius: 10rpx;
  margin-bottom: 15rpx;
}

.course-item .course-name {
  font-weight: bold;
  font-size: 26rpx;
}

.course-item .course-info {
  font-size: 22rpx;
  color: #888;
}

.total-weeks-picker {
  margin-bottom: 20rpx;
}

.week-checkbox-group {
  margin-bottom: 20rpx;
}

/* .week-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10rpx;
  margin-top: 10rpx;
}

.week-tag {
  padding: 10rpx 20rpx;
  border-radius: 8rpx;
  border: 1rpx solid #ccc;
  background-color: #f5f5f5;
  font-size: 22rpx;
  color: #333;
}

.week-tag.selected {
  background-color: #007AFF;
  color: white;
  border-color: #007AFF;
} */

.day-checkbox-group {
  margin-bottom: 20rpx;
}

/* .day-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10rpx;
  margin-top: 10rpx;
}

.day-tag {
  width: 23%;
  text-align: center;
  padding: 10rpx 0;
  border-radius: 8rpx;
  border: 1rpx solid #ccc;
  background-color: #f5f5f5;
  font-size: 22rpx;
  color: #333;
}

.day-tag.selected {
  background-color: #007AFF;
  color: white;
  border-color: #007AFF;
} */

.week-tags, .day-tags {
  display: flex;
  flex-wrap: wrap;          /* 启用换行 */
  gap: 10rpx;               /* 元素间隔 */
  margin-top: 10rpx;
}

.week-tag, .day-tag {
  width: 23%;               /* 每个元素占容器的 23% 宽度，确保每行最多显示 4 个 */
  text-align: center;
  padding: 10rpx 20rpx;
  border-radius: 8rpx;
  border: 1rpx solid #ccc;
  background-color: #f5f5f5;
  font-size: 22rpx;
  color: #333;
  cursor: pointer;
}

.week-tag.selected, .day-tag.selected {
  background-color: #007AFF;  /* 选中时的背景颜色 */
  color: white;
  border-color: #007AFF;      /* 选中时的边框颜色 */
}
.max-days-picker{
  margin-bottom: 20rpx;
}

.max-days-picker  picker {
  padding: 15rpx;
  border: 1rpx solid #eee;
  border-radius: 8rpx;
  font-size: 22rpx;
  width: 100%;
}
.max-courses-picker{
	display: flex;
	justify-content: space-between; /* 左右对齐 */
	align-items: center;
	padding: 20rpx; /* 增加内边距形成更大的间距 */
	border-bottom: 1rpx solid #eee; /* 可选的分割线 */
	font-size: 30rpx; /* 增加文字大小可选 */
}
.max-courses-picker  picker {
  padding: 15rpx;
  border: 1rpx solid #eee;
  border-radius: 8rpx;
  font-size: 22rpx;
}

.max-days-picker text {
  font-size: 28rpx;
  color: #333;
}

.scroll-view {
  max-height: 80vh; /* 限制弹窗高度（可根据需求调整） */
  overflow-y: auto; /* 启用垂直滚动 */
  padding-bottom: 20rpx; /* 给底部留点空隙 */
}
/* 弹窗主体内容 */
.updatePopup .uni-popup-content {
  display: flex;            /* 弹窗垂直布局，内容和按钮分层布局 */
  flex-direction: column;
  width: 90%;               /* 弹窗宽度 */
  height: 80vh;             /* 弹窗高度限制在屏幕的 80% */
  max-height: 80vh;         /* 确保高度范围 */
  border-radius: 12rpx;     /* 圆角 */
}

/* 弹窗内部布局：内容部分和按钮部分 */
.add-course-popup {
  display: flex;
  flex-direction: column;   /* 让内容和按钮垂直布局 */
  height: 100%;             /* 占满整个弹窗 */
}

/* 可滚动内容区域 */
.add-form {
  width: auto;
  background-color: white;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 20rpx;
  max-height: 500rpx;
}

/* 底部按钮部分 */
.bottom-button-bar {
  padding: 10rpx 20rpx;
  background: white;
  border-top: 1rpx solid #eee;  /* 分割线 */
  position: sticky;             /* 粘性定位，始终位于底部 */
  bottom: 0;
}

.bottom-button-bar button {
  width: 100%;
  padding: 15rpx 0;
  background: #007AFF;          /* 按钮颜色 */
  color: white;
  font-size: 28rpx;
  border-radius: 8rpx;
  text-align: center;
  border: none;
  cursor: pointer;
}

/* 智能排课弹窗样式 */
.auto-schedule-popup-content {
  padding: 20rpx;
  display: flex;
  flex-direction: column;
  height: 100%;
  background: white;
  
}
.switch-group {
    margin-bottom: 20rpx;
  }
  
  .switch-option {
    display: flex;
    justify-content: space-between; /* 左右对齐 */
    align-items: center;
    padding: 20rpx; /* 增加内边距形成更大的间距 */
    border-bottom: 1rpx solid #eee; /* 可选的分割线 */
    font-size: 30rpx; /* 增加文字大小可选 */
  }
  
  .bottom-button-bar {
    padding: 10rpx 20rpx;
    background: white;
    border-top: 1rpx solid #eee;  /* 分割线 */
    position: sticky;             /* 粘性定位，保持底部按钮固定 */
    bottom: 0;
  }
  
  .bottom-button-bar button {
    width: 100%;
    padding: 15rpx 0;
    background: #007AFF;         /* 按钮背景颜色 */
    color: white;
    font-size: 28rpx;
    border-radius: 8rpx;
    text-align: center;
    border: none;
    cursor: pointer;
  }
</style>
<style scoped>
    .updatePopup :deep(.uni-popup__wrapper) {
        max-width: 80%;
    }
	.autoSchedulePopup :deep(.uni-popup__wrapper) {
        width: 80%;
    }
</style>
