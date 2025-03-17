<template>
  <view class="course-schedule">
    <!-- 表头 -->
    <view class="table-header">
      <view>节次</view>
      <view>周一</view>
      <view>周二</view>
      <view>周三</view>
      <view>周四</view>
      <view>周五</view>
    </view>
    <!-- 表格内容 -->
    <view class="table-body">
      <!-- 循环遍历节次 -->
      <view class="table-row" v-for="(period, periodIndex) in 4" :key="periodIndex">
        <!-- 节次序号 -->
        <view class="cell">{{ periodIndex + 1 }}</view>
        <!-- 循环遍历一周的课程 -->
        <view class="cell" v-for="(dayCourses, dayIndex) in courseData" :key="dayIndex">
          <!-- 显示课程信息 -->
          <view v-if="dayCourses[periodIndex]" class="course">
            <view>{{ dayCourses[periodIndex].courseName }}</view>
            <view>{{ dayCourses[periodIndex].teacher }}</view>
            <view>{{ dayCourses[periodIndex].classroom }}</view>
          </view>
          <!-- 没有课程时显示空 -->
          <view v-else>-</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      courseData: [
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
        ]
      ]
    };
  }
};
</script>

<style scoped>
.course-schedule {
  padding: 20px;
}

.table-header {
  display: flex;
  background-color: #f0f0f0;
  font-weight: bold;
}

.table-header view {
  flex: 1;
  padding: 10px;
  text-align: center;
}

.table-body {
  border: 1px solid #ccc;
}

.table-row {
  display: flex;
  border-bottom: 1px solid #ccc;
}

.cell {
  flex: 1;
  padding: 10px;
  text-align: center;
  border-right: 1px solid #ccc;
}

.course {
  background-color: #e0f7fa;
}
</style>