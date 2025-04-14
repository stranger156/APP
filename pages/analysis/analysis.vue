<template>
  <view class="container">
	<simple-dropdown
      v-model="selectedCourse"
      :options="courseOptions"
      placeholder="选择课程"
      @change="handleCourseChange"
    />
    
    <view class="result">已选择: {{ selectedCourse }}</view>
  </view>
</template>

<script setup>
import { ref } from 'vue';
import SimpleDropdown from '@/components/SimpleDropdown.vue';

const selectedCourse = ref('');
const courseOptions = ref([
  { value: 'math', label: '数学' },
  { value: 'english', label: '英语' },
  { value: 'physics', label: '物理' },
  { value: 'chemistry', label: '化学' }
]);

const handleCourseChange = (option) => {
  console.log('选择了:', option);
};
</script>

<style>
.container {
  padding: 30rpx;
}

.result {
  margin-top: 30rpx;
  font-size: 28rpx;
  color: #333;
}
</style>
